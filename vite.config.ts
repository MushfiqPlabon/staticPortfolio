import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import preact from "@preact/preset-vite"; // Import preact plugin

export default defineConfig({
  publicDir: "public",
  base: process.env.NODE_ENV === "production" ? "/staticPortfolio/" : "/",
  plugins: [
    preact(), // Add preact plugin
    legacy({
      targets: ["defaults", "not IE 11"],
      modernPolyfills: true,
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    visualizer({
      filename: "./dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "preact-vendor": ["preact", "htm"],
          "animation-vendor": ["gsap"],
          "style-vendor": ["goober"],
          "validation-vendor": ["zod"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ["preact", "htm", "goober", "zod", "clsx", "gsap", "lozad"],
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
});
