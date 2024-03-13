<!-- eslint-disable @stylistic/max-len -->
<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'title', content: 'Patrn - create beautiful patterns with mathematics' },
    { name: 'description', content: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.' },
    { property: 'og:title', content: 'Patrn - create beautiful patterns with mathematics' },
    { property: 'og:url', content: 'https://patrn.vercel.app' },
    { property: 'og:description', content: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.' },
    { property: 'og:image', content: 'https://patrn.vercel.app/social-card.png' },
    { name: 'twitter:title', content: 'Patrn - create beautiful patterns with mathematics' },
    { name: 'twitter:description', content: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.' },
    { name: 'twitter:image', content: 'https://patrn.vercel.app/social-card.png' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: { lang: 'en' }
})
</script>

<template>
  <NuxtPage />
</template>
