import { computed } from 'vue'

export default function useHooks() {
    const checkFilter = computed(()=> v => {
        switch (v) {
            case true:
                return '正常'
            case false:
                return '异常'
            default:
                return '异常'
        }
    })

    const dateFormate = computed(()=> v => {
        if(!v) return '--'
        const date = new Date(v)
        const times = date.toLocaleDateString();
        return times;
    })

    const statusFilter = computed(()=> v => {
        switch (v) {
            case 0:
                return '待处理'
            case 1:
                return '已处理'
            default:
                return '--'
        }
    })
    return {
        checkFilter,
        dateFormate,
        statusFilter
    }
}
