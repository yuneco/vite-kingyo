<template>
  <!-- 指定の匹数の金魚を表示するレイヤーです -->
  <div class="FishLayerRoot">
    <Fish
      v-for="fishProps in stageState.fishList"
      :key="fishProps.id"
      class="FishElement"
      :x="fishProps.position.x"
      :y="fishProps.position.y"
      :angle="fishProps.angle"
      :color="fishProps.color"
      :scale="fishProps.scale"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { Fish } from "./Fish";
import { Point } from "../core/Point";
import { useMouse } from "../core/useMouse";
import { useClick } from "../core/useClick";
import { useTicker } from "../core/useTicker";
import { useAnimationFrame } from "../core/useAnimationFrame";
import { FishModel } from "../core/FishModel";
import { WaveModel } from "../core/WaveModel";

/**
 * 金魚レイヤーの状態を管理する型
 */
type StageState = {
  fishList: FishModel[];
};

export default defineComponent({
  name: "FishLayer",
  components: { Fish },
  props: {
    /** 最大金魚数：この数まで金魚が追加されます */
    maxFish: { type: Number, default: 50 },
  },
  setup(props, ctx) {
    // state: レイヤーの状態
    const stageState = reactive<StageState>({
      fishList: [],
    });

    // state: マウスの座標を状態として利用
    const { mousePos: destination } = useMouse();
    
    // computed: 現在の金魚数
    const fishCount = computed(() => stageState.fishList.length);

    // method: 金魚の位置や速度を更新するメソッド
    const updateFish = () => {
      const destPoint = new Point(destination.x, destination.y);
      stageState.fishList.forEach((fish) => fish.update(destPoint));
    };

    // method: 金魚を追加するメソッド
    const addFish = () => {
      stageState.fishList.push(new FishModel());
      ctx.emit("count-changed", fishCount.value);
    };

    const removeFish = () => {
      stageState.fishList.shift();
      ctx.emit("count-changed", fishCount.value);
    }

    // 描画フレームごとに呼ばれる処理。金魚の状態を更新する
    useAnimationFrame(() => {
      updateFish();
      if (fishCount.value < props.maxFish) {
        addFish();
      } else if (fishCount.value > props.maxFish) {
        removeFish();
      }
      // trueを返すとunmountまでの間繰り返し呼ばれる
      return true;
    });

    // クリック時の処理。金魚が逃げるようカーソル方向と逆の力を与える
    useClick(() => {
      stageState.fishList.forEach((fish) =>
        fish.setForce(-1 - Math.random() * 4)
      );
    });

    return {
      stageState,
    };
  },
});
</script>

<style scoped lang="scss">
.FishLayerRoot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
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
</style>
