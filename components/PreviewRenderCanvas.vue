<script lang="ts" setup>
const previewRef = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{ function: string }>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const f = ref((x: number, y: number, w: number, h: number) => 255)

function draw () {
  const canvas = previewRef.value

  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  if (!ctx) {
    return
  }

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

onMounted(() => {
  // @ts-expect-error
  // eslint-disable-next-line no-new-func
  f.value = new Function('x', 'y', 'w', 'h', `return ${props.function}`)
  draw()
})
</script>

<template>
  <div class="overflow-hidden rounded-md ring-1 ring-gray-200 dark:ring-gray-800">
    <canvas ref="previewRef" class="h-48 w-full" />
  </div>
  <div class="mt-2 font-mono font-bold">
    {{ props.function }}
  </div>
</template>
