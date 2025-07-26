import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  content: {
    experimental: { nativeSqlite: true },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css', '~/assets/css/github-markdown-dark.css', '~/assets/css/github-markdown-light.css'],
  app: {
    head: {
      title: 'MindForge',
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@clerk/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
  ],
  shadcn: {
    // prefix: "Shadcn",
    prefix: '',
    componentDir: '@/components/ui',
  },
  colorMode: {
    classSuffix: '',
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '简体中文', file: 'cn.json' },
      { code: 'mg', language: 'mg-MG', name: 'Монгол', file: 'mg.json' },
      { code: 'bm', language: 'bm-BM', name: 'Burmese', file: 'bm.json' },
      { code: 'ta', language: 'ta-TL', name: 'Thai', file: 'ta.json' },
      { code: 'fr', language: 'fr-FR', name: 'French', file: 'ta.json' },
      { code: 'sp', language: 'fr-SP', name: 'Spain', file: 'sp.json' },

      { code: 'wtf', language: 'wtf-Ether', name: '💩', file: 'wtf.json' },
    ],
    defaultLocale: 'en',
  },
  routeRules: {
    '/api/m/**': {
      // eslint-disable-next-line node/prefer-global/process
      proxy: `${process.env.NUXT_API_URL}api/**`,
      cors: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
