<template>
  <canvas ref="canvasRef" class="h-screen w-screen" :height="canvasHeight" :width="canvasWidth" />

  <UCard class="fixed left-0 top-0 m-4">
    <div class="flex items-center space-x-3">
      <span class="font-mono text-sm">f(x, y, w, h) => </span>
      <UInput v-model="fExpression" />
    </div>
  </UCard>
  <div class="fixed bottom-0 left-0 m-4 max-h-60 w-64 space-y-3">
    <TransitionGroup name="list">
      <UAlert v-for="it in errorMessages" :key="it + Date.now()" color="red" :title="it" />
    </TransitionGroup>
  </div>
  <!-- <UButton class="fixed top-0 right-0 m-4" variant="solid" color="gray" size="lg" icon="i-heroicons-bars-3"  /> -->
  <AppMenu @rerender="draw()" @download="saveImage()" />
</template>

<script setup>
const canvasRef = ref(null)
const canvasHeight = ref(100)
const canvasWidth = ref(100)
const fExpression = ref('((x + y) % 200 < Math.random() * 100) ? 120 : 35')
const debouncedFExpression = useDebounce(fExpression, 500)
const errorMessages = ref([])

let f = (x, y, w, h) => 255

const renderMode = useRenderMode()

function draw () {
  const canvas = canvasRef.value

  if (!canvas) {
    errorMessages.value = ['Canvas not available']
    return
  }

  const ctx = canvas.getContext('2d', { willReadFrequently: true })

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
        value = f(x, y, canvas.width, canvas.height) % 256
      } catch (e) {
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
}

watch(
  () => debouncedFExpression.value,
  () => {
    try {
      f = new Function('x', 'y', 'w', 'h', `return ${fExpression.value}`)
      draw()
    } catch (e) {
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
  if (renderMode.value === 'preview') {
    canvasHeight.value = window.innerHeight
    canvasWidth.value = window.innerWidth
  } else {
    canvasHeight.value = window.screen.height
    canvasWidth.value = window.screen.width
  }
})

watch(renderMode, () => {
  if (renderMode.value === 'preview') {
    canvasHeight.value = window.innerHeight
    canvasWidth.value = window.innerWidth
  } else {
    canvasHeight.value = window.screen.height
    canvasWidth.value = window.screen.width
  }
})

// window.addEventListener("resize", () => {
//     canvasHeight.value = window.innerHeight;
//     canvasWidth.value = window.innerWidth;
// });

watch(
  () => errorMessages.value.length,
  () => {
    if (errorMessages.value.length > 5) {
      errorMessages.value.shift()
    }
  }
)
</script>

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
