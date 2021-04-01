<template>
  <div class="chart"></div>
</template>
<script>
import { debounce } from "@/utils";
import Bus from "@/utils/bus.js";

export default {
  name: "RealDemo",
  data() {
    return {
      autoResize: {
        type: Boolean,
        default: true,
      },
      chart: null,
      sidebarElm: null,
      chartData: {},
    };
  },

  mounted() {
    Bus.$on("PipeNetWorkDiagonseRealChartDataTo", (e) => {
      let colorList = [
        "#FFA500",
        "#7fbe9e",
        "#6495ED",
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3",
      ];
      let emphasisColorLists = ["#140"];
      let labelFont = "bold 12px Sans-serif";
      let Time = [];
      let PumpFlow = [];
      let UpLevelData = [];
      let DownLevelData = [];
      if (!!e.PumpFlow.length) {
        e.PumpFlow.map((ele) => {
          PumpFlow.push(ele.Value);
        });
      }
      if (!!e.UpLevelData.length) {
        e.UpLevelData.map((ele) => {
          UpLevelData.push(ele.Value);
        });
      }

      if (!!e.DownLevelData.length) {
        e.DownLevelData.map((ele) => {
          Time.push(ele.Time);
          DownLevelData.push(ele.Value);
        });
      }

      let LegendLists = [
        "出水流量曲线",
        "上下游液位计液位曲线",
        "上下游液位差曲线",
      ];
      let LegendSelectedLists = {
        出水流量曲线: true,
        上下游液位计液位曲线: true,
        上下游液位差曲线: true,
      };
      this.chartData = {
        colorList,
        emphasisColorLists,
        labelFont,
        LegendLists,
        LegendSelectedLists,
        Time,
        PumpFlow,
        UpLevelData,
        DownLevelData,
      };
      this.$nextTick(() => {
        this.initChart();
      });
    });

    this.resetSizefun();
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
        animation: false,
        color: chartData.colorList,
        legend: {
          top: 30,
          data: chartData.LegendLists,
          selected: chartData.LegendSelectedLists,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          borderWidth: 1,
          borderColor: "red",
          backgroundColor: "#fff",
          padding: 10,
          textStyle: {
            color: "#000",
          },
          // position: function (pos, params, el, elRect, size) {
          //     var obj = {top: 10};
          //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          //     return obj;
          // }
          //extraCssText: 'width: 170px'
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777",
          },
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: [0, 1, 2],
            realtime: true,
            start: 0,
            end: 100,
            // bottom: 30,
            height: 20,
            handleIcon:
              "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "120%",
          },
          {
            type: "inside",
            xAxisIndex: [0, 1, 2],
            start: 0,
            end: 100,
            // bottom: 30,
            height: 20,
          },
        ],
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: chartData.Time,
            boundaryGap: false,
            axisLine: { lineStyle: { color: "#777" } },
            axisLabel: { show: true },
            // axisLabel: {
            //   formatter: function (value) {
            //     return this.$echarts.format.formatTime("MM-dd", value);
            //   },
            // },
            splitNumber: 20,
            // min: "dataMin",
            // max: "dataMax",
            axisPointer: {
              show: true,
            },
          },
          {
            type: "category",
            gridIndex: 1,
            data: chartData.Time,
            scale: true,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: true },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#777" } },
            splitNumber: 20,
            // min: "dataMin",
            // max: "dataMax",
          },
          {
            type: "category",
            gridIndex: 2,
            data: chartData.Time,
            scale: true,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: true },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#777" } },
            splitNumber: 20,
            // min: "dataMin",
            // max: "dataMax",
          },
        ],
        yAxis: [
          {
            scale: true,
            gridIndex: 0,
            splitNumber: 2,
            axisLine: { lineStyle: { color: "#777" } },
            splitLine: { show: true, lineStyle: { type: "dashed", color: "red"}},
            axisTick: { show: false },
            axisLabel: {
              inside: false,
              formatter: "{value}\n",
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLine: { lineStyle: { color: "#777" } },
            splitLine: { show: true, lineStyle: { type: "dashed", color: "red"}},
            axisTick: { show: false },
            axisLabel: {
              inside: false,
              formatter: "{value}\n",
            },
          },
          {
            scale: true,
            gridIndex: 2,
            splitNumber: 2,
            axisLine: { lineStyle: { color: "#777" } },
            splitLine: { show: true, lineStyle: { type: "dashed", color: "red"} },
            axisTick: { show: false },
            axisLabel: {
              inside: false,
              formatter: "{value}\n",
            },
          },
        ],
        grid: [
          {
            left: 120,
            right: 20,
            top: 110,
            height: 120,
          },
          {
            left: 120,
            right: 20,
            height: 120,
            top: 330,
          },
          {
            left: 120,
            right: 20,
            height: 120,
            top: 550,
          },
        ],

        series: [
          {
            name: "出水流量曲线",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: chartData.colorList[0],
            },
            itemStyle: {
              color: chartData.colorList[0],
            },
            emphasis: {
              itemStyle: {
                color: chartData.emphasisColorLists[0],
              },
              lineStyle: {
                width: 1,
                color: chartData.colorList[0],
              },
            },
            data: chartData.PumpFlow,
          },

          {
            name: "上下游液位计液位曲线",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: chartData.UpLevelData,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: chartData.colorList[1],
            },
            itemStyle: {
              color: chartData.colorList[1],
            },
            emphasis: {
              itemStyle: {
                color: chartData.emphasisColorLists[0],
              },
              lineStyle: {
                width: 1,
                color: chartData.colorList[1],
              },
            },
          },
          {
            name: "上下游液位差曲线",
            type: "line",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: chartData.DownLevelData,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: chartData.colorList[2],
            },
            itemStyle: {
              color: chartData.colorList[2],
            },
            emphasis: {
              itemStyle: {
                color: chartData.emphasisColorLists[0],
              },
              lineStyle: {
                width: 1,
                color: chartData.colorList[2],
              },
            },
          },
        ],
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
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 800px;
  margin-top: 10px;
}
</style>



