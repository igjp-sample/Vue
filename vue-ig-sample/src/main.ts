import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { ModuleManager } from "igniteui-webcomponents-core";
import { IgcDataGridModule } from "igniteui-webcomponents-grids";
import { IgcCategoryChartModule } from "igniteui-webcomponents-charts";

import { Localization } from 'igniteui-webcomponents-core';
import { CustomDataGridLocaleJaModule } from './Localization/CustomDataGridLocaleJaModule';

ModuleManager.register(IgcDataGridModule, IgcCategoryChartModule, CustomDataGridLocaleJaModule);

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("igc-");
app.use(router).mount("#app");
