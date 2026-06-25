import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  name: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class RemoteErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[shell] remote "${this.props.name}" failed to render`, error, info);
  }

  override componentDidUpdate(prev: Props) {
    // Reset when navigating to a different remote so a prior failure doesn't
    // stick after the user moves on.
    if (prev.name !== this.props.name && this.state.error) {
      this.setState({ error: null });
    }
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="shell__error" role="alert">
          <h2>Couldn’t load the {this.props.name} module</h2>
          <p>It may be deploying or temporarily unavailable. Please try again.</p>
          <button type="button" onClick={() => this.setState({ error: null })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
