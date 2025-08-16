<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasHeight = ref(100)
const canvasWidth = ref(100)
const errorMessage = ref('')
const renderTime = ref(0)
const renderFunction = useRenderFunction()
const renderMode = useRenderMode()
const customRenderSize = useCustomRenderSize()

const debouncedFExpression = useDebounce(renderFunction)

let worker: Worker

onMounted(async () => {
  // Check if we have `?f={code}` in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const fParam = urlParams.get('f')
  await initWorker()
  applySettings()

  if (fParam) {
    renderFunction.value = fParam
    render()
  }
})

async function initWorker() {
  worker = new Worker(new URL('~/assets/worker/renderer.ts', import.meta.url))
  worker.onmessage = (event) => {

    const { imageData, time, error } = event.data

    if (error) {
      errorMessage.value = error
    } else {
      errorMessage.value = ''
    }

    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.putImageData(imageData, 0, 0)

    ctx.imageSmoothingEnabled = true
    renderTime.value = time
  }
}

const render = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  worker.postMessage({
    function: renderFunction.value,
    width: canvas.width,
    height: canvas.height,
  })
}

watch(() => debouncedFExpression.value, () => render())

function saveImage () {
  const canvas = canvasRef.value
  const timestamp = new Date().getTime()
  const downloadLink = document.createElement('a')

  if (!canvas) {
    errorMessage.value = 'Canvas not available'
    return
  }

  downloadLink.href = canvas.toDataURL('image/png')
  downloadLink.download = 'canvas_' + timestamp + '.png'
  downloadLink.click()
}

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
</script>

<template>
  <canvas ref="canvasRef" class="h-screen w-screen object-cover" :height="canvasHeight" :width="canvasWidth" />

  <UCard class="fixed left-0 top-0 m-4">
    <div class="flex items-center space-x-3">
      <span class="font-mono text-sm">f(x, y, w, h) => </span>
      <UInput v-model="renderFunction" />
      <UButton v-if="renderFunction.length > 0" variant="ghost" color="gray" icon="i-heroicons-x-mark" @click="renderFunction = ''" />
    </div>
    <div class="mt-3 font-mono tracking-tight">
      render time: {{ renderTime }} ms
    </div>
  </UCard>
  <div class="fixed bottom-0 left-0 m-4 max-h-60 w-64 space-y-3">
    <Transition name="fade">
      <UAlert v-if="errorMessage.length > 0" color="red" :title="errorMessage" />
    </Transition>
  </div>
  <AppMenu>
    <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-path" @click="render()" />
    <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-down-tray" @click="saveImage()" />
    <MenuSettings @apply="applySettings()" />
    <MenuPatternGallery />
    <ModalAbout />
  </AppMenu>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200 ease-linear;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
