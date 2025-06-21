import { createRootRouteWithContext } from '@tanstack/react-router';
import App from '../App';
import { QueryClient } from '@tanstack/react-query';
import ErrorBoundary from '@/core/components/error-boundary';
import { Suspense } from 'react';
import { LoadingPage } from '@/core/pages/LoadingPage';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  ),
});
