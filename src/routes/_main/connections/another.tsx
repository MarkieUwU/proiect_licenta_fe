import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/connections/another')({
  component: () => <div>Hello /_main/connections/another!</div>
})