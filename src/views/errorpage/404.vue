<template>
  <div class="errorpage">
    <div class="SvgIconClassoutbox">
      <SvgIcon :name="'403'" :title="''" class="SvgIconClassIshow" />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
export default {
  name: "errorpage",
  components:{
    SvgIcon
  }
};
</script>
<style lang="scss" scoped>
.errorpage {
  width: 100%;
  height: 100vh;
  .SvgIconClassoutbox {
    width: 100%;
    height: 100vh;
    .SvgIconClassIshow {
      width: 100%;
      height: 100vh;
    }
  }
}
</style>
