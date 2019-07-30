import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
import Sidebar from '../components/common/Sidebar.vue'

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/index',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['@/components/login.vue'], resolve),
            meta: {
                title: '登陆'
            }
        },
        {
            path: '/dictionary',
            component:resolve => require(['@/components/DictionaryView.vue'],resolve),
            children:[
                {
                    path:"Header",
                    component:Header,
                },
                {
                    path:"Footer",
                    component:Footer,
                },
                {
                    path:"Sidebar",
                    component:Sidebar,
                }
            ]
        }
    ],
    mode: 'history'
});

export default router
