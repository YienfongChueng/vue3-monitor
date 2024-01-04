import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: ()=> ({
        UID: '',
        ACCOUNT: ''
    }),
    getters: {
        uidGetter: state => state.UID,
        accountGetter: state => state.ACCOUNT
    },
    actions: {
        setUid(id) {
            this.UID = id
        },
        setAccount(val) {
            this.ACCOUNT = val
        },
        resetUser() {
            this.UID = ''
            this.ACCOUN = ''
        }
    },
    persist: {
        enabled: true, // 开启
        strategies: [
            {
                key: 'user',
                storage: sessionStorage
            }
        ]

    }
})