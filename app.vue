<template>
      <canvas ref="canvasRef" :height="canvasHeight" :width="canvasWidth" />

      <UCard class="fixed top-0 left-0 m-4">
        <div class="flex space-x-3 items-center">
          <span class="font-mono text-sm">f(x, y, w, h) => </span>
          <UInput v-model="fExpression" />
        </div>
      </UCard>
      <UAlert color="red" variant="subtle" v-if="errorMessage" :title="errorMessage" class="fixed bottom-0 left-0 max-w-xs m-4" />
      <!-- <SettingsSlideover /> -->
      <UButton class="fixed top-0 right-0 m-4" variant="solid" color="gray" size="lg" icon="i-heroicons-bars-3"  />
      <div class="fixed bottom-0 w-full flex justify-center items-center p-4">
        <UCard class="max-w-xl">
            <div class="space-x-3">
            <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-path"  />
            <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-arrow-down-tray"  />
            <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-cog-6-tooth"  />
            <UButton variant="solid" color="gray" size="lg" icon="i-heroicons-swatch"  />
            </div>
        </UCard>
      </div>
</template>

<script setup>
  const canvasRef = ref(null)
  const canvasHeight = ref(100)
  const canvasWidth = ref(2000)
  const fExpression = ref("(Math.random() < 0.05) ? 255 : 0")
  const errorMessage = ref("")

  let f = (x, y, w, h) => 255

  function draw() {
      const canvas = canvasRef.value
      const ctx = canvas.getContext("2d", { willReadFrequently: true })

      if (!canvas || !ctx) {
          errorMessage.value = "Canvas or context not available"
          return
      }

      errorMessage.value = ""

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
                  errorMessage.value = e.message
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

  watch([fExpression], () => {
      try {
          f = new Function("x", "y", "w", "h", `return ${fExpression.value}`)
          draw()
      } catch (e) {
          errorMessage.value = e.message
      }
  })

  function saveImage() {
      const canvas = canvasRef.value
      const timestamp = new Date().getTime()
      const downloadLink = document.createElement("a")

      if (!canvas) {
          errorMessage.value = "Canvas not available"
          return
      }

      downloadLink.href = canvas.toDataURL("image/png")
      downloadLink.download = "canvas_" + timestamp + ".png"
      downloadLink.click()
  }

  onMounted(() => {
      draw()
      canvasHeight.value = window.innerHeight
      canvasWidth.value = window.innerWidth
  })
</script>