<template>
  <div id="app">
    <b-navbar variant="light">
      <b-navbar-brand to="/">
        <img
          src="@/assets/icon.svg"
          alt="內政部役政署"
          width="32"
          height="32"
        />
        <span class="h4 ml-1 align-middle font-weight-bold">內政部役政署</span>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/about" link-classes="text-primary">
          <font-awesome-icon
            :icon="['far', 'question-circle']"
            class="mr-1"
          />關於
        </b-nav-item>
        <b-nav-item to="/config" link-classes="text-primary">
          <font-awesome-icon icon="cog" class="mr-1" />設定
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faQuestionCircle, faCog);

export default Vue.extend({
  components: {
    FontAwesomeIcon
  }
});
</script>

<style lang="scss">
body {
  min-height: 100vh;
}

$content-height: calc(100vh - 60px);

#content {
  min-height: $content-height;
  max-height: $content-height;
  height: $content-height;
  overflow: auto;
}
</style>
