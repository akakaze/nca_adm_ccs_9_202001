<template>
  <b-form-group
    label-cols-md="2"
    :description="description"
    label="製作月份："
    label-for="input-yyyymm"
  >
    <b-input-group>
      <b-form-input id="input-yyyymm" type="month" v-model="yyyymm">
      </b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "InputMonth",
  props: {
    description: String,
    monthAfter: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      yyyymm: ""
    };
  },
  computed: {
    yyy(): number {
      return +this.yyyymm.split("-")[0] - 1911;
    },
    mm(): number {
      return +this.yyyymm.split("-")[1] - 0;
    }
  },
  created() {
    let now = new Date();
    now.setMonth(now.getMonth() + (this.monthAfter - 0));
    this.yyyymm = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(
      -2
    )}`;
    // console.log(now);
  }
});
</script>
