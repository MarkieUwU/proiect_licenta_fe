import AdminPage from '@/modules/Admin/pages/admin-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/admin')({
  component: AdminPage
})