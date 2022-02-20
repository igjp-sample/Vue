import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GridView from "../views/GridView.vue";
import ChartView from "../views/ChartView.vue";
import CalendarView from "../views/CalendarView.vue";

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
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
