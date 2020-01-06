<template>
  <b-container class="px-5 py-4">
    <h2 class="">設定</h2>
    <b-form-group
      v-for="(item, index) in configItems"
      label-cols-sm="3"
      label-cols-lg="2"
      :key="index"
      :label="item.title"
      :label-for="item.key"
      :description="item.description"
    >
      <b-form-select
        v-if="item.enum"
        :id="item.key"
        :options="item.enum"
        :value="getConfigValue(item.key)"
        @change="updateConfig(item.key, $event)"
      />
      <b-checkbox-group
        v-else-if="item.type === 'array'"
        :id="item.key"
        :options="item.items.enum"
        :checked="getConfigValue(item.key)"
        @change="updateConfig(item.key, $event)"
      />
      <b-checkbox
        v-else-if="item.type === 'boolean'"
        switch
        :id="item.key"
        :checked="getConfigValue(item.key)"
        @change="updateConfig(item.key, $event)"
      />
      <b-input
        v-else-if="item.type === 'string'"
        type="text"
        :id="item.key"
        :pattern="item.pattern"
        :placeholder="item.default"
        :value="getConfigValue(item.key)"
        @change="updateConfig(item.key, $event.trim())"
      />
      <b-input
        v-else-if="item.type === 'number'"
        type="number"
        number
        :id="item.key"
        :max="item.maximum"
        :min="item.minimum"
        :step="item.multipleOf"
        :value="getConfigValue(item.key)"
        @change="updateConfig(item.key, Number($event))"
      />
    </b-form-group>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import ElectronStore from "electron-store";
import schema from "@/config/index";

const config = new ElectronStore({ schema: schema.properties });

export default Vue.extend({
  data() {
    return {
      config: config
    };
  },
  computed: {
    configItems: () =>
      Object.keys(schema.properties).map(key => ({
        key,
        ...schema.properties[key]
      }))
  },
  methods: {
    getConfigValue(key: string | number) {
      return this.config.get(key);
    },
    updateConfig(key: string | number, value: any) {
      this.config.set(key, value);
    }
  }
});
</script>
