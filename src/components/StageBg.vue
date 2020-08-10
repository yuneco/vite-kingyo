<template>
  <div class="StageBgRoot">
    <transition-group name="list">
      <div
        class="Stone"
        v-for="stone in stones"
        :key="stone.id"
        :style="{
          left: `calc(${stone.x * 100}% - ${stone.size / 2}px)`,
          top: `calc(${stone.y * 100}% - ${stone.size / 2}px)`,
          width: `${stone.size}px`,
          height: `${stone.size}px`,
          backgroundColor: stone.color,
        }"
      />
    </transition-group>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTicker } from "../core/useTicker";

type StoneModel = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

const randomStoneColor = (sizeRate: number): string => {
  const isRed = sizeRate < 0.25;
  const l = (1 - sizeRate) * 50 + 10;
  return isRed
    ? `hsl(${0 + Math.random() * 30}, 70%, 70%, ${1 - sizeRate})`
    : `hsl(${170 + Math.random() * 50}, 30%, ${l}%, ${1 - sizeRate})`;
};

const createStone = (): StoneModel => {
  const sizeR = Math.random();
  return {
    id: Math.random(),
    x: Math.random(),
    y: Math.random(),
    size: 20 + sizeR ** 2 * 200,
    color: randomStoneColor(sizeR),
  };
};

const MAX_STONE = 50;

export default defineComponent({
  name: "StageBg",
  setup(_, ctx) {
    const stones = ref<StoneModel[]>([]);

    const addStone = () => {
      stones.value.push(createStone());
      if (stones.value.length > MAX_STONE) {
        stones.value.shift();
      }
    };

    useTicker(addStone, 400);
    return {
      stones,
    };
  },
});
</script>

<style lang="scss" scoped>
.Stone.list-enter-from, .Stone.list-leave-to {
  opacity: 0;
}

.Stone {
  position: absolute;
  border-radius: 100%;
  opacity: 1;
  transition: opacity 5s;
}

.StageBgRoot {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
