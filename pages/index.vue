<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasHeight = ref(100)
const canvasWidth = ref(100)
const errorMessages = ref<string[]>([])
const executionTime = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const f = ref((x: number, y: number, w: number, h: number) => 255)

const renderFunction = useRenderFunction()
const renderMode = useRenderMode()
const customRenderSize = useCustomRenderSize()

const debouncedFExpression = useDebounce(renderFunction, 500)

useSeoMeta({
  title: 'Patrn - create beautiful patterns with mathematics',
  ogTitle: 'Patrn - create beautiful patterns with mathematics',
  // eslint-disable-next-line @stylistic/max-len
  description: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.',
  // eslint-disable-next-line @stylistic/max-len
  ogDescription: 'Discover the magic of transforming mathematical formulas into stunning visual patterns with Patrn. Explore the intersection of art and mathematics, where sophistication meets simplicity.'
})

async function draw () {
  const startTime = performance.now()
  const canvas = await canvasRef.value

  if (!canvas) {
    errorMessages.value.push('Canvas not available')
    return
  }

  const ctx = await canvas.getContext('2d', { willReadFrequently: true })

  if (!ctx) {
    errorMessages.value = ['Context not available']
    return
  }

  errorMessages.value = []

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const i = (y * canvas.width + x) * 4

      let value

      try {
        value = f.value(x, y, canvas.width, canvas.height) % 256
      } catch (e: any) {
        errorMessages.value.push(e.message)
        throw new Error(e.message)
      }

      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)
  await new Promise(resolve => setTimeout(resolve))
  const endTime = performance.now()

  executionTime.value = Math.floor(endTime - startTime)
}

watch(
  () => debouncedFExpression.value,
  () => {
    try {
      // @ts-expect-error
      // eslint-disable-next-line no-new-func
      f.value = new Function('x', 'y', 'w', 'h', `return ${renderFunction.value}`)
      draw()
    } catch (e: any) {
      errorMessages.value.push(e.message)
    }
  }
)

function saveImage () {
  const canvas = canvasRef.value
  const timestamp = new Date().getTime()
  const downloadLink = document.createElement('a')

  if (!canvas) {
    errorMessages.value.push('Canvas not available')
    return
  }

  downloadLink.href = canvas.toDataURL('image/png')
  downloadLink.download = 'canvas_' + timestamp + '.png'
  downloadLink.click()
}

onMounted(() => {
  applySettings()
})

function applySettings () {
  if (renderMode.value === 'preview') {
    canvasHeight.value = window.innerHeight
    canvasWidth.value = window.innerWidth
  }
  if (renderMode.value === 'render') {
    canvasHeight.value = window.screen.height
    canvasWidth.value = window.screen.width
  }
  if (renderMode.value === 'custom') {
    canvasHeight.value = customRenderSize.value.height
    canvasWidth.value = customRenderSize.value.width
  }
}

watch(
  () => errorMessages.value.length,
  () => {
    if (errorMessages.value.length > 5) {
      errorMessages.value.shift()
    }
  }
)
</script>

<template>
  <canvas ref="canvasRef" class="h-screen w-screen" :height="canvasHeight" :width="canvasWidth" />

  <UCard class="fixed left-0 top-0 m-4">
    <div class="flex items-center space-x-3">
      <span class="font-mono text-sm">f(x, y, w, h) => </span>
      <UInput v-model="renderFunction" />
    </div>
    <div class="mt-3 font-mono tracking-tight">
      render time: {{ executionTime }} ms
    </div>
  </UCard>
  <div class="fixed bottom-0 left-0 m-4 max-h-60 w-64 space-y-3">
    <TransitionGroup name="list">
      <UAlert v-for="it in errorMessages" :key="it + Date.now()" color="red" :title="it" />
    </TransitionGroup>
  </div>
  <AppMenu>
    <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-path" @click="draw()" />
    <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-down-tray" @click="saveImage()" />
    <MenuSettings @apply="applySettings()" />
    <MenuPatternGallery />
    <ModalAbout />
  </AppMenu>
</template>

<style>
  .list-enter-active,
  .list-leave-active {
      transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
  }
</style>
