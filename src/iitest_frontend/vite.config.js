import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.DFX_NETWORK": JSON.stringify(process.env.DFX_NETWORK),
    "process.env.INTERNET_IDENTITY_CANISTER_ID": JSON.stringify(
      process.env.CANISTER_ID_INTERNET_IDENTITY
    ),
    "process.env.IITEST_BACKEND_CANISTER_ID": JSON.stringify(
      process.env.CANISTER_ID_IITEST_BACKEND
    ),
    "process.env.II_URL": JSON.stringify(
      process.env.DFX_NETWORK === "local"
        ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`
        : "https://identity.ic0.app/"
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
