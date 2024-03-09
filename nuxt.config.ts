// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      htmlAttrs: { class: 'ui-scrollbars' },
      meta: [
        // { 'http-equiv': 'content-security-policy', content: 'default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; style-src &#39;self&#39; &#39;unsafe-inline&#39;;' }
      ]
    }
  },
  css: ['~/styles/base.css']
})
