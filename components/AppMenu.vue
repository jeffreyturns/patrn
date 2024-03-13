<script setup lang="ts">
const hide = ref(false)
</script>

<template>
  <div class="fixed bottom-0 mb-4 flex w-full items-center justify-center">
    <UCard :class="hide ? 'translate-y-0': 'translate-y-[200%]'" :ui="{ body: { padding: 'px-1 py-1 sm:p-1' } }" class="transition-transform duration-300 ease-[0.85,0,0,1]">
      <UButton class="flex items-center justify-center" variant="null" @click="hide = false">
        <UIcon name="i-heroicons-chevron-up" />
      </UButton>
    </UCard>
  </div>
  <div class="fixed bottom-0 flex w-full items-center justify-center p-4 transition-all duration-300 ease-[0.85,0,0,1]" :class="hide ? 'translate-y-full scale-y-0': 'translate-y-0 scale-y-1'">
    <UCard class="max-w-xl">
      <UButton variant="null" color="white" class="mb-4 flex w-full items-center justify-center text-center" @click="hide = true">
        <UIcon name="i-heroicons-chevron-down" />
      </UButton>
      <div class="space-x-3">
        <slot />
      </div>
    </UCard>
  </div>
</template>
