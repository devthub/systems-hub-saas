'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

import SomethingWentWrong from './SomethingWentWrong';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: unknown;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SomethingWentWrong />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
