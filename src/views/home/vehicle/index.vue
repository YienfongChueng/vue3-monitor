<template>
    <div>
        <el-card class="container-wrap">
            <div class="btn-list">
                <!-- 使用hooks方式控制按钮权限 -->
                <!-- <el-button v-if="btnPermisssion('新增车辆')" type="success" @click="setData('add',null)">新增车辆</el-button> -->
                <!-- 使用自定义指令控制按钮权限 -->
                <el-button v-permission="'vehicle:新增车辆'" type="success" @click="setData('add',null)">新增车辆</el-button>
            </div>
            <MyTable 
            :tableData="tableData"
            :columns="columns"
            :total="total"
            :currentPage="listQuery.pageNo"
            :pageSize="listQuery.pageSize"
            :highlightCurrentRow="false"
            @changeTableData="changeTableData">
                <template #check="{ slotProps }">
                    <el-tag class="ml-2" :type="slotProps.check?'success':'danger'">
                        {{ checkFilter(slotProps.check) }}
                    </el-tag>
                </template>
                <template #operator="{slotProps}">
                    <!-- <el-button v-if="btnPermisssion('编辑')" type="primary" @click="setData('edit',slotProps)">编辑</el-button>
                    <el-button v-if="btnPermisssion('删除')" type="danger" @click="handleDel(slotProps)">删除</el-button> -->
                    <el-button v-permission="'vehicle:编辑'" type="primary" @click="setData('edit',slotProps)">编辑</el-button>
                    <el-button v-permission="'vehicle:删除'" type="danger" @click="handleDel(slotProps)">删除</el-button>
                </template>
            </MyTable>
        </el-card>
        <MyDialog
            v-model:visible="dialogVisible"
            :title="type === 'add' ? '新增车辆' : '编辑车辆'"
            :btnText="'提交'"
            @confirm="handleConfirm">
            <el-form :model="detail" label-width="120px">
                <el-form-item label="车辆自编号">
                  <el-input v-model="detail.number" />
                </el-form-item>
                
                <el-form-item label="车牌号">
                  <el-input v-model="detail.numberplate" @change="checkNumberplate(detail.numberplate)"
                    :disabled="type=='add'?false:true"/>
                </el-form-item>
                <el-alert title="车牌号重复!" type="error" :closable="false" center show-icon  v-show="isExist"/>
          
                <el-form-item label="车辆出厂日期">
                  <el-date-picker
                    v-model="detail.date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                  />
                </el-form-item>
          
                <!-- 正常true 异常false -->
                <el-form-item label="车辆状态">
                  <el-switch 
                    v-model="detail.check" 
                    active-text="正常"
                    inactive-text="异常" />
                </el-form-item>
            </el-form>
        </MyDialog>
    </div>
</template>

<script setup>
import { ref,onMounted,watch,onActivated,onDeactivated } from 'vue'
import { carList,carCreateOrUpd,carIsExist,carDelete } from '@/api/modules/car.js'
import useHooks from '@/hooks'
import useBtnPermission from '@/hooks/permission'
import MyDialog from '@/components/dialog/index.vue'
import MyPagination from '@/components/pagination/index.vue'
import MyTable from '@/components/table/index.vue'

const { checkFilter, dateFormate } = useHooks()
const { btnPermisssion } = useBtnPermission()
let listQuery = ref({
    pageNo:1,
    pageSize: 10
})
const tableData = ref([])
let total = ref(0)
let dialogVisible = ref(false)
let detail = ref({})
let type = ref('')
let isExist = ref(false)

/**
 * prop:数据项列名
 * label:列名展示名
 * fixed:固定列 true/right/left
 * width:列宽
 * show-overflow-tooltip
 * type:对应列的类型 selection / index / expand
 * sortable:true/false
 * selectable:Function
 * formatter:格式化内容 function(row, column, cellValue, index)
**/
let columns = ref([
    // {type:'expand',label: '',width:'50px'},
    // {type: 'selection',label:'',width: '50px'},
    {type: 'index',label:'序号',width: '60px'},
    {prop: 'number',label: '车牌自编号',showOverflowTooltip: true, width: '150px'},
    {prop: 'numberplate',label: '车牌号'},
    {prop: 'date',label: '出厂日期',formatter: dateFormate},
    {prop: 'check',label: '车辆状态'},
    {prop: 'operator',label: '操作',fixed: "right"},
])

onActivated(()=> {
    console.log('vehicle:onActivated')
})

onDeactivated(()=> {
    console.log('vehicle:onDeactivated')
})
onMounted(() => {
    getCarList()
})

const changeTableData = (pageNum,pageSize) => {
    listQuery.value.pageNo = pageNum
    listQuery.value.pageSize = pageSize
    getCarList()
}
// 列表查询
async function getCarList() {
    const {data: {data}} = await carList(listQuery.value)
    tableData.value = data.list
    total.value = data.rows
}

// 校验车牌号是否唯一
function checkNumberplate(numberplate) {
    carIsExist({numberplate}).then(res => {
        const {data: {data}} = res
        console.log(data)
        isExist.value = data.exist
    })

}

// 提交
function handleConfirm() {
    dialogVisible.value = false
    carCreateOrUpd(detail.value).then(res => {
        console.log(res)
        const {data: {code}} = res
        if(code === 20000) {
            ElNotification({
                type: 'success',
                title: '提交成功',
                message: '提交成功!',
                duration: 2000
            });
            getCarList()
        }
    })

}

// 打开新增/编辑弹窗
function setData(t,data) {
    type.value = t
    detail.value = t === 'add' ? {} : {...data}
    dialogVisible.value = true
}

// 删除
function handleDel(data) {
  ElMessageBox.confirm(
        `确定要删除车牌号为${data.numberplate}的车辆？`,
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
  ).then(() => {
    carDelete(data.id).then(res => {
        const {data: {code}} = res
        if(code === 20000) {
            getCarList()
            ElMessage({
              type: 'success',
              title: '删除成功',
              message: '删除成功!',
              duration: 2000
            })
        }
    })
  }).catch(() => {
      
  })

}



</script>

<style lang="scss" scoped>

</style>