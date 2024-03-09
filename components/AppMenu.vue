<script setup lang="ts">
const menu = ref(false)
const gallery = ref(false)
const hide = ref(false)
const renderMode = useRenderMode()
const emits = defineEmits(['rerender', 'download', 'settings'])

function toggleMenuSettings () {
  menu.value = true
}

const list = [
  '((x + y) % 200 < Math.random() * 100) ? 120 : 35',
  '((x + y) % 30 < 5) ? 120 : 35',
  '(Math.sin(Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) / 20 + Math.atan2(y - h / 2, x - w / 2) * 10) > 0) ? 120: 35',
  '(Math.sin(x / 10) + Math.sin(y / 10) > 0) ? 120 : 35'
]
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
        <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-path" @click="$emit('rerender')" />
        <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-down-tray" @click="$emit('download')" />
        <UButton :color="menu ? 'primary' : 'gray'" variant="solid" size="lg" icon="i-heroicons-cog-6-tooth" @click="$emit('settings', toggleMenuSettings())" />
        <UButton variant="solid" size="lg" :color="gallery ? 'primary' : 'gray'" icon="i-heroicons-photo" @click="gallery = true" />
        <UButton variant="solid" size="lg" color="gray" icon="i-heroicons-information-circle" />
      </div>
    </UCard>
  </div>

  <USlideover v-model="menu">
    <div class="flex items-center px-3 py-4 text-base font-medium">
      <span class="w-full">Settings</span>
      <UButton variant="ghost" color="gray" icon="i-heroicons-x-mark" @click="menu = false" />
    </div>
    <div class="flex-1 p-4">
      <div class="flex items-center">
        <span class="w-full">Display Mode:</span>
        <UPopover mode="hover" :popper="{ placement: 'bottom-end', offsetDistance: 4 }">
          <UButton variant="ghost" icon="i-heroicons-information-circle" />

          <template #panel>
            <div class="max-w-xs p-2">
              <span class="text-sm">Preview will render image in your browser sizes, render - in your monitor</span>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="my-4">
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton :color="renderMode === 'preview' ? 'primary' : 'gray'" label="Preview" @click="renderMode = 'preview'" />
          <UButton :color="renderMode === 'render' ? 'primary' : 'gray'" label="Render" @click="renderMode = 'render'" />
        </UButtonGroup>
      </div>
    </div>
  </USlideover>

  <USlideover v-model="gallery">
    <div class="flex-1 space-y-3 overflow-auto p-4">
      <PreviewRenderCanvas v-for="fun in list" :key="fun" v-bind:function="fun" />
    </div>
  </USlideover>
</template>
