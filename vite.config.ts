import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  // base:"/",
  plugins: [react()],
  // preview:{
  //   port: 5075,
  //   strictPort: true,
  // },
  server: {
    host: true,
    https: {
      key: "./ssl/private.key",
      cert: "./ssl/cert.crt",
    },
  },
});
