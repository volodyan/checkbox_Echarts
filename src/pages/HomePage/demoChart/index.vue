<template>
  <div class="demoChart">
    <div class="contentbox" ref="contentboxref">
      <checkboxComponents/>
      <demo1 />
     
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import demo1 from "./demo1";
import checkboxComponents from './checkboxComponents'

export default {
  name: "demoChart",
  components: {
    demo1,
    checkboxComponents
  },

};
</script>
<style lang="scss" scoped>
.demoChart {
  width: 100%;
  .contentbox {
   width: 100%;
  }
}
</style>