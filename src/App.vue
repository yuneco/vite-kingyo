<template>
  <div id="app">
    <div class="Control">
      <button @click="addFish">Add 10 Fish</button>
      <button @click="removeFish">Remove 10 Fish</button>
      <span>fish count = {{ fishCount }}</span>
    </div>
    <Stage :maxFish="maxFish" @count-changed="fishCountChanged" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stage from "./components/Stage.vue";

export default defineComponent({
  name: "App",
  components: {
    Stage,
  },
  data() {
    return {
      maxFish: 50,
      fishCount: 0,
    };
  },
  methods: {
    addFish() {
      this.maxFish += 10;
    },
    removeFish() {
      this.maxFish = Math.max(0, this.maxFish - 10);
    },
    fishCountChanged(count: number) {
      this.fishCount = count;
    },
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
  background-color: rgb(31, 36, 43);
  color: rgb(80, 110, 124);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  overflow: hidden;
}
button {
  display: inline-block;
  margin-right: 5px;
  border: 2px solid rgb(80, 110, 124);
  color: rgb(80, 110, 124);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding: 2px 5px;
  background-color: transparent;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
.Control {
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 5px;
  background-color: #00000066;
}
</style>
