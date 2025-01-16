import HomePage from '@/modules/Posts/pages/HomePage/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/')({
  component: HomePage,
});
