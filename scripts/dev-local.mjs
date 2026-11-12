import { spawn } from "node:child_process";
import path from "node:path";

// Explicit, loopback-only opt-in. Originals stay outside public/ and dist/.
const child = spawn(
  process.execPath,
  [
    path.resolve("node_modules/vite/bin/vite.js"),
    "--host",
    "127.0.0.1",
    ...process.argv.slice(2),
  ],
  {
    env: { ...process.env, MALLOW_LOCAL_DOCUMENTS: "1" },
    stdio: "inherit",
  },
);
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
