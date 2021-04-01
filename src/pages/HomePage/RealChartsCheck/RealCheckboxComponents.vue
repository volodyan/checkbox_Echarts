<template>
  <div class="RealCheckboxComponents">
    <div class="contentbox">
      <div class="AllSelect">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </div>
      <div class="checkboxGroup">
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
export default {
  name: "RealCheckboxComponents",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: ["井底曲线", "地面曲线", "满管曲线"],
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      if (!!this.checkedCities) {
        Bus.$emit("ConTrolLegendFun_RealChartsCheck", this.checkedCities);
      }
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      if (!!this.checkedCities) {
        Bus.$emit("ConTrolLegendFun_RealChartsCheck", this.checkedCities);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.RealCheckboxComponents {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  width: 100%;
  .contentbox {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: 100px;
    margin-top: 60px;
    .AllSelect {
      margin-right: 20px;
    }
    .checkboxGroup {
    }
  }
}
</style>