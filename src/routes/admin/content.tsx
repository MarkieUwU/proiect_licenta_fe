import ContentManagement from '@/core/admin/pages/ContentManagement';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/content')({
  component: ContentManagement,
}); 