<script setup lang="ts">
const gallery = ref(false)

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
  gallery.value = false
}
</script>

<template>
  <UButton variant="solid" size="lg" :color="gallery ? 'primary' : 'gray'" icon="i-heroicons-photo" @click="gallery = true" />
  <USlideover v-model="gallery">
    <div class="flex-1 space-y-3 overflow-auto p-4">
      <template v-for="func in list" :key="func">
        <PreviewRenderCanvas :function="func" />
        <UButton label="Apply" @click="chooseFunction(func)" />
      </template>
    </div>
  </USlideover>
</template>
