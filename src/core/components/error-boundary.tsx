import React from 'react';
import { ErrorPage } from '@/core/pages/ErrorPage';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  } 

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title='Error'
          text={this.state.error?.message || 'Something went wrong'}
          onReset={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
