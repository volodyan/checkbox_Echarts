/**
 * Модуль роутера приложения
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import initListners from './initListners';
import listners from './listners';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/DDOrder',
    },
    {
        path: '/DDOrder',
        name: 'Home',
        component: () =>
            import ('@/views/Home/index'),
    }, {
        path: '*',
        component: () =>
            import ('@/views/errorpage/404'),
        hidden: true
    }
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default initListners(router, listners);