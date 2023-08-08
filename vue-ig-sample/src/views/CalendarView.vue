<template>
  <div>
    <igc-calendar id="calendar1" week-start="monday" style="width: 400px">
    </igc-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defineComponents, IgcCalendarComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
defineComponents(IgcCalendarComponent);
export default defineComponent({
  name: "App",

  components: {},
  mounted() {
    const calendar = document.getElementById(
      "calendar1",
    ) as IgcCalendarComponent;
    calendar.locale = "ja"; // 日本語指定
    calendar.value = new Date();
  },
});
</script>
