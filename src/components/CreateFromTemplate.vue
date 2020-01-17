<template>
  <div>
    <b-form-group
      label-cols-md="2"
      description="新增資料夾後選擇"
      label="儲存資料夾："
      label-for="input-dir"
    >
      <b-input-group :prepend="dirPath">
        <b-form-file
          id="input-dir"
          directory
          :state="prompt"
          :placeholder="placeholder"
          v-model="dir"
          @change="promptInit"
        >
        </b-form-file>
      </b-input-group>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CreateFromTemplate",
  props: ["dirPath", "placeholder"],
  data() {
    return {
      dir: null,
      prompt: null as Boolean | null
    };
  },
  methods: {
    getDir() {
      return this.dir;
    },
    promptTrue(): void {
      this.prompt = true;
    },
    promptFalse(): void {
      this.prompt = false;
    },
    promptInit(): void {
      this.prompt = null;
    }
  }
});
</script>
