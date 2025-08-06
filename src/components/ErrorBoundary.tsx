import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-soft-taupe flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 text-burnt-sienna mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-deep-charcoal mb-4 font-montserrat" style={{fontSize: 'clamp(1.875rem, 4vw, 3rem)'}}>
              Something went wrong
            </h1>
            <p className="text-lg text-medium-gray mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-burnt-sienna text-crisp-white px-8 py-3 rounded-lg font-montserrat font-bold hover:bg-terracotta transition"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold">Error Details</summary>
                <pre className="mt-2 text-sm overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}