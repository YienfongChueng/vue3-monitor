import { defineStore } from 'pinia'
import { handleLevel,createTree } from '@/utils'
export const usePermissionStore = defineStore('permission', {
    state: ()=> ({
        originMenus: [],
        menus: [],
        buttonPermission:[],
        routes: []

    }),
    getters: {
        buttonPermissionList: state => {
            let perList = []
            state.originMenus.map(item => {
                const userPermission = item.userPermission
                userPermission && userPermission.map(p => {
                    perList.push(item.name + ':' + p)
                })
            })
            return perList
        }
    },
    actions: {
        setMenus(arr) {
            // arr 扁平化数据
            this.originMenus = arr
            this.menus = handleLevel(arr)
            createTree(this.menus,arr)
        },
        resetMenus() {
            this.originMenus = []
            this.menus = []
            this.buttonPermission = []
        },
        setRoutes(list) {
            this.routes = list
        },
        setButtonPermission(path) {
            const res = this.originMenus.filter(v => v.menu_url === path) // path =  '/vehicle'
            this.buttonPermission = res.map(v => v.userPermission) // ['编辑','删除']
        }

    },
    // persist: {
    //     enabled: true, // 开启
    //     strategies: [
    //         {
    //             key: 'permission',
    //             storage: sessionStorage
    //         }
    //     ]
    // }
})