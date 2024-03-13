<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'Patrn - create beautiful patterns with mathematics',
  ogTitle: 'Patrn - create beautiful patterns with mathematics',
  ogUrl: 'https://patrn.vercel.app',
  description: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.',
  ogDescription: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.',
  ogImage: 'https://patrn.vercel.app/social-card.png',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: 'https://patrn.vercel.app/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtPage />
</template>
