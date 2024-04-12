<script lang="ts" setup>
const slideover = ref(false)
const renderMode = useRenderMode()
const customRenderSize = useCustomRenderSize()

defineEmits<{
  apply: [func: void]
}>()

const settings = ref({
  renderMode: renderMode.value,
  customRenderSize: customRenderSize.value
})

function changeSettings () {
  renderMode.value = settings.value.renderMode
  customRenderSize.value = settings.value.customRenderSize

  slideover.value = false
}

function resetSettings () {
  settings.value = ({
    renderMode: renderMode.value,
    customRenderSize: customRenderSize.value
  })
}
</script>

<template>
  <UButton
    :color="slideover ? 'primary' : 'gray'"
    variant="solid"
    size="lg"
    icon="i-heroicons-cog-6-tooth"
    @click="slideover = true" />

  <USlideover v-model="slideover" @close="resetSettings">
    <header class="fixed z-10 flex w-full items-center rounded-tl-2xl border-b border-gray-200 bg-gray-100/75 p-4 backdrop-blur-sm dark:bg-gray-900/75">
      <h3 class="text-base font-bold">
        Settings
      </h3>
      <span class="grow" />
      <UButton variant="ghost" color="gray" icon="i-heroicons-x-mark" @click="slideover = false" />
    </header>

    <UCard class="flex flex-1 flex-col overflow-auto !rounded-none !bg-transparent py-16 shadow-none" :ui="{ body: { base: 'flex-1' }, ring: '' }">
      <div class="flex items-center">
        <span class="w-full">Display Mode:</span>
        <UPopover mode="hover" :popper="{ placement: 'bottom-end', offsetDistance: 4 }">
          <UButton variant="ghost" icon="i-heroicons-information-circle" />

          <template #panel>
            <div class="max-w-xs p-2">
              <span class="text-sm">Preview will render image in browser sizes, while rendering will resize it to your monitor sizes</span>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="my-4">
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton :color="settings.renderMode === 'preview' ? 'primary' : 'gray'" label="Preview" @click="settings.renderMode = 'preview'" />
          <UButton :color="settings.renderMode === 'render' ? 'primary' : 'gray'" label="Render" @click="settings.renderMode = 'render'" />
          <UButton :color="settings.renderMode === 'custom' ? 'primary' : 'gray'" label="Custom" @click="settings.renderMode = 'custom'" />
        </UButtonGroup>
        <div v-if="settings.renderMode === 'custom'" class="mt-4 flex items-center space-x-3">
          <UInput v-model="settings.customRenderSize.width" type="number" />
          <UIcon name="i-heroicons-x-mark" />
          <UInput v-model="settings.customRenderSize.height" type="number" />
        </div>
        <UAlert
          v-if="settings.renderMode === 'custom' && (settings.customRenderSize.height > 4000 || settings.customRenderSize.width > 4000)"
          class="my-3"
          color="red"
          title="Using a large render size can strain your CPU, impacting performance." />
      </div>
    </UCard>

    <footer class="fixed bottom-0 flex w-full space-x-3 rounded-bl-2xl border-t border-gray-200 bg-gray-100/75 px-4 py-3.5 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/75">
      <UButton size="md" label="Apply" @click="$emit('apply', changeSettings())" />
      <UButton size="md" variant="ghost" label="Cancel" @click="slideover = false" />
    </footer>
  </USlideover>
</template>
