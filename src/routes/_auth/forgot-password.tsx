import { ForgotPasswordPage } from '@/core/auth/pages/FogotPasswordPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordPage,
})