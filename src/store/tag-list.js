import { defineStore } from "pinia";

export const useTagStore = defineStore('tag',{
    state: ()=> ({
        tagList: [
            // 初始化默认展示【首页】标签导航
            {
                path:'/index',
                name: 'index',
                meta: { title: '首页'}
            }
        ]
    }),
    getters: {
        cacheView: state=> state.tagList.map(d => d.name)
    },
    actions: {
        addTag(item) {
            this.tagList.push(item)
        },
        delTag(item) {
            // 找出要删除的tag的索引值
            const i = this.tagList.findIndex(v => v.path === item.path)
            this.tagList.splice(i,1)
        }
    },
    // 持久化
    persist: {
        enabled: true, // 开启
        strategies: [
            {
                key: 'tagList',
                storage: sessionStorage
            }
        ]

    }
})