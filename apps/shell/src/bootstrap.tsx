import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
// The host loads the design system stylesheet once for itself and all remotes,
// and provides the shared QueryClient + Router consumed across every remote.
import "@fpk/ui/styles.css";

const queryClient = new QueryClient();
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
