<template>
    <el-card class="container-wrap">
        <div class="btn-list">
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
        </div>
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
import {ref,onMounted} from 'vue'
import {carChargeList, carCharge, carListValid} from '@/api/modules/car.js'
import useHooks from '@/hooks'
import useBtnPermission from '@/hooks/permission'
import MyPagination from '@/components/pagination/index.vue'

const { dateFormate } = useHooks()
const { btnPermisssion } = useBtnPermission()
const listQuery = ref({
    pageNo: 1,
    pageSize: 10,
    carId:'' // //查询车牌号

})
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

async function getCarNumber() {
    let {data:{data:{list}}} = await carListValid();
    carNumberList.value= list
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