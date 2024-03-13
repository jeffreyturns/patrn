<script lang="ts" setup>
const menu = ref(false)
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

  menu.value = false
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
    :color="menu ? 'primary' : 'gray'"
    variant="solid"
    size="lg"
    icon="i-heroicons-cog-6-tooth"
    @click="menu = true" />

  <USlideover v-model="menu" @close="resetSettings">
    <UCard class="flex flex-1 flex-col" :ui="{ body: { base: 'flex-1' }, ring: '' }">
      <template #header>
        <div class="flex items-center text-base font-medium">
          <span class="w-full font-bold">Settings</span>
          <UButton variant="ghost" color="gray" icon="i-heroicons-x-mark" @click="menu = false" />
        </div>
      </template>

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

      <template #footer>
        <div class="flex space-x-3">
          <UButton size="md" label="Apply" @click="$emit('apply', changeSettings())" />
          <UButton size="md" variant="ghost" label="Cancel" @click="menu = false" />
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
