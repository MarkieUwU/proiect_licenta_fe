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

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications', { page: 1, limit: 10 }],
    queryFn: () => getNotifications({ page: 1, limit: 10 }),
    enabled: isOpen,
  });

  const unreadCount = notificationsData?.notifications.filter(n => !n.read).length || 0;

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
      <DropdownMenuContent className="w-80 p-0" align="end" sideOffset={8}>
        <NotificationList 
          notifications={notificationsData?.notifications || []}
          onClose={() => setIsOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 