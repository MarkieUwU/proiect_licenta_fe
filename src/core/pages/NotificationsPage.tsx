import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '@/core/apis/notification.api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, CheckCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 20;

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.NotificationsPage' });
  const { t: tEnum } = useTranslation('translation', { keyPrefix: 'Enums.NotificationType' });

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications', { page, limit: PAGE_SIZE }],
    queryFn: () => getNotifications({ page, limit: PAGE_SIZE }),
  });

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

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification deleted successfully');
    },
    onError: () => toast.error('Failed to delete notification'),
  });

  const handleMarkAsRead = (notificationId: number) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDeleteNotification = (notificationId: number) => {
    deleteNotificationMutation.mutate(notificationId);
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
      case 'COMMENT_REPORTED':
        return '⚠️';
      case 'COMMENT_ARCHIVED':
        return '📁';
      case 'COMMENT_APPROVED':
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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'POST_REPORTED':
      case 'COMMENT_REPORTED':
      case 'ACCOUNT_WARNING':
        return 'destructive';
      case 'POST_APPROVED':
      case 'COMMENT_APPROVED':
      case 'NEW_FOLLOWER':
        return 'default';
      case 'SYSTEM_ANNOUNCEMENT':
        return 'secondary';
      default:
        return 'outline';
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

  const notifications = notificationsData?.notifications || [];
  const totalPages = notificationsData?.pages || 0;
  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col" style={{ height: 'var(--app-height)' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t('Title')}</h1>
          <p className="text-muted-foreground">
            {t('UnreadCount', { count: unreadCount })} • {t('TotalCount', { count: notifications.length })}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            variant="outline"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            {t('MarkAllAsRead')}
          </Button>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {notifications.length === 0 ? (
          <Card className="flex-1">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">{t('NoNotifications')}</h3>
              <p className="text-muted-foreground">
                {t('NoNotificationsDescription')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 pb-4 ">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 border-b">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors relative ${
                    notification.read ? 'bg-muted/50' : 'bg-background'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <Badge variant="destructive" className="h-2 w-2 rounded-full p-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={getNotificationColor(notification.type)}>
                              {tEnum(notification.type)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                                disabled={markAsReadMutation.isPending}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                {t('MarkRead')}
                              </Button>
                            )}
                            {notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteNotification(notification.id)}
                                disabled={deleteNotificationMutation.isPending}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  {t('Previous')}
                </Button>
                <span className="flex items-center px-4">
                  {t('Page', { current: page, total: totalPages })}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                >
                  {t('Next')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 