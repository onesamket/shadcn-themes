import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      entryRoot: "src",
      include: ["src"],
      outDir: "dist",
      copyDtsFiles: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "shadcn-themes",
      fileName: () => "index.js",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@radix-ui/react-dialog",
        "@radix-ui/react-label",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-slider",
        "@radix-ui/react-tabs",
        "clsx",
        "lucide-react",
        "tailwind-merge",
        "tailwindcss",
        "tw-animate-css"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        preserveModules: false
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});