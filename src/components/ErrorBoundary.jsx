import React from 'react';
import Button from './Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
                    <p className="text-gray-600 mb-6 max-w-md">
                        We encountered an unexpected error while loading this page.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left max-w-2xl w-full overflow-auto">
                        <p className="font-mono text-sm text-red-600 whitespace-pre-wrap">
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <details className="mt-2">
                            <summary className="text-xs text-red-400 cursor-pointer">Stack Trace</summary>
                            <pre className="mt-2 text-xs text-red-500 overflow-auto">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.href = '/'}>
                            Go to Home
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
