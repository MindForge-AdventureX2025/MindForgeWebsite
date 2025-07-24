import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  content: {
    experimental: { nativeSqlite: true },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@clerk/nuxt",
  ],
  shadcn: {
    // prefix: "Shadcn",
    prefix: "",
    componentDir: "@/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  routeRules: {
    "/api/journals": {
      proxy: "https://mindforgeserver.onrender.com/api/journals",
      cors: true,
    },
    "/api/chats": {
      proxy: "https://mindforgeserver.onrender.com/api/chats",
      cors: true,
    },
  },
});
