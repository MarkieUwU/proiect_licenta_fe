import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Users, FileText, BarChart2, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  return (
    <div className="w-64 bg-card border-r h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: 'bg-accent text-accent-foreground' }}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
} 