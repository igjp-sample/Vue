<template>
  <div style="margin-bottom:1em;">
    <button @click="load">Load</button>
    <button @click="save">Save</button>
  </div>

  <div style="border-right: 1px solid #bbb; border-left: 1px solid #bbb; border-top: 1px solid #bbb; display: flex; border-top-left-radius: 3px; border-top-right-radius: 3px;">
    <div id="extendHeader1" style="border-right: 1px solid #bbb; background: #f8f8f8;flex-grow: 1;"></div>
    <div id="extendHeader2" style="background: #FCF4A3; width:700px; font-size: .9em; padding: .2em 0;">製品情報</div>
  </div>
  <igc-data-grid
    height="100%"
    width="100%"
    cornerRadiusTopRight="0"
    cornerRadiusTopLeft="0"
    auto-generate-columns="false"
    column-moving-mode="Deferred"
    column-moving-animation-mode="SlideOver"
    edit-mode="CellBatch"
    ref="grid"
  >
    <igc-template-column isEditable="false" id="checked" field="Checked" width="50"></igc-template-column>
    <igc-text-column isEditable="false" id="discontinuedColumn" field="Discontinued" header-text="Discontinued"></igc-text-column>
    <igc-date-time-column id="orderDateColumn" field="OrderDate" header-text="OrderDate"></igc-date-time-column>
    <igc-numeric-column isEditable="false" id="productIDColumn" field="ProductID" header-text="ID" width="80"></igc-numeric-column>
    <igc-text-column id="productNameColumn" field="ProductName" header-text="ProductName" width="140"></igc-text-column>
    <igc-text-column id="quantityPerUnitColumn" field="QuantityPerUnit" header-text="QuantityPerUnit" width="140"></igc-text-column>
    <igc-numeric-column id="reorderLevelColumn" field="ReorderLevel" header-text="ReorderLevel" width="140"></igc-numeric-column>
    <igc-numeric-column id="unitPriceColumn" field="UnitPrice" header-text="UnitPrice" width="140"></igc-numeric-column>
    <igc-numeric-column id="unitsInStockColumn" field="UnitsInStock" header-text="UnitsInStock" width="140"></igc-numeric-column>
  </igc-data-grid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IgcDataGridComponent,
  IgcTemplateHeaderComponent,
  IgcTextColumnComponent,
  IgcDataGridToolbarComponent,
  IgcNumericColumnComponent,
  IgcDateTimeColumnComponent,
  IgcTemplateColumnComponent,
  IgcTemplateCellInfo,
  IgcDataBindingEventArgs,
  IgcTemplateHeaderCellUpdatingEventArgs,
  IgcTemplateCellUpdatingEventArgs,
  IgcGridColumnsChangedEventArgs,
  IgcGridCellValueChangingEventArgs,
  IgcGridColumnWidthChangedEventArgs,
  IgcColumnHiddenChangedEventArgs,
  IgcColumnPinnedChangedEventArgs,
  IgcGridFilterExpressionsEventArgs,
  IgcGridGroupDescriptionsChangedEventArgs,
  IgcGridSortDescriptionsChangedEventArgs,
  ColumnSortDirection } from "igniteui-webcomponents-grids";

export default defineComponent({

  name: "App",

  components: {
  },
  mounted() {

    const productNameColumn = document.getElementById("productNameColumn") as IgcTextColumnComponent;
    productNameColumn.header.background = '#FCF4A3'; //列ヘッダーの背景色を変更
    productNameColumn.dataBound = this.onDataBound; //dataBoundイベントハンドラーを登録

    const quantityPerUnitColumn = document.getElementById("quantityPerUnitColumn") as IgcTextColumnComponent;
    quantityPerUnitColumn.header.background = '#FCF4A3'
    quantityPerUnitColumn.dataBound = this.onDataBound;

    const reorderLevelColumn = document.getElementById("reorderLevelColumn") as IgcNumericColumnComponent;
    reorderLevelColumn.header.background = '#FCF4A3'
    reorderLevelColumn.dataBound = this.onDataBound;

    const unitPriceColumn = document.getElementById("unitPriceColumn") as IgcNumericColumnComponent;
    unitPriceColumn.header.background = '#FCF4A3'
    unitPriceColumn.dataBound = this.onDataBound;

    const unitsInStockColumn = document.getElementById("unitsInStockColumn") as IgcNumericColumnComponent;
    unitsInStockColumn.header.background = '#FCF4A3';
    unitsInStockColumn.dataBound = this.onDataBound;

    const discontinuedColumn = document.getElementById("discontinuedColumn") as IgcTextColumnComponent;
    discontinuedColumn.dataBound = this.onDataBound;

    const orderDateColumn = document.getElementById("orderDateColumn") as IgcDateTimeColumnComponent;
    orderDateColumn.dataBound = this.onDataBound;
    const orderDateHeaderTemplate = new IgcTemplateHeaderComponent();
    orderDateHeaderTemplate.cellUpdating = this.onOrderDateColumnHeaderCellUpdating;
    orderDateColumn.header = orderDateHeaderTemplate;

    const productIDColumn = document.getElementById("productIDColumn") as IgcNumericColumnComponent;
    productIDColumn.dataBound = this.onDataBound;

    const TemplateColumn = document.getElementById("checked") as IgcTemplateColumnComponent;
    TemplateColumn.cellUpdating = this.onCellUpdating;
    TemplateColumn.sortDirection = ColumnSortDirection.None;

    const headerTemplate = new IgcTemplateHeaderComponent();
    headerTemplate.cellUpdating = this.onHeaderCellUpdating;
    TemplateColumn.header = headerTemplate;

    const igcGrid = this.$refs.grid as IgcDataGridComponent;

    igcGrid.dataSource = this.dataSource;
    igcGrid.cellValueChanging = this.onCellValueChanging;
    igcGrid.columnWidthChanged = this.onColumnWidthChanged; //列サイズ変更
    // igcGrid.actualColumnsChanged = this.onActualColumnsChanged; //列順変更
    // igcGrid.columnHiddenChanged = this.onColumnHiddenChanged; //列非表示
    // igcGrid.columnPinnedChanged = this.onColumnPinnedChanged; //ピン固定
    // igcGrid.filterExpressionsChanged = this.onFilterExpressionsChanged; //フィルター
    // igcGrid.groupDescriptionsChanged = this.onGroupDescriptionsChanged; //グループ
    // igcGrid.sortDescriptionsChanged = this.onSortDescriptionsChanged; //ソート

    this.storedLayout = JSON.parse(igcGrid.saveLayout());

    this.dataSource.forEach(element => {
      if(element.Checked)
      {
        (this.$refs.grid as IgcDataGridComponent).selectedItems.add(element);
      }
    });

  },

  methods: {
    // onSortDescriptionsChanged(sender: any, args: IgcGridSortDescriptionsChangedEventArgs) {
    //   console.log("ソート");
    // },
    // onGroupDescriptionsChanged(sender: any, args: IgcGridGroupDescriptionsChangedEventArgs) {
    //   console.log("グループ");
    // },
    // onFilterExpressionsChanged(sender: any, args: IgcGridFilterExpressionsEventArgs) {
    //   console.log("フィルター");
    // },
    // onColumnPinnedChanged(sender: any, args: IgcColumnPinnedChangedEventArgs) {
    //   console.log("ピン固定");
    // },
    // onColumnHiddenChanged(sender: any, args: IgcColumnHiddenChangedEventArgs) {
    //   console.log("列非表示");
    // },
    // onActualColumnsChanged(sender: any, args: IgcGridColumnsChangedEventArgs) {
    //   console.log("列順変更");
    // },
    onColumnWidthChanged(sender: any, args: IgcGridColumnWidthChangedEventArgs) {
      let currentColumns = JSON.parse((this.$refs.grid as IgcDataGridComponent).saveLayout()).columns;
      const tagetColumns = ['ProductName','QuantityPerUnit','ReorderLevel','UnitPrice','UnitsInStock'];
      let colcWidth = 0;
      tagetColumns.forEach(e => {
        const targetColumn = currentColumns.filter(function( obj:any ) {
            return obj.ColumnName === e;
        });
        colcWidth += targetColumn[0].Width;
      });
      const extendHeader2 = document.getElementById("extendHeader2") as HTMLDivElement;
      extendHeader2.style.width = colcWidth + 'px';
    },
    onDataBound(sender: any, args: IgcDataBindingEventArgs) {
      if(args.cellInfo.rowItem.IsEdited === true){
        args.cellInfo.background = "pink"; // 編集された行の背景色を変更
      }
    },
    onCellValueChanging(s: IgcDataGridComponent, e: IgcGridCellValueChangingEventArgs) {
      console.log(e);
      //バリデーション処理
      if (e.column != null && e.column.field == "UnitPrice") {
        if (e.newValue != null && e.newValue > 50)
          {
              (this.$refs.grid as IgcDataGridComponent).setEditError(e.editID, "50以下の数値を入力してください");
              //(this.$refs.grid as IgcDataGridComponent).rejectEdit(e.editID);
              return false;
          }
      }

      e.cellInfo.rowItem.IsEdited = true;
    },
    onCellUpdating(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs): void {
      const content = e.content as HTMLDivElement;
      let check: HTMLInputElement | null = null;
      const info = e.cellInfo as IgcTemplateCellInfo ;
      const item = info.rowItem;
      if (content.childElementCount === 0) {
        check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.addEventListener("change", (evt) => {
          const newValue = (evt.target as HTMLInputElement).checked;
          const itemToUpdate = (e.cellInfo as IgcTemplateCellInfo).rowItem;
          let itemIndex = (this.$refs.grid as IgcDataGridComponent).actualDataSource.indexOfItem(itemToUpdate);
          itemToUpdate.Checked = newValue;
          //(this.$refs.grid as IgcDataGridComponent).notifySetItem(itemIndex, itemToUpdate, itemToUpdate);
          if(newValue)
          {
            (this.$refs.grid as IgcDataGridComponent).selectedItems.add(itemToUpdate);
          }
          else
          {
            (this.$refs.grid as IgcDataGridComponent).selectedItems.remove(itemToUpdate);
          }
        });
        content.appendChild(check);
      }
      else {
        check = content.children[0] as HTMLInputElement;
      }
      if (check) {
        check.checked = item.Checked;
      }
    },
    onHeaderCellUpdating(sender: IgcTemplateHeaderComponent, args: IgcTemplateHeaderCellUpdatingEventArgs): void{
      const content = args.content as HTMLDivElement;
      let checkAll: HTMLInputElement | null = null;
      if (content.childElementCount === 0) {
        checkAll = document.createElement('input');
        checkAll.setAttribute('type', 'checkbox');
        content.appendChild(checkAll);
        checkAll.addEventListener("change", (e) => {
          const newValue = (e.target as HTMLInputElement).checked;
          this.dataSource.forEach(element => {
            element.Checked = newValue;
            let itemIndex = this.dataSource.indexOf(element);
            //(this.$refs.grid as IgcDataGridComponent).notifySetItem(itemIndex, element, element);
            if(newValue)
            {
              if(!(this.$refs.grid as IgcDataGridComponent).selectedItems.contains(element))
              {
                (this.$refs.grid as IgcDataGridComponent).selectedItems.add(element);
              }
            }
            else
            {
              (this.$refs.grid as IgcDataGridComponent).selectedItems.remove(element);
            }
          });
        });

        checkAll.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
        });
        if(content.parentElement != null)
        {
          content.parentElement.style.pointerEvents = "none";
        }
        checkAll.style.pointerEvents = "auto";
      }
    },
    onOrderDateColumnHeaderCellUpdating(sender: IgcTemplateHeaderComponent, args: IgcTemplateHeaderCellUpdatingEventArgs): void{
      const content = args.content as HTMLDivElement;
      let el: HTMLSpanElement | null = null;
      if (content.childElementCount === 0) {
        el = document.createElement('span');
        el.innerText = "line1\nline2";
        el.style.fontSize = '12px';
        content.appendChild(el);
        content.style.lineHeight = '1';
        content.style.paddingTop = '2px';
      }
    },
    load() {
      //console.log(JSON.stringify(this.storedLayout, null, 2));
      (this.$refs.grid as IgcDataGridComponent).loadLayout(JSON.stringify(this.storedLayout, null, 2));
    },
    save() {
      //列順とピン固定のみ保存
      const currentLayout = JSON.parse((this.$refs.grid as IgcDataGridComponent).saveLayout()).columns;
      let storedLayout:any = this.storedLayout;
      currentLayout.forEach(function (arrayItem:any) {
        const objIndex = storedLayout.columns.findIndex(function (obj:any) {
          if (obj.ColumnName == arrayItem.ColumnName) return 1;
        });
        storedLayout.columns[objIndex].Pinned = arrayItem.Pinned;
        storedLayout.columns[objIndex].ColToRight = arrayItem.ColToRight;
        storedLayout.columns[objIndex].ColToLeft = arrayItem.ColToLeft;
      });
      this.storedLayout = storedLayout;
    }
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
          Checked: false,
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
          Checked: false,
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
          Checked: false,
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
          Checked: false,
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
          Checked: false,
        },
      ],
      storedLayout:
      {
        columns: [],
        filterColumns:[],
        groupedColumns:[],
        sortedColumns:[],
        version: ""
      },
    };
  },
});
</script>
