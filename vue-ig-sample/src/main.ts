import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { ModuleManager } from "igniteui-webcomponents-core";
import { IgcDataGridModule } from "igniteui-webcomponents-grids";
import { IgcCategoryChartModule } from "igniteui-webcomponents-charts";

ModuleManager.register(IgcDataGridModule, IgcCategoryChartModule);
const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("igc-");
app.use(router).mount("#app");
