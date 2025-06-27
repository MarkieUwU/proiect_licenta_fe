import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificationList } from '@/core/components/NotificationList';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/core/apis/notification.api';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'Components.NotificationBell' });

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications', { page: 1, limit: 100 }],
    queryFn: () => getNotifications({ page: 1, limit: 100 }),
    enabled: isOpen,
  });

  const unreadNotifications = notificationsData?.notifications.filter(n => !n.read) || [];
  const unreadCount = unreadNotifications.length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] p-0" align="end" sideOffset={8}>
        <NotificationList 
          notifications={unreadNotifications}
          onClose={() => setIsOpen(false)}
        />
        <div className="p-3 border-t">
          <Link to="/notifications" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full">
              {t('Notifications')}
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 