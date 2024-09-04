import {createRouter,createWebHashHistory} from 'vue-router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { findModulesByUid } from '@/api/modules/user'
import { initRoutes } from '@/utils'


export const constantRoutes = [
    {
        path: '/demo',
        name:'demo',
        meta: {title: 'demo'},
        component: ()=>import('@/layout/index.vue'),
        children:[
            {
                path: '/map1',
                name: 'map1',
                meta: {title: 'map1',},
                component:()=> import('@/views/home/mapLocation/index1.vue')
            },
            {
                path: '/map2',
                name: 'map2',
                meta: {title: 'map2',},
                component:()=> import('@/views/home/mapLocation/index2.vue')
            },
            {
                path: '/map3',
                name: 'map3',
                meta: {title: 'map3',},
                component:()=> import('@/views/home/mapLocation/index3.vue')
            },
            {
                path: '/screnShotImg',
                name: 'screnShotImg',
                meta: {title: 'canvas截图'},
                component:()=> import('@/views/home/demo/screnShotImg.vue')
            },
            {
                path: '/vitrualList',
                name: 'vitrualList',
                meta: {title: '虚拟列表'},
                component:()=> import('@/views/home/demo/vitrualList.vue')
            },
            {
                path: '/domToImage',
                name: 'domToImage',
                meta: {title: '复制网页成图片'},
                component:()=> import('@/views/home/demo/domToImage.vue')
            },

        ]
    },
]

export const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/login/index.vue')
    },
    // 解决：[Vue Router warn]: No match found for location with path
    // 原因： 刷新页面时请求路由为空，因为追加路由是在addRoute里做的，请求路由比addRoute早
    {
        path: "/:pathMatch(.*)*", // 必备
        component: () => import("@/views/404/index.vue"), 
    },
    {
        path: '/layout',
        name:'layout',
        component: ()=>import('@/layout/index.vue'),
        redirect: '/index',
        children:[]
    },
    ...constantRoutes
]


const router = createRouter({
    routes,
    history:createWebHashHistory()
})

router.beforeEach(async (to, from, next) => {
    if(to.path === '/login') {
        next()
    }else {
        const permissionStore = usePermissionStore()
        // 没缓存，则需要发请求获取路由权限等信息
        if(permissionStore && permissionStore.menus.length === 0) {
            const userStore = useUserStore()
            const {data: {data: {list}}} = await findModulesByUid({id: userStore.UID})
            // 缓存数据Store
            permissionStore.setMenus(list)
            // 递归生成路由配置
            const asyncRouteList = initRoutes(permissionStore.menus,[])
            // 缓存路由数据
            permissionStore.setRoutes(asyncRouteList)
            // 动态添加路由
            asyncRouteList.map(item => {
                router.addRoute('layout',item)
            })
            next({...to,replace: true})

        }else { // 有缓存则直接放行
            next()
        }
    }
})

export default router