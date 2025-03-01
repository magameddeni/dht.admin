import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      constants: "/src/constants",
      interface: "/src/interface",
      hooks: "/src/hooks",
      styles: "/src/styles",
      UI: "/src/components/UI",
    },
  },
})
