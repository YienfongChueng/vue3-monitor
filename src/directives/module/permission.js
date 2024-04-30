import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'

export default{
    mounted(el,binding) {
        const permissionStore = usePermissionStore()

        // 1、获取buttonPermissionList
        const { buttonPermissionList } = storeToRefs(permissionStore)
        // 2、按钮匹配 
        // binding.value= 'vehicle:编辑';
        // buttonPermissionList = ['vehicle:编辑','vehicle:删除'];
        const hasPermission = buttonPermissionList.value.some(d => d.includes(binding.value))
        if (!hasPermission) {
            el.remove()
        }
    }
}