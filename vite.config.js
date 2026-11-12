import { defineConfig } from "vite";
import { caseDocumentsPlugin } from "./server/caseDocuments.mjs";

export default defineConfig({
  plugins: [caseDocumentsPlugin()],
  server: {
    fs: {
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "**/.local-documents/**",
      ],
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        // A client-only SPA has no React Server Component boundary. Rollup
        // may safely discard this directive in Motion's dependency modules.
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client") &&
          warning.id?.includes("node_modules")
        )
          return;
        defaultHandler(warning);
      },
    },
  },
});
