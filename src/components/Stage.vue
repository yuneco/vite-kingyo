<template>
  <!-- ステージ全体のコンポーネントです。背景・金魚・波紋を合成します -->
  <StageBg class="StageRoot">
    <FishLayer :maxFish="maxFish" @count-changed="fishCountChanged" />
    <WaveLayer />
  </StageBg>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import StageBg  from "./StageBg.vue";
import FishLayer  from "./FishLayer.vue";
import WaveLayer  from "./WaveLayer.vue";

export default defineComponent({
  name: "Stage",
  components: { StageBg, FishLayer, WaveLayer },
  props: {
    maxFish: { type: Number, default: 50 },
  },
  setup(_, ctx) {
    // 金魚の数が変わった時のイベント
    const fishCountChanged = (count: number) => {
      ctx.emit('count-changed', count);
    }
    return {
      fishCountChanged
    };
  },
});
</script>
