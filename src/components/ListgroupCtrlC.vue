<template>
  <div>
    <b-list-group v-if="copyReady" flush>
      <b-list-group-item
        v-for="(item, index) in copyData"
        :key="index"
        @click="copy(item, index)"
        :title="copyCheck[index].dataString"
        button
      >
        <div class="d-flex align-items-center mb-1">
          <span class="h5 align-middle mb-0 mr-2">
            {{ item.name }}
          </span>
          <b-badge variant="success" v-show="copyCheck[index].check">
            OK
          </b-badge>
        </div>
        <small class="d-block text-muted text-truncate">{{
          copyCheck[index].dataString
        }}</small>
      </b-list-group-item>
      <b-list-group-item class="text-info">
        點選複製後貼到相對應文件
      </b-list-group-item>
    </b-list-group>
    <p class="text-center" v-else>
      <b-spinner label="Spinning"> </b-spinner>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { clipboard } from "electron";

interface copyCheck {
  dataString: string;
  check: boolean;
}

export default Vue.extend({
  name: "ListgroupCtrlC",
  props: {
    copyReady: Boolean,
    copyData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      copyCheck: [] as copyCheck[]
    };
  },
  watch: {
    copyData() {
      this.makeCheck();
    }
  },
  methods: {
    copy(item: any, index: number) {
      console.log("ctrl+c");

      this.copyCheck[index].check = true;
      this.$set(this.copyCheck, index, this.copyCheck[index]);
      this.$emit("copy", item.data, clipboard);
    },
    makeCheck() {
      this.copyCheck = this.copyData.map((e: any) => {
        return {
          dataString: JSON.stringify(e.data),
          check: false
        };
      });
    }
  },
  created() {
    this.makeCheck();
  }
});
</script>
