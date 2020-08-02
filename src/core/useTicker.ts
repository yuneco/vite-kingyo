import { onMounted, onUnmounted } from 'vue'

export const useTicker = (onTick: () => void, interval = 1000) => {

  let timer = 0
  onMounted(() => {
    timer = window.setInterval(onTick, interval)
  })
  onUnmounted(() => {
    window.clearInterval(timer)
  })

  return {
  }
}
