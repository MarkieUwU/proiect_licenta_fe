import { Notification } from '@/core/models/notification.models';
import { markNotificationAsRead, markAllNotificationsAsRead } from '@/core/apis/notification.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface NotificationListProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationList({ notifications }: NotificationListProps) {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', { keyPrefix: 'Components.NotificationBell' });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification marked as read');
    },
    onError: () => toast.error('Failed to mark notification as read'),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
    onError: () => toast.error('Failed to mark notifications as read'),
  });

  const handleMarkAsRead = (notificationId: number) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'POST_LIKED':
        return '❤️';
      case 'POST_COMMENTED':
        return '💬';
      case 'POST_REPORTED':
        return '⚠️';
      case 'POST_ARCHIVED':
        return '📁';
      case 'POST_APPROVED':
        return '✅';
      case 'NEW_FOLLOWER':
        return '👥';
      case 'MENTIONED_IN_COMMENT':
      case 'MENTIONED_IN_POST':
        return '@';
      case 'SYSTEM_ANNOUNCEMENT':
        return '📢';
      case 'ACCOUNT_WARNING':
        return '🚨';
      default:
        return '📌';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>{t('NoNotifications')}</p>
      </div>
    );
  }

  return (
    <div className="max-h-[496px]">
      <div className="p-4 border-b flex justify-between items-center">
        <span className="text-sm font-medium">
          {notifications.filter(n => !n.read).length} unread
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={markAllAsReadMutation.isPending}
        >
          <CheckCheck className="h-4 w-4 mr-1" />
          {t('MarkAllRead')}
        </Button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        <div className="p-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-2">
              <div
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.read 
                    ? 'bg-muted/50' 
                    : 'bg-background hover:bg-muted/30'
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-lg">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium leading-tight">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 