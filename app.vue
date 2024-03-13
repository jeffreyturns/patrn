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

const meta = {
  title: 'Patrn - create beautiful patterns with mathematics',
  // eslint-disable-next-line @stylistic/max-len
  description: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.'
}

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  ogUrl: 'https://patrn.vercel.app',
  description: meta.description,
  ogDescription: meta.description,
  ogImage: 'https://patrn.vercel.app/social-card.png',
  twitterTitle: meta.title,
  twitterDescription: meta.description,
  twitterImage: 'https://patrn.vercel.app/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtPage />
</template>
