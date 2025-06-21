import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/analytics')({
  component: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      {/* Add analytics components here */}
    </div>
  ),
}); 