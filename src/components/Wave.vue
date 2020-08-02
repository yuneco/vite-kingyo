<template>
  <div class="">
    <div
      class="WaveRoot"
      :style="{
        left: `${x - 50}px`,
        top: `${y - 50}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Wave",
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  setup(_, ctx) {
    onMounted(() => {
      window.setTimeout(() => {
        ctx.emit("end");
      }, 6000);
    });
  },
});
</script>

<style lang="scss" scoped>
.WaveRoot {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  border: 1.8px solid currentColor;
  border-radius: 100%;
  pointer-events: none;
  animation: appear 5s both;
  &::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    left: calc(10% - 1px);
    top: calc(10% - 1px);
    border: 1.4px solid currentColor;
    border-radius: 100%;
  }
  &::after {
    content: "";
    position: absolute;
    width: 60%;
    height: 60%;
    left: calc(20% - 1px);
    top: calc(20% - 1px);
    border: 1.2px solid currentColor;
    border-radius: 100%;
  }
}

@keyframes appear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  10% {
    transform: scale(0.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
