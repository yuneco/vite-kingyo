import { onMounted, reactive, onUnmounted } from 'vue'

export const useMouse = (targetDom?: HTMLElement) => {
  const mousePos = reactive({
    x: 0,
    y: 0
  })
  const onMove = (ev: PointerEvent): void => {
    mousePos.x = ev.clientX
    mousePos.y = ev.clientY
  }
  const onMoveTouch = (ev: TouchEvent): void => {
    mousePos.x = ev.touches[0].clientX
    mousePos.y = ev.touches[0].clientY
  }
  onMounted(() => {
    (targetDom ?? document.body).addEventListener('pointermove', onMove);
    (targetDom ?? document.body).addEventListener('touchmove', onMoveTouch);
  })
  onUnmounted(() => {
    (targetDom ?? document.body).removeEventListener('pointermove', onMove);
    (targetDom ?? document.body).removeEventListener('touchmove', onMoveTouch);
  })

  return {
    mousePos
  }
}
