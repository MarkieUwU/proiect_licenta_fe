import { Outlet } from '@tanstack/react-router';
import { AdminSidebar } from '@/core/admin/components/layout/AdminSidebar';
import { AdminHeader } from '@/core/admin/components/layout/AdminHeader';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset className="flex flex-col h-screen min-w-[200px]">
        <AdminHeader />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
