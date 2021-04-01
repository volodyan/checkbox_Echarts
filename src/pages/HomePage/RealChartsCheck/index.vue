<template>
  <div class="RealChartsCheck">
    <div class="contentbox" ref="contentboxref">
      <RealCheckboxComponents/>
      <RealChartsCheckDemo />
     
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import RealChartsCheckDemo from "./RealChartsCheckDemo";
import RealCheckboxComponents from './RealCheckboxComponents'
import axios from 'axios';

export default {
  name: "RealChartsCheck",
  components: {
    RealChartsCheckDemo,
    RealCheckboxComponents
  },
  data() {
    return {};
  },
  mounted() {
    this.PipeNetWorkDiagonseAvgChartData()
  },
  methods: {
    PipeNetWorkDiagonseAvgChartData(){
      this.$axios.post(AxiosUrl.baseUrlPath+"PipeNetWorkDiagonseAvgChartData")
      .then((res) => {
        console.log("RealChartsCheck----res",res)
        Bus.$emit("PipeNetWorkDiagonseAvgChartDataTo",res.data.Response)
      })
      .catch((error) => {
        
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.RealChartsCheck {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .contentbox {
    width: 100vw;
    height: 100vh;
  }
}
</style>