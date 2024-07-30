<template>
  <div class="overflow-hidden rounded-md ring-1 ring-gray-200 dark:ring-gray-800">
    <canvas ref="previewRef" class="h-48 w-full" />
  </div>
  <div class="mt-2 font-mono font-bold">
    {{ props.function }}
    <DevOnly>
      <span class="text-green-600 dark:text-green-200">- {{ renderTime }}ms</span>
    </DevOnly>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ function: string }>()
const previewRef = ref<HTMLCanvasElement | null>(null)
const renderTime = ref(0)

let worker: Worker

function initWorker() {
  worker = new Worker(new URL('~/assets/worker/renderer.ts', import.meta.url))
  worker.onmessage = (event) => {
    const { imageData, time } = event.data
    const canvas = previewRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.putImageData(imageData, 0, 0)
    renderTime.value = time
  }
}

const render = () => {
  const canvas = previewRef.value
  if (!canvas) return

  worker.postMessage({
    function: props.function,
    width: canvas.width,
    height: canvas.height,
  })
}

onMounted(() => {
  initWorker()
  render()
})
</script>
