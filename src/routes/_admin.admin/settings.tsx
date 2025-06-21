import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/settings')({
  component: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      {/* Add settings components here */}
    </div>
  ),
}); 