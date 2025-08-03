import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // keep this
  build: {
    outDir: "dist", // default, but you can make this explicit
    emptyOutDir: true,
  },
});
