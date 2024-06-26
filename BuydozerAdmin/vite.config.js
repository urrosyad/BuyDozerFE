/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2005,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    chunkSizeWarningLimit: 500, // Jika Anda ingin mengatasi peringatan chunk size
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@src": "/src",
      "@components": "/src/Components",
      "@hooks": "/src/Hooks",
      "@context": "/src/Context",
      "@pages": "/src/Pages",
      "@routers": "/src/Routers",
      "@utils": "/src/Utils",
      "@layouts": "/src/Layouts",
      "@auth": "/src/auth",
      "@schemas": "/src/Schemas",
      "@themes": "/src/Themes",
      "@service": "/src/Service",
      "@api": "/src/api",
    },
  },
});
