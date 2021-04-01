<template>
  <div class="HomePage">
    <div class="contentbox" ref="contentboxref">
      <demoChart />
      <RealCharts/>
      <RealChartsCheck/>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import demoChart from "./demoChart/index";
import RealCharts from './RealCharts/index'
import RealChartsCheck from './RealChartsCheck/index'

export default {
  name: "HomePage",
  components: {
    demoChart,
    RealCharts,
    RealChartsCheck
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.HomePage {
  width: 100%;
  .contentbox {
    width: 100%;
  }
}
</style>