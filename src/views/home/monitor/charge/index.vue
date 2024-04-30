<template>
    <el-card class="container-wrap">
        <!-- <div class="btn-list">
            <span>车牌号查询：</span>
            <el-select 
                v-model="listQuery.carId" 
                clearable 
                placeholder="请选择"
                @change="getList">
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in carNumberList"
                  :key="item.id"
                  :label="item.numberplate"
                  :value="item.id"
                />
            </el-select>
        </div> -->
        <SearchForm :formConfig="formConfig" @searchHandle="searchHandle" @resetHandle="resetHandle" />

        <el-table :data="tableData" height="500px" style="width: 100%">
            <el-table-column prop="numberplate" label="车牌号"/>
            <el-table-column prop="date" label="充电日期" >
                <template #default="{row}">
                    {{dateFormate(row.date)}}
                </template>
            </el-table-column>
            <el-table-column prop="starttime" label="充电开始时间" />
            <el-table-column prop="startPower" label="充电开始电量" />
            <el-table-column prop="completePower" label="充电完成电量" />
            <el-table-column label="操作">
                <template #default="{row}">
                    <el-button type="primary" @click="charge(row)">充电</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <MyPagination
            v-model:current-page="listQuery.pageNo"
            v-model:page-size="listQuery.pageSize"
            :total="total"
            @handle-change="getList"
        />
            
    </el-card>
</template>
<script setup>
import {ref,onMounted,computed,reactive,onActivated,onDeactivated} from 'vue'
import {carChargeList, carCharge, carListValid} from '@/api/modules/car.js'
import useHooks from '@/hooks'
import useBtnPermission from '@/hooks/permission'
import MyPagination from '@/components/pagination/index.vue'
import SearchForm from '@/components/searchForm/index.vue'

const { dateFormate } = useHooks()
const { btnPermisssion } = useBtnPermission()
const listQuery = ref({
    pageNo: 1,
    pageSize: 10,
    carId:'' //查询车牌号

})

onActivated(()=> {
    console.log('charge:onActivated')
})

onDeactivated(()=> {
    console.log('charge:onDeactivated')
})

/**
{
    type: 'input | select | datePicker | cascader | complexInput(下拉+输入框) | cascaderInput(级联 + 输入框)' // 表单类型,
    field: 'name', //该表单项的字段名
    label: '标签名', // 表单中文名
    placeholder: '请填写报送人 | ['开始日期', '结束日期']' , // placeholder（可不传，不传自动生成：请填写xxxx）
    default: '',// 默认值
}
complexInput、cascaderInput类型:
{
    field: ['type', 'typeText'], // [下拉框字段名, 输入框字段名],
    placeholder: ['请选择', '请填写关键字'], // 可不传  [下拉框placeholder, 输入框placeholder]
    options: [
        {
            label:'',
            value:'',
            // 如果有children
            children: [{
                label:'',
                value: ''
            }]
        }
    ]
}
*/
const formConfig = reactive([])

// 获取搜索表单的值
const searchHandle = (formData) => {
    console.log('表单的值为：', formData)
    listQuery.value.carId = formData.carId
    getList()
}

// 重置的回调
const resetHandle = (formData) => {
    console.log('重置成功！')
    listQuery.value.carId = formData.carId
    getList()
}

const total = ref(0)
const tableData = ref([])
const carNumberList = ref([])
onMounted(()=> {
    getList()
    getCarNumber()
})
async function getList() {
    const res = await carChargeList(listQuery.value)
    const {data: {data}} = res
   tableData.value = data.list
   total.value = data.rows
}


const carNumberOptions = computed(()=> {
    return carNumberList.value.map(item => {
        return {
            // ...item,
            label: item.numberplate,
            value: item.id
        }
    })
})

async function getCarNumber() {
    let {data:{data:{list}}} = await carListValid();
    carNumberList.value= list
    // 表单配置
    formConfig.push({
        type: 'select',
        field: 'carId',
        label: '车牌号：',
        placeholder: '请车牌号', // 可不传，不传自动生成：请选择xxxx
        default: '',
        options: carNumberOptions.value
    })
}

// 充电
function charge(row) {
    carCharge({carId: row.id}).then(res => {
        getList()
    })
}


</script>

<style lang="scss" scoped>

</style>