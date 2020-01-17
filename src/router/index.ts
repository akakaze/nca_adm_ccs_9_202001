import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Create from "@/views/Create.vue";
import Edit from "@/views/Edit.vue";
import About from "@/views/About.vue";
import Config from "@/views/Config.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/create",
    name: "create",
    component: Create
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/config",
    name: "config",
    component: Config
  }
];

const router = new VueRouter({
  routes
});

export default router;
