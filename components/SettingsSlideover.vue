<script setup lang="ts">
const isOpen = ref(false)

const renderMode = ref<'preview' | 'render'>('preview')

const ui = {
  strategy: 'override',
  base: '@media(pointer:coarse)]:hidden h-auto px-2 py-1 text-xs line-clamp-2 font-normal relative',
}

const uiCard = {
  background: 'bg-gray-100 dark:bg-gray-900',
}
</script>

<template>
    <UCard :ui="uiCard" class="fixed top-0 right-0 m-4">
    <div class="space-x-3 flex">
      <UButton size="lg" label="Save" />
       
    </div>
    </UCard>


    <USlideover v-model="isOpen">
    <div class="py-4 px-3 flex items-center text-base font-medium">
      <span class="w-full">Settings</span>
      <UButton @click="isOpen = false" variant="ghost" color="gray" icon="i-heroicons-x-mark" /> 
       </div>
      <div class="p-4 flex-1">
       <div class="flex items-center">
        <span class="w-full">Display Mode:</span>
        <UTooltip :ui="ui">
          <template #text>
            <span>Preview will render image in your browser sizes, render - in your monitor</span>
          </template>
          <UButton variant="ghost" icon="i-heroicons-information-circle" />
        </UTooltip>
       </div>
       <div class="my-4">
        <UButtonGroup size="sm" orientation="horizontal">
    <UButton @click="renderMode = 'preview'" :color="renderMode === 'preview' ? 'primary' : 'gray'" label="Preview" />
    <UButton @click="renderMode = 'render'" :color="renderMode === 'render' ? 'primary' : 'gray'" label="Render" />
  </UButtonGroup>
  
       </div>
      </div>
    </USlideover>
</template>

