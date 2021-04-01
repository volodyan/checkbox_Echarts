<template>
  <div class="RealCharts">
    <div class="contentbox" ref="contentboxref">
      <RealDemo />
     
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import RealDemo from "./RealDemo";
import axios from 'axios';

export default {
  name: "RealCharts",
  components: {
    RealDemo,

  },
  data() {
    return {};
  },
  mounted() {
    this.PipeNetWorkDiagonseRealChartData()
  },
  methods: {
    PipeNetWorkDiagonseRealChartData(){
      this.$axios.post(AxiosUrl.baseUrlPath+"PipeNetWorkDiagonseRealChartData")
      .then((res) => {
        console.log("RealDemo---res",res)
        Bus.$emit("PipeNetWorkDiagonseRealChartDataTo",res.data.Response)
      })
      .catch((error) => {
        
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.RealCharts {
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