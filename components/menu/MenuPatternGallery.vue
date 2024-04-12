<script setup lang="ts">
const slideover = ref(false)

const renderFunction = useRenderFunction()

const list = [
  '((x + y) % 200 < Math.random() * 100) ? 120 : 35',
  '((x + y) % 30 < 5) ? 120 : 35',
  '(Math.sin(Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) / 20 + Math.atan2(y - h / 2, x - w / 2) * 10) > 0) ? 120: 35',
  '(Math.sqrt(x ** 2 + y ** 2) % 50 < 25) ? 120 : 35',
  '(Math.sin(x / 10) + Math.sin(y / 10) > 0) ? 120 : 35',
  '((x % 20 < 10) ^ (y % 20 < 10)) ? 120 : 35',
  '(((x ^ 2) % 10 + (y ^ 2) % 10) % 20 === 0 ? 255 : 120)',
  'Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) / Math.sqrt(w ** 2 + h ** 2) * 255',
  'Math.sqrt(x ** 2 / y ** 2) % 1 === 0 ? 120 : 35',
  'Math.sin(x / 10) * Math.cos(y / 10) * 35',
  '(((Math.abs(x % 20 - 10) + Math.abs(y % 20 - 10)) < 10) || ((Math.abs(x % 50 - 10) + Math.abs(y % 50 - 10)) > 10)) ? 35 : 120',
  '(((Math.abs(x % 20 - 10) + Math.abs(y % 20 - 10)) < 10) || ((Math.abs(x % 20 - 10) + Math.abs(y % 20 - 10)) > 10)) ? 35 : 120',
  '(Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) % 20 < 10) ? (Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) / Math.sqrt(w ** 2 + h ** 2) * 120) : 0'
]

function chooseFunction (func: string) {
  renderFunction.value = func
  slideover.value = false
}
</script>

<template>
  <UButton variant="solid" size="lg" :color="slideover ? 'primary' : 'gray'" icon="i-heroicons-photo" @click="slideover = true" />

  <USlideover v-model="slideover">
    <header class="fixed z-10 flex w-full items-center rounded-tl-2xl border-b border-gray-200 bg-gray-100/75 p-4 backdrop-blur-sm dark:bg-gray-900/75">
      <h3 class="text-base font-bold">
        Gallery
      </h3>
      <span class="grow" />
      <UButton variant="ghost" color="gray" icon="i-heroicons-x-mark" @click="slideover = false" />
    </header>

    <UCard class="flex flex-1 flex-col overflow-auto !rounded-none !bg-transparent py-16 shadow-none" :ui="{ body: { base: 'flex-1' }, ring: '' }">
      <div class="flex-1 space-y-3">
        <template v-for="func in list" :key="func">
          <PreviewRenderCanvas :function="func" />
          <UButton label="Apply" @click="chooseFunction(func)" />
        </template>
      </div>
    </UCard>

    <footer class="fixed bottom-0 flex w-full space-x-3 rounded-bl-2xl border-t border-gray-200 bg-gray-100/75 px-4 py-3.5 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/75">
      <UButton size="md" variant="ghost" label="Cancel" @click="slideover = false" />
    </footer>
  </USlideover>
</template>
