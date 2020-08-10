<template>
  <StageBg class="FishStageRoot">
    <Fish
      v-for="fishProps in stageState.fishList"
      :key="fishProps.id"
      class="FishElement"
      :x="fishProps.position.x"
      :y="fishProps.position.y"
      :angle="fishProps.angle"
      :color="fishProps.color"
      :scale="fishProps.scale"
    ></Fish>
    <Wave
      v-for="waveProps in stageState.waveList"
      class="WaveElement"
      :key="waveProps.id"
      :x="waveProps.position.x"
      :y="waveProps.position.y"
      @end="removeWave(waveProps)"
    />
  </StageBg>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { Fish } from "./Fish";
import Wave from "./Wave.vue";
import StageBg from "./StageBg.vue";
import { Point } from "../core/Point";
import { useMouse } from "../core/useMouse";
import { useClick } from "../core/useClick";
import { useTicker } from "../core/useTicker";
import { useAnimationFrame } from "../core/useAnimationFrame";
import { FishModel } from "../core/FishModel";
import { WaveModel } from "../core/WaveModel";

const ADD_FISH_PER_SEC = 16;

type StageState = {
  fishList: FishModel[];
  waveList: WaveModel[];
};

export default defineComponent({
  name: "FishStage",
  components: { Fish, Wave, StageBg },
  props: {
    maxFish: { type: Number, default: 50 },
  },
  setup(props, ctx) {
    const { mousePos: destination } = useMouse();
    const stageState = reactive<StageState>({
      fishList: [],
      waveList: [],
    });
    const fishCount = computed(() => stageState.fishList.length);
    const updateFish = () => {
      const destPoint = new Point(destination.x, destination.y);
      stageState.fishList.forEach((fish) => fish.update(destPoint));
    };

    const addFish = () => {
      stageState.fishList.push(new FishModel());
      ctx.emit("count-changed", fishCount.value);
    };

    const addWave = (x: number, y: number) => {
      const RND = 100;
      const rndX = (Math.random() - 0.5) * RND;
      const rndY = (Math.random() - 0.5) * RND;
      stageState.waveList.push(new WaveModel(new Point(x + rndX, y + rndY)));
    };

    const removeWave = (wave: WaveModel) => {
      stageState.waveList = stageState.waveList.filter((w) => w !== wave);
    };

    useTicker(() => {
      if (Math.random() < 0.93) {
        return;
      }
      addWave(destination.x, destination.y);
    }, 100);

    useAnimationFrame(() => {
      updateFish();
      if (fishCount.value < props.maxFish) {
        addFish();
      }
      return true;
    });

    useClick(() => {
      stageState.fishList.forEach((fish) => fish.setForce(-1 - Math.random() * 4));
      addWave(destination.x, destination.y);
    });

    return {
      stageState,
      addWave,
      removeWave,
    };
  },
});
</script>

<style scoped lang="scss">
.FishElement {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-color: currentColor;
  border-style: solid;
  border-width: 0 17px 17px 0;
  border-radius: 6px;
  opacity: 0.7;
  will-change: transform;
  pointer-events: none;
  &::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    right: -22px;
    bottom: -22px;
    background-color: transparent;
    border-color: currentColor;
    border-style: solid;
    border-width: 7px 0 0 7px;
    border-radius: 2px;
    transform-origin: left top;
    transform: rotate(-45deg) scaleX(1.2) rotate(45deg);
  }
  &::before {
    position: absolute;
    content: "";
    width: 3px;
    height: 3px;
    left: 9px;
    top: 3px;
    background-color: #333;
    border-radius: 3px;
  }
}
.WaveElement {
  color: rgb(129, 170, 189);
}
</style>
