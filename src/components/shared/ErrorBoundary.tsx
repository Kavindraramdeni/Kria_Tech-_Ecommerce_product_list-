import * as React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-8">
              We've encountered an unexpected error. Don't worry, our team has been notified.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20"
              >
                <RotateCcw size={20} />
                Try Refreshing
              </button>
              
              <button 
                onClick={this.handleReset}
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black py-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3"
              >
                <Home size={20} />
                Back to Home
              </button>
            </div>

            {this.state.error && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-red-500 font-bold mb-2">{this.state.error.name}: {this.state.error.message}</p>
                <pre className="text-[10px] text-gray-500 font-mono">{this.state.error.stack}</pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
