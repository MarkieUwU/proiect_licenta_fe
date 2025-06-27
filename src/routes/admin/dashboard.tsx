import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/core/admin/pages/AdminDashboard'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard
}) 