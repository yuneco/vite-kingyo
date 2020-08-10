<template>
  <!-- 波紋を管理・表示するレイヤーです -->
  <div class="WaveLayerRoot">
    <Wave
      v-for="waveProps in stageState.waveList"
      class="WaveElement"
      :key="waveProps.id"
      :x="waveProps.position.x"
      :y="waveProps.position.y"
      @end="removeWave(waveProps)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import Wave from "./Wave.vue";
import { Point } from "../core/Point";
import { useMouse } from "../core/useMouse";
import { useClick } from "../core/useClick";
import { useTicker } from "../core/useTicker";
import { WaveModel } from "../core/WaveModel";

/**
 * 波紋の状態を管理する型
 */
type LayerState = {
  waveList: WaveModel[];
};

export default defineComponent({
  name: "WaveLayer",
  components: { Wave },
  setup(_, ctx) {
    // state: レイヤーの状態
    const stageState = reactive<LayerState>({
      waveList: [],
    });

    // state: マウスカーソルの位置を利用
    const { mousePos: destination } = useMouse();

    // method: 波紋を追加
    const addWave = (x: number, y: number) => {
      const RND = 100;
      const rndX = (Math.random() - 0.5) * RND;
      const rndY = (Math.random() - 0.5) * RND;
      stageState.waveList.push(new WaveModel(new Point(x + rndX, y + rndY)));
    };

    // method: 波紋を削除（アニメーション終了後に呼ばれます）
    const removeWave = (wave: WaveModel) => {
      stageState.waveList = stageState.waveList.filter((w) => w !== wave);
    };

    // タイマーを利用。unmountまで指定の間隔で実行されます
    useTicker(() => {
      if (Math.random() < 0.93) {
        return;
      }
      addWave(destination.x, destination.y);
    }, 100);

    // マウスクリックを利用
    useClick(() => {
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
.WaveLayerRoot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .WaveElement {
    color: rgb(129, 170, 189);
  }
}
</style>
