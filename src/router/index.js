import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AdvancedSearch from "../views/AdvancedSearch.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/advanced-search",
    name: "advanced-search",
    component: AdvancedSearch,
    props: (route) => ({ query: route.query.query }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
