import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GridView from "../views/GridView.vue";
import ChartView from "../views/ChartView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/grid",
    name: "grid",
    component: GridView,
  },
  {
    path: "/chart",
    name: "chart",
    component: ChartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
