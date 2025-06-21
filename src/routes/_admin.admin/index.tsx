import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/core/admin/pages/AdminDashboard'

export const Route = createFileRoute('/_admin/admin/')({
  component: AdminDashboard
}) 