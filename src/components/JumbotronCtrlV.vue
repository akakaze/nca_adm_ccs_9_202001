<template>
  <div class="text-center">
    <h1 class="display-1 font-weight-bold text-primary">Ctrl+V</h1>
    <p>{{ descriptions }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { clipboard } from "electron";
export default Vue.extend({
  name: "JumbotronCtrlV",
  props: ["descriptions"],
  created() {
    window.addEventListener("paste", () => {
      this.$emit("paste", clipboard);
    });
  }
});
</script>
