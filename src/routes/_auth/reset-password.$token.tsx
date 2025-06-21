import { ResetPasswordPage } from '@/core/auth/pages/ResetPasswordPage'
import { ErrorPage } from '@/core/pages/ErrorPage'
import { resetTokenVerify } from '@/modules/Profile/apis/user.api'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'

const resetTokenVerifyQueryOptions = (token: string) => queryOptions({
  queryKey: ['userId', token],
  queryFn: () => resetTokenVerify({ token }),
  retry: false
})

export const Route = createFileRoute('/_auth/reset-password/$token')({
  loader: async ({ params: { token }, context: { queryClient } }) => {
    await queryClient.ensureQueryData(resetTokenVerifyQueryOptions(token))
  },
  errorComponent: ({ error }) => {
    return <ErrorPage text={error.message} />
  },
  component: () => {
    const { token } = useParams({ from: '/_auth/reset-password/$token' })
    const { data: { userId } } = useSuspenseQuery(resetTokenVerifyQueryOptions(token));
    return <ResetPasswordPage userId={userId} />
  }
})