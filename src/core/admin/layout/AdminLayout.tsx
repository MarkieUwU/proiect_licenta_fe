import { Outlet } from '@tanstack/react-router';
import { AdminSidebar } from '@/core/admin/components/layout/AdminSidebar';
import { AdminHeader } from '@/core/admin/components/layout/AdminHeader';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
