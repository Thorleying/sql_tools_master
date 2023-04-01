import {createRouter,createWebHashHistory} from 'vue-router'
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            redirect: '/sqlTools',
        },
        {
            path: '/sqlTools',
            name: 'sqlTools',
            meta: {
                title: 'sql-tools'
            },
            children:[
                {
                    path: '/sqlTools',
                    redirect: '/sqlTools/home',
                },
                {
                    path: '/sqlTools/home',
                    name: 'home',
                    meta: {
                        title: 'sql-tools主页'
                    },
                    component: () => import(/* webpackChunkName: "about" */ '../pages/home/sqlHome.vue')
                }
            ],
            component: () => import(/* webpackChunkName: "about" */ '../layout/layoutView.vue')
        },
    ]
})
router.afterEach((to,from)=>{
    // @ts-ignore
    document.title = to.meta.title;
})
export default router