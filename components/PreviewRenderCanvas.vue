<script lang="ts" setup>
const props = defineProps<{ function: string }>()
const previewRef = ref<HTMLCanvasElement | null>(null)

let f: (x: number, y: number, w: number, h: number) => number
const renderTime = ref(0)

function draw () {
  const canvas = previewRef.value
  if (!canvas) { return }

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) { return }

  const startTime = performance.now()
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const imageData = ctx.createImageData(canvas.width, canvas.height)
  const data = imageData.data

  const getPixelIndex = (x: number, y: number) => (y * canvas.width + x) * 4

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = getPixelIndex(x, y)
      let value
      try {
        value = f(x, y, canvas.width, canvas.height) % 256
      } catch (e: any) {
        console.error('Error evaluating function:', e)
        value = 0
      }
      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)

  renderTime.value = Math.floor(performance.now() - startTime)
}

const render = () => {
  try {
    // @ts-expect-error
    // eslint-disable-next-line no-new-func
    f = Function('x', 'y', 'w', 'h', `return ${props.function}`)
    draw()
  } catch (e: any) {
    console.error('Invalid function:', e)
    return () => 0
  }
}

onMounted(() => render())
</script>

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
