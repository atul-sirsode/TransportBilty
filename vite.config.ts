import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const isAnalyze = mode === "analyze";

  return {
    plugins: [
      react(),
      ...(isAnalyze
        ? [visualizer({ open: true, filename: "dist/stats.html" })]
        : []),
    ],
    root: path.resolve(__dirname),
    base: isDev ? "/" : "./", // important: dev uses absolute /, production uses relative
    server: {
      //port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:4000", // update if your dotnet runs at another url
          changeOrigin: true,
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React core
            vendor: ["react", "react-dom"],
            
            // Radix UI components (grouped together)
            radix: [
              "@radix-ui/react-accordion",
              "@radix-ui/react-alert-dialog",
              "@radix-ui/react-aspect-ratio",
              "@radix-ui/react-avatar",
              "@radix-ui/react-checkbox",
              "@radix-ui/react-collapsible",
              "@radix-ui/react-context-menu",
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-hover-card",
              "@radix-ui/react-label",
              "@radix-ui/react-menubar",
              "@radix-ui/react-navigation-menu",
              "@radix-ui/react-popover",
              "@radix-ui/react-progress",
              "@radix-ui/react-radio-group",
              "@radix-ui/react-scroll-area",
              "@radix-ui/react-select",
              "@radix-ui/react-separator",
              "@radix-ui/react-slider",
              "@radix-ui/react-slot",
              "@radix-ui/react-switch",
              "@radix-ui/react-tabs",
              "@radix-ui/react-toast",
              "@radix-ui/react-toggle",
              "@radix-ui/react-toggle-group",
              "@radix-ui/react-tooltip"
            ],
            
            // Charts and visualization
            charts: ["recharts", "embla-carousel-react"],
            
            // Data fetching and forms
            data: ["@tanstack/react-query", "react-hook-form", "@hookform/resolvers"],
            
            // Utilities and styling
            utils: ["date-fns", "clsx", "tailwind-merge", "class-variance-authority", "cmdk"],
            
            // Icons
            icons: ["lucide-react"],
            
            // Other UI components
            ui: ["react-day-picker", "react-resizable-panels", "vaul", "sonner", "input-otp"],
            
            // Routing and themes
            router: ["react-router-dom"],
            themes: ["next-themes"],
            
            // Validation
            validation: ["zod"]
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  };
});
