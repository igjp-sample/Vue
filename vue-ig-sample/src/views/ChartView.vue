<template>
  <div>
    <igc-category-chart id="chart" width="100%" height="500px" ref="chart">
    </igc-category-chart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IgcCategoryChartComponent } from "igniteui-webcomponents-charts";
export default defineComponent({
  name: "App",

  components: {},
  mounted() {
    const igcChart = this.$refs.chart as IgcCategoryChartComponent;
    igcChart.dataSource = this.dataSource;
  },

  data() {
    return {
      dataSource: [
        {
          Discontinued: false,
          OrderDate: new Date("2012-02-12"),
          ProductID: 1,
          ProductName: "Chai",
          QuantityPerUnit: "10 boxes x 20 bags",
          ReorderLevel: 10,
          UnitPrice: 18.0,
          UnitsInStock: 39,
        },
        {
          Discontinued: false,
          OrderDate: new Date("2003-03-17"),
          ProductID: 2,
          ProductName: "Chang",
          QuantityPerUnit: "24 - 12 oz bottles",
          ReorderLevel: 25,
          UnitPrice: 19.0,
          UnitsInStock: 17,
        },
        {
          Discontinued: false,
          OrderDate: new Date("2006-03-17"),
          ProductID: 3,
          ProductName: "Aniseed Syrup",
          QuantityPerUnit: "12 - 550 ml bottles",
          ReorderLevel: 25,
          UnitPrice: 10.0,
          UnitsInStock: 13,
        },
        {
          Discontinued: false,
          OrderDate: new Date("2016-03-17"),
          ProductID: 4,
          ProductName: "Chef Antony Cajun Seasoning",
          QuantityPerUnit: "48 - 6 oz jars",
          ReorderLevel: 0,
          UnitPrice: 22.0,
          UnitsInStock: 53,
        },
        {
          Discontinued: true,
          OrderDate: new Date("2011-11-11"),
          ProductID: 5,
          ProductName: "Chef Antony Gumbo Mix",
          QuantityPerUnit: "36 boxes",
          ReorderLevel: 0,
          UnitPrice: 21.35,
          UnitsInStock: 0,
        },
      ],
    };
  },
});
</script>
