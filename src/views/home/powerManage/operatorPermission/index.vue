<template>
    <MyTable 
        :tableData="tableData"
        :columns="columns"
        :hasPagination="false"
        :highlightCurrentRow="false">
            <template #operator="{slotProps}">
                <el-button type="success" @click="handleAuth(slotProps)">授权</el-button>
            </template>
    </MyTable>
    <!-- 授权弹窗 -->
    <MyDialog
        v-model:visible="dialogVisible"
        :title="'授权'"
        :showBtn="false"
       >
        <el-tree
            :data="menuData"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span class="custom-tree-node__label">{{ node.label }}</span>
                    <span class="custom-tree-node__oper" v-if="data.permission && data.permission.length > 0">
                        <el-checkbox-group v-model="data.userPermission">
                            <el-checkbox v-for="(v,i) in data.permission" :key="i" :label="v.label" @change="(val) => checkboxChange(val,data,v)"/>
                        </el-checkbox-group>
                    </span>
                </span>
            </template>
        </el-tree>
    </MyDialog>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import { getUserOper, findModules,findModulesByUid,updateModulesPermByUid } from '@/api/modules/user'
import MyTable from '@/components/table/index.vue'
import MyDialog from '@/components/dialog/index.vue'
import { createTree, handleLevel } from '@/utils'

const tableData = ref([])
const columns = ref([
    {type: 'index',label:'序号',width: '60px'},
    {prop: 'id',label: 'ID'},
    {prop: 'account',label: '操作员'},
    {prop: 'operator',label: '操作',fixed: "right"},
])

let dialogVisible = ref(false)
let oper = ref({})
const menuData = ref([])

onMounted(()=> {
    getOperatorList()
})

const getOperatorList = async() => {
    const {data:{data: opers}} = await getUserOper()
    tableData.value = opers
}

const getModulesByUid = async(params) => {
    const {data: {data: {list}}} = await findModulesByUid(params)
    // 1.获取一级菜单
    menuData.value = handleLevel(list)
    // 2. 树形化
    createTree(menuData.value,list)
}


const handleAuth = (row) => {
    dialogVisible.value = true
    oper.value = row
    getModulesByUid({id: row.id})
}

const checkboxChange = async(check,row,p) => {
    const params = {
        uid:oper.value.id,
        moduleJsonStr:JSON.stringify({mid:row.id,permission:[p]})
    };
    const res = await updateModulesPermByUid(params);
}

</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  &__label {
      flex:  0 1 50%;
  }
  &__oper {
      flex: 0 1 50%;
  }
}

</style>