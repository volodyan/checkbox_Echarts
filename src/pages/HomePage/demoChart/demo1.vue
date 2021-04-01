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
        default: true,
      },
      chart: null,
      sidebarElm: null,
      chartData: {},
    };
  },

  mounted() {
    Bus.$on("ConTrolLegendFun_Demo", (e) => {
      let LegendLists = {
        MA5: true,
        Volume: true,
        Volume2: false,
        Volume3: false,
        MA6: true,
      };
      e.map((ele) => {
        LegendLists[ele] = true;
      });
      console.log("LegendLists", LegendLists);
      (this.chartData.LegendLists = LegendLists),
        this.setOptions(this.chartData);
    });
    var colorList = [
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
    var labelFont = "bold 12px Sans-serif";

    let dates = [];
    let volumesInit = [
      86160000,
      79330000,
      102600000,
      104890000,
      85230000,
      115230000,
      99410000,
      90120000,
      79990000,
      107100000,
      81020000,
      91710000,
      84510000,
      118160000,
      89390000,
      89820000,
      100210000,
      102720000,
      134120000,
      83770000,
      92570000,
      109090000,
      100920000,
      136670000,
      80100000,
      97060000,
      95020000,
      81530000,
      80020000,
      85590000,
      75790000,
      87390000,
      88560000,
      86640000,
      88440000,
      103260000,
      79120000,
      95530000,
      111990000,
      87790000,
      86480000,
      79180000,
      68940000,
      73190000,
      147390000,
      78530000,
      75560000,
      82270000,
      71870000,
      78750000,
      71260000,
      69690000,
      90540000,
      101690000,
      93740000,
      94130000,
      91950000,
      248680000,
      99380000,
      85130000,
      89440000,
    ];
    let volumes = [];
    let volumes2 = [];
    let volumes3 = [];
    let dataMA5 = [];
    let dataMA6 = [];
    volumesInit.map((ele, index) => {
      dates.push(index);
      volumes.push(parseInt(ele / 66000));
      volumes2.push(parseInt(2000));
      volumes3.push(parseInt(2600));
      dataMA5.push(parseInt(ele / 66000));
      dataMA6.push(parseInt(ele / 67000));
    });
    let LegendLists = {
      MA5: true,
      Volume: true,
      Volume2: false,
      Volume3: false,
      MA6: true,
    };
    this.chartData = {
      colorList,
      dates,
      dataMA5,
      dataMA6,
      volumes,
      volumes2,
      volumes3,
      labelFont,
      LegendLists,
    };
    this.$nextTick(() => {
      this.initChart();
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
          data: ["MA5", "Volume", /*  "Volume2", "Volume3", */ "MA6"],
          selected: chartData.LegendLists,
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
            data: chartData.dates,
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
            data: chartData.dates,
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
            data: chartData.dates,
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
            splitLine: { show: true },
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
            axisLabel: { show: true },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
          {
            scale: true,
            gridIndex: 2,
            splitNumber: 2,
            axisLabel: { show: true },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
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
            name: "Volume",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#7fbe9e",
            },
            itemStyle: {
              color: "#7fbe9e",
            },
            emphasis: {
              itemStyle: {
                color: "#140",
              },
              lineStyle: {
                width: 1,
                color: "#7fbe9e",
              },
            },
            data: chartData.volumes,
          },
          {
            name: "Volume2",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: false,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#FF6347",
            },
            itemStyle: {
              color: "#FF6347",
            },
            emphasis: {
              itemStyle: {
                color: "#140",
              },
              lineStyle: {
                width: 1,
                color: "#FF6347",
              },
            },
            data: chartData.volumes2,
          },
          {
            name: "Volume3",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: false,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#FF7F50",
            },
            itemStyle: {
              color: "#FF7F50",
            },
            emphasis: {
              itemStyle: {
                color: "#140",
              },
              lineStyle: {
                width: 1,
                color: "#FF7F50",
              },
            },
            data: chartData.volumes3,
          },
          {
            name: "MA5",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: chartData.dataMA5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#FFA500",
            },
            itemStyle: {
              color: "#FFA500",
            },
            emphasis: {
              itemStyle: {
                color: "#140",
              },
              lineStyle: {
                width: 1,
                color: "#FFA500",
              },
            },
          },
          {
            name: "MA6",
            type: "line",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: chartData.dataMA6,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#6495ED",
            },
            itemStyle: {
              color: "#6495ED",
            },
            emphasis: {
              itemStyle: {
                color: "#140",
              },
              lineStyle: {
                width: 1,
                color: "#6495ED",
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



