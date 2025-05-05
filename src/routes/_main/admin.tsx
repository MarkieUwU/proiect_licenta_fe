import StatisticsPage from '@/modules/Admin/pages/statistics-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/admin')({
  component: StatisticsPage
})