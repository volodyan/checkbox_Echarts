<template>
  <div class="chart"></div>
</template>
<script>
import { debounce } from "@/utils";
import Bus from "@/utils/bus.js";

export default {
  name: "demoChart",
  data() {
    return {
      autoResize: {
        type: Boolean,
        default: true
      },
      chart: null,
      sidebarElm: null,
      chartData: {}
    };
  },

  mounted() {
    Bus.$on("GetWaterquantityTo", e => {
      let MaxData = e.MaxData; //最大值
      let Time = [];
      let WaterForcastSupplynum = []; //预测供水量曲线
      let WaterRealSupplynum = []; //实际供水量曲线
      let WaterInflownum = []; //进水量曲线
      if (e.WaterForcastSupply.length) {
        e.WaterForcastSupply.forEach((ele, i) => {
          WaterForcastSupplynum.push(ele.Data);
          Time.push(ele.Time);
        });
      }
      if (e.WaterInflow.length) {
        e.WaterInflow.forEach((ele, i) => {
          WaterInflownum.push(ele.Data);
        });
      }
      if (e.WaterRealSupply.length) {
        e.WaterRealSupply.forEach((ele, i) => {
          WaterRealSupplynum.push(ele.Data);
        });
      }
         const start = this.$moment(new Date());
      const remainder = 15 - (start.minute() % 15);
      let makelinedatax;
          if (start.minute() % 15 == 0) {
        makelinedatax = this.$moment(start).format("HH:mm")+ ":00";
      } else {
        makelinedatax = this.$moment(start)
          .add(remainder, "minutes")
          .format("HH:mm")+ ":00";
      }
      console.log("makelinedatax", makelinedatax);
      this.chartData = {
        Time,
        WaterRealSupplynum,
        WaterInflownum,
        WaterForcastSupplynum,
        MaxData,
        makelinedatax
      };
      this.$nextTick(() => {
        this.initChart();
      });
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }

    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$el, "macarons");
      this.chart.clear();
      this.setOptions(this.chartData);
      // this.chart.on("mouseover", function(a) {
      //   console.log("this.chart.mouseover");
      // });
      // this.chart.on("mouseout", function() {
      //   emphasis();
      // });
    },
    setOptions(chartData) {
      this.chart.setOption({
        grid: {
          bottom: 10,
          top: 35,
          right: 30,
          left: 60,
          show: true,
          backgroundColor: "#e5e8ec",
          borderColor: "#e5e8ec"
        },
        color: ["#a9b2bf", "#0060ff", "#b53f9a"],
        legend: {
          show: true,
          orient: "horizontal",
          right: 30,
          top: 5,
          width: 500,
          itemWidth: 15,
          itemGap: 20, // 设置间距
          data: [
            {
              name: "历史供水量",
              textStyle: {
                fontSize: 12,
                fontWeight: "bolder",
                color: "#6e7b8b"
              },
              icon: "rect"
            },
            {
              name: "调度供水量",
              textStyle: {
                fontSize: 12,
                fontWeight: "bolder",
                color: "#6e7b8b"
              },

              icon: "rect"
            },
            {
              name: "进水量",
              textStyle: {
                fontSize: 12,
                fontWeight: "bolder",
                color: "#6e7b8b"
              },
              icon: "rect"
            }
          ]
        },
        tooltip: {
          trigger: "axis",
          padding: [0, 10],
          formatter: function(params) {
            //console.log(params);
            var res = "<div> <p> 时间：" + params[0].name + " </p> </div>";
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName == "历史供水量") {
                res +=
                  "<p>" +
                  params[i].marker +
                  params[i].seriesName +
                  ":" +
                  params[i].data +
                  "</p>";
              } else if (params[i].seriesName == "进水量") {
                res +=
                  "<p>" +
                  params[i].marker +
                  params[i].seriesName +
                  ":" +
                  params[i].data +
                  "</p>";
              } else if (params[i].seriesName == "调度供水量") {
                res +=
                  "<p>" +
                  params[i].marker +
                  params[i].seriesName +
                  // "调度供水量" +
                  ":" +
                  params[i].data +
                  "</p>";
              }
            }
            return res;
          },
          textStyle: {
            align: "left"
          }
        },
        xAxis: [
          {
            data: chartData.Time,
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          }
        ],
        yAxis: {
         // max:chartData.MaxData,
          splitLine: {
            show: false,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        series: [
          {
            name: "历史供水量",
            type: "line",
            connectNulls: true,
            symbol: "none",
            data: chartData.WaterRealSupplynum,
            zlevel: 8,
            itemStyle: {
              normal: {
                color: "#a9b2bf"
              }
            }
          },
          {
            name: "进水量",
            type: "line",
            connectNulls: true,
            symbol: "none",
            data: chartData.WaterInflownum,
            zlevel: 9,
            itemStyle: {
              normal: {
                borderColor: "#b53f9a",
                color: "#b53f9a"
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: "#b53f9a"
              }
            }
          },
          {
            name: "调度供水量",
            type: "line",
            connectNulls: true,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#0060ff"
              }
            },
            zlevel: 13,

            data: chartData.WaterForcastSupplynum,
                markLine: {
              silent: true,
              symbol: "none",

              label: {
                formatter: function(val) {
                  return (val.value = "");
                }
              },
              data: [
                {
                  xAxis: chartData.makelinedatax,
                  lineStyle: {
                    normal: {
                      color: "red",
                      type: "dashed"
                      //width: 6
                    }
                  },
                  label: {
                    normal: {
                      formatter: ""
                    }
                  }
                }
              ]
            }
          }
        ]
      });
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    //窗口改变执行方法
    resetSizefun() {
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize();
          }
        }, 100);
        window.addEventListener("resize", this.__resizeHandler);
      }

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
      this.sidebarElm &&
        this.sidebarElm.addEventListener(
          "transitionend",
          this.sidebarResizeHandler
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 134px;
  margin-top: 10px;
}
</style>



