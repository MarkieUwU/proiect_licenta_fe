import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

// Menu items
const menuItems = [
  { key: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { key: 'Users', href: '/admin/users', icon: Users },
  { key: 'Content', href: '/admin/content', icon: FileText },
];

export function AdminSidebar() {
  const { t } = useTranslation();

  return (
    <Sidebar collapsible="icon" className="bg-white border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <Link
                    to={item.href}
                    className="block w-full"
                    activeProps={{
                      className: 'block w-full [&>button]:bg-sidebar-accent [&>button]:text-sidebar-accent-foreground',
                    }}
                  >
                    <SidebarMenuButton className="w-full justify-start flex items-center gap-4 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      <span className="truncate">{t(`Components.AdminSidebar.${item.key}`)}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}