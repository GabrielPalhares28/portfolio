import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Elemento raiz "#root" não encontrado no documento. Verifique o index.html.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
