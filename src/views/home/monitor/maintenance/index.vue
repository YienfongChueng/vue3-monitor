<template>
    <div>
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
                <el-table-column prop="chargeNum" label="充电次数">
                    <template #default="{row}">
                        <el-tag 
                            round 
                            effect="dark" 
                            style="width:50px"
                            class="mx-1"
                            :type="row.chargeNum > 5 ? 'danger' : 'success' ">
                            {{row.chargeNum}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{row}">
                        <el-button type="primary" :disabled="row.chargeNum < 5" @click="submitOrder(row)">提交工单</el-button>
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
    
        <MyDialog
            v-model:visible="dialogVisible"
            :title="'提交工单'"
            :btnText="'提交'"
            @confirm="handleConfirm">
            <el-form :model="detail" label-width="120px">
                <el-form-item label="车牌号">
                  <el-input disabled v-model="detail.numberplate" />
                </el-form-item>
                
                <el-form-item label="处理截止日期">
                  <el-date-picker
                    v-model="detail.enddate"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                  />
                </el-form-item>
                <el-form-item label="提交原因">
                    <el-input v-model="detail.content" type="textarea" placeholder="请填写原因"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="detail.email" type="text" placeholder="请填写邮箱"></el-input>
                </el-form-item>
            </el-form>
        </MyDialog>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import { carChargeNum,orderCarList,orderCreateOrUpd} from '@/api/modules/car.js'
import useHooks from '@/hooks'
import MyPagination from '@/components/pagination/index.vue'
import MyDialog from '@/components/dialog/index.vue'

const { dateFormate } = useHooks()
const listQuery = ref({
    pageNo: 1,
    pageSize: 10,

})
let dialogVisible = ref(false)
const detail = ref({})
const total = ref(0)
const tableData = ref([])
const carNumberList = ref([])
onMounted(()=> {
    getList()
})
async function getList() {
    const res = await carChargeNum(listQuery.value)
    const {data: {data}} = res
   tableData.value = data.list
   total.value = data.rows
}

// 提交工单
async function submitOrder(row) {
    if(!row.numberplate) {
        ElNotification({
            type: 'warning',
            title: '缺少车牌号',
            message: '缺少车牌号!',
            duration: 2000
        });
        return
    }
    detail.value = {...row}
    dialogVisible.value = true
}

async function handleConfirm() {
    const res = await orderCreateOrUpd(detail.value)
    const {data: {code} } = res
    if(code === 20000) {
        ElNotification({
            type: 'success',
            title: '提交成功',
            message: '提交成功!',
            duration: 2000
        });
        dialogVisible.value = false
        getList()
    }
}
</script>

<style lang="scss" scoped>

</style>