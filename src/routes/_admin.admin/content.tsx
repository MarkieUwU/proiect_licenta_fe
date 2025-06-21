import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/content')({
  component: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Content Management</h2>
      {/* Add content management components here */}
    </div>
  ),
}); 