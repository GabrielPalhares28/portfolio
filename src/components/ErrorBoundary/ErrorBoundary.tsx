import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro não tratado na interface:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Algo deu errado</h1>
        <p style={{ margin: 0, maxWidth: "480px" }}>
          Ocorreu um erro inesperado ao carregar esta página. Recarregue para
          tentar novamente.
        </p>
        <pre
          style={{
            maxWidth: "480px",
            overflowX: "auto",
            fontSize: "0.75rem",
            opacity: 0.7,
          }}
        >
          {this.state.error.message}
        </pre>
        <button
          type="button"
          onClick={this.handleReload}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#667eea",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Recarregar página
        </button>
      </div>
    );
  }
}
