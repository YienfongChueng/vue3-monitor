<template>
    <el-card class="container-wrap">
        <el-table :data="tableData" height="500px" style="width: 100%">
            <el-table-column prop="numberplate" label="车牌号"/>
            <el-table-column prop="date" label="提交时间" >
                <template #default="{row}">
                    {{dateFormate(row.date)}}
                </template>
            </el-table-column>
            <el-table-column prop="enddate" label="处理截止时间" >
                <template #default="{row}">
                    {{dateFormate(row.enddate)}}
                </template>
            </el-table-column>
            <el-table-column prop="content" label="提交原因" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="status" label="状态" >
                <template #default="{row}">
                    <el-tag class="ml-2" :type="row.status === 0 ? 'danger' :'success'">{{statusFilter(row.status)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{row}">
                    <!-- 已处理的工单禁用 -->
                    <el-button type="primary" :disabled="row.status === 1" @click="deal(row)">处理</el-button>
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
import {orderList, orderComplete} from '@/api/modules/car.js'
import useHooks from '@/hooks'
import MyPagination from '@/components/pagination/index.vue'

const { dateFormate ,statusFilter} = useHooks()
const listQuery = ref({
    pageNo: 1,
    pageSize: 10,

})
const total = ref(0)
const tableData = ref([])
onMounted(()=> {
    getList()
})

async function getList() {
    const res = await orderList(listQuery.value)
    const {data: {data}} = res
   tableData.value = data.list
   total.value = data.rows
}

async function deal(row) {
    const res = await orderComplete(row)
    const {data: {code} } = res
    if(code === 20000) {
        ElNotification({
            type: 'success',
            title: '处理成功',
            message: '处理成功!',
            duration: 2000
        });
        getList()
    }
}


</script>

<style lang="scss" scoped>

</style>