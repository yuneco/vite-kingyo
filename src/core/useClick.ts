import { onMounted, reactive, onUnmounted } from "vue";

type MouseClickHandler = () => void;

export const useClick = (
  handler: MouseClickHandler,
  targetDom?: HTMLElement
) => {
  const onMouseClick = (ev: PointerEvent): void => {
    handler?.();
  };

  onMounted(() => {
    const target = targetDom ?? document.body;
    target.addEventListener("click", onMouseClick);
  });
  onUnmounted(() => {
    const target = targetDom ?? document.body;
    target.removeEventListener("click", onMouseClick);
  });

  return {};
};
