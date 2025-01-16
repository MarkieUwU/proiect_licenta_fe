import ConnectionsPage from '@/modules/Connections/pages/ConnectionsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/connections')({
  component: ConnectionsPage
})