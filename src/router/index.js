import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AdvancedSearch from "../views/AdvancedSearch.vue";
import DetailsApartment from "../views/DetailsApartment.vue";

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
  {
    path: "/apartment/:id",
    name: "details-apartment",
    component: DetailsApartment,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
