self.onmessage = (event) => {
  const { function: funcStr, width, height } = event.data

  let f
  try {
    f = new Function('x', 'y', 'w', 'h', `return ${funcStr}`)
  } catch (error) {
    self.postMessage({ error: 'Error evaluating function' })
    return
  }

  const imageData = new ImageData(width, height)
  const data = imageData.data

  const getPixelIndex = (x: number, y: number) => (y * width + x) * 4

  const startTime = performance.now()

  try {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = getPixelIndex(x, y)
        let value
        try {
          value = f(x, y, width, height) % 256
        } catch (e) {
          console.error('Error evaluating function:', e)
          value = 0
        }
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }
    }
  } catch (error) {
    self.postMessage({ error: 'Error evaluating function' })
    return
  }

  const time = Math.floor(performance.now() - startTime)
  self.postMessage({ imageData, time })
}
