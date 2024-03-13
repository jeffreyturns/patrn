// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: { head: { htmlAttrs: { class: 'ui-scrollbars' } } },
  css: ['~/styles/base.css']
})
