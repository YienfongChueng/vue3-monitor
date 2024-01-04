import {computed,onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'

export default function useBtnPermission() {
    const route = useRoute()
    const permissionStore = usePermissionStore()

    // 1、通过路由地址,设置用户按钮权限
    onMounted(() => {
        permissionStore.setButtonPermission(route.path)
    })
    // 2、获取buttonPermission
    const { buttonPermission } = storeToRefs(permissionStore)
    // 3、按钮匹配 
    const btnPermisssion = computed(()=> v=> {
        // v = '编辑';
        // buttonPermission = ['编辑','删除'];
        return buttonPermission.value.some(d => d.includes(v))

    })  
    return {
        btnPermisssion
    }


}