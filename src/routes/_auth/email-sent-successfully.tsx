import { EmailSentSuccessfullyPage } from '@/core/auth/pages/EmailSentSuccessfullyPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/email-sent-successfully')({
  component: EmailSentSuccessfullyPage,
})