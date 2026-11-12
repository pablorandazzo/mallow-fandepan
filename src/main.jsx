import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CaseAccessGate from "./CaseAccessGate";

const CasePage = React.lazy(() => import("./CasePage"));
const isCasePage = /^\/caso-fan-de-pan\/?$/.test(window.location.pathname);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <main
          role="status"
          style={{ padding: "48px", fontFamily: "Inter, sans-serif" }}
        >
          Abriendo el caso…
        </main>
      }
    >
      {isCasePage ? (
        <CaseAccessGate>
          <CasePage />
        </CaseAccessGate>
      ) : (
        <App />
      )}
    </React.Suspense>
  </React.StrictMode>,
);
