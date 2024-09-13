import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue"; // Importa la pagina dei risultati di ricerca

const routes = [
  { path: "/", component: Home }, // Route per la home
  { path: "/search", component: SearchResults }, // Route per i risultati della ricerca
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
