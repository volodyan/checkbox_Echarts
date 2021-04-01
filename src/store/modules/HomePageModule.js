/**
 * VueX模块的例子
 */

import AxiosService from "@/middleware/services/AxiosService";
import VuexModule from "../VuexModule";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'
import moment from "moment";
import Bus from "@/utils/bus";

const HomePageModule = new VuexModule({
    getters: {
        GetWaterworksNameInfo: state => state.WaterworksNameInfo,
        GetComputedResultData: state => state.ComputedResultData,
        GetAnalysisResults_TableData: state => state.AnalysisResults_TableData
    },
    state: {
        WaterworksNameInfo: {
            Sc: "西洲水厂",
            Order: [
                "开2台大机"
            ]
        },
        ComputedResultData: {},
        AnalysisResults_TableData: []
    },
    mutations: {
        set_WaterworksNameInfo: (state, data) => state.WaterworksNameInfo = data,
        set_ComputedResultData: (state, data) => state.ComputedResultData = data,
        AnalysisResults_TableData: (state, data) => state.AnalysisResults_TableData = data,
    },

    actions: {
        async WaterworksNameInfofun({ commit }, data) {
            await commit('set_WaterworksNameInfo', data);

        },
        async GetComputedResultfun({ commit }, data) {
            await commit('set_ComputedResultData', data);

        },
        async AnalysisResults_TableDatafun({ commit }, data) {
            await commit('AnalysisResults_TableData', data);

        },
        async GetWaterworksName({ commit }) {
            await AxiosService.GetWaterworksName()
                .then(res => {
                    console.log("GetWaterworksName---res", res)
                    commit('set_GetWaterworksName', res.data.WaterworksName);

                })
            return { error: false };

        },

    },

});

export default HomePageModule;