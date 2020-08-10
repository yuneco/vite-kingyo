import { onMounted, reactive, onUnmounted } from "vue";

export const useMouse = (targetDom?: HTMLElement) => {
  const mousePos = reactive({
    x: 0,
    y: 0,
  });
  const onMove = (ev: PointerEvent): void => {
    mousePos.x = ev.clientX;
    mousePos.y = ev.clientY;
  };
  const onMoveTouch = (ev: TouchEvent): void => {
    mousePos.x = ev.touches[0].clientX;
    mousePos.y = ev.touches[0].clientY;
  };
  onMounted(() => {
    const target = targetDom ?? document.body;
    target.addEventListener("pointermove", onMove);
    target.addEventListener("touchmove", onMoveTouch);
  });
  onUnmounted(() => {
    const target = targetDom ?? document.body;
    target.removeEventListener("pointermove", onMove);
    target.removeEventListener("touchmove", onMoveTouch);
  });

  return {
    mousePos,
  };
};
