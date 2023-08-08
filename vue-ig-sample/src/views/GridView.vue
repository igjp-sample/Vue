<template>
  <igc-grid
    auto-generate="false"
    primary-key="ProductID"
    display-density="cosy"
    allow-filtering="true"
    filter-mode="excelStyleFilter"
    name="grid1"
    id="grid1"
    ref="grid"
    height="600px"
  >
    <igc-paginator per-page="10"> </igc-paginator>
    <igc-column
      field="ProductName"
      header="Product Name"
      data-type="string"
      sortable="true"
      has-summary="true"
      editable="true"
      resizable="true"
    >
    </igc-column>
    <igc-column
      field="UnitPrice"
      header="Unit Price"
      data-type="number"
      sortable="true"
      has-summary="true"
      editable="true"
      resizable="true"
    >
    </igc-column>
    <igc-column
      field="UnitsInStock"
      header="Units in Stock"
      data-type="number"
      sortable="true"
      has-summary="true"
      editable="true"
      resizable="true"
    >
    </igc-column>
    <igc-column
      field="OrderDate"
      header="Order Date"
      data-type="date"
      sortable="true"
      has-summary="true"
      editable="true"
      resizable="true"
    >
    </igc-column>
    <igc-column
      field="Discontinued"
      header="Discontinued"
      data-type="boolean"
      sortable="true"
      has-summary="true"
      editable="true"
      name="column1"
      id="column1"
    >
    </igc-column>
    <igc-column
      field="ReorderLevel"
      header="Reorder Level"
      data-type="number"
      sortable="true"
      has-summary="true"
      editable="true"
      filterable="true"
    >
    </igc-column>
  </igc-grid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "igniteui-webcomponents-grids/grids/combined";
import { IgcGridComponent } from "igniteui-webcomponents-grids/grids";
import { NwindData } from "../data/NwindData";

export default defineComponent({
  name: "App",

  mounted() {
    console.log("mounted");
    const igcGrid = this.$refs.grid as IgcGridComponent;
    console.log(igcGrid);
    igcGrid.data = new NwindData();
  },
});
</script>

<style>
@import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
</style>
