import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    // 在 outDir 中生成 .vite/manifest.json
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.js'),
    },
  },
});
