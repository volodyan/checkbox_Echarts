// 引入mockjs
const Mock = require("mockjs");

import PipeNetWorkDiagonseAvgChartData from './data/PipeNetWorkDiagonseAvgChartData.json'
import PipeNetWorkDiagonseRealChartData from './data/PipeNetWorkDiagonseRealChartData'




// Mock.mock( url, post/get , 返回的数据)；

Mock.mock("/api/PipeNetWorkDiagonseAvgChartData", "post", PipeNetWorkDiagonseAvgChartData);
Mock.mock("/api/PipeNetWorkDiagonseRealChartData", "post", PipeNetWorkDiagonseRealChartData);