import { defineConfig } from "vite";

export default defineConfig({
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
