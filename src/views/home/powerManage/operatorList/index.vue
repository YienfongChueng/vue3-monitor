<template>
    <el-card class="container-wrap">
        <div class="btn-list">
            <el-button type="success" @click="dialogVisible = true">添加操作员</el-button>
        </div>
        <MyTable 
        :tableData="tableData"
        :columns="columns"
        :total="total"
        :currentPage="listQuery.pageNo"
        :pageSize="listQuery.pageSize"
        :highlightCurrentRow="false"
        @changeTableData="changeTableData">
            <template #operator="{slotProps}">
                <el-button type="danger" @click="handleDel(slotProps)">删除</el-button>
            </template>
        </MyTable>
    </el-card>
    <!-- 新增操作员 -->
    <MyDialog
        v-model:visible="dialogVisible"
        :title="'新增操作员'"
        :btnText="'确定'"
        @confirm="handleConfirm(ruleFormRef)">
        <el-form 
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px" >
           <el-form-item label="用户名" prop="account">
                <el-input v-model ="ruleForm.account" placeholder="用户名"/>
            </el-form-item>
            
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码"/>
            </el-form-item>
            
            <el-form-item label="确认密码" prop="password2">
                <el-input
                v-model="ruleForm.password2"
                type="password"
                autocomplete="off"
                placeholder="确认密码"
                />
            </el-form-item>
        </el-form>
    </MyDialog>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import md5 from 'md5'
import MyTable from '@/components/table/index.vue'
import MyDialog from '@/components/dialog/index.vue'
import useHooks from '@/hooks'
import { userList, createUser, removeUser } from '@/api/modules/user'

const { dateFormate } = useHooks()

let dialogVisible = ref(false)
const ruleFormRef = ref()
const ruleForm = reactive({
    account: '',
    password: '',
    password2: ''
})
// 自定义校验
const validatePass2 = (rule,value,callback) => {
    if(!value) callback(new Error('请两次输入密码'))
    if(value !== ruleForm.password) callback(new Error('两次密码不一致,请重新输入'))
    else callback()
}
// 校验规则
const rules = reactive({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 18, message: 'Length should be 2 to 18', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 18, message: 'Length should be 3 to 18', trigger: 'blur' },
  ],
  password2: [
    { required: true, validator: validatePass2, trigger: 'blur' },
  ],
})

const listQuery = ref({
    pageNo:1,
    pageSize: 10
})
const tableData = ref([])
let total = ref(0)
let columns = ref([
    {type: 'index',label:'序号',width: '60px'},
    {prop: 'account',label: '用户名',showOverflowTooltip: true, width: '150px'},
    {prop: 'role_name',label: '角色'},
    {prop: 'creator',label: '创建人'},
    {prop: 'reg_time',label: '创建时间',formatter: dateFormate},
    {prop: 'operator',label: '操作',fixed: "right"},
])

onMounted(()=> {
    getList()
})

const getList = async()=> {
    let {data:{data:{list,rows}}} = await userList(listQuery.value);
    tableData.value = list;
    total.value = rows;

}
const changeTableData = (pageNum,pageSize) => {
    listQuery.value.pageNo = pageNum
    listQuery.value.pageSize = pageSize
    getList()
}

const handleDel = (row) => {
    ElMessageBox.confirm(
        `确定要删除操作员【${row.account}】？`,
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        removeUser(row.id).then(res => {
            const {data: {code}} = res
            if(code === 20000) {
                getList()
                ElMessage({
                    type: 'success',
                    title: '删除成功',
                    message: '删除成功!',
                    duration: 2000
                })
            }
        })
    }).catch(() => { })
}

const handleConfirm = (el)=> {
    if(!el) return 
    el.validate(async valid => {
        if(!valid) return
        //发送请求
        const params = {...ruleForm}
        params.password = md5(params.password);
        params.password2 = md5(params.password2);
       let {data:{code}} = await createUser(params)
       if(code === 20000) {
            ElNotification({
                type: 'success',
                title: '新增成功',
                message: '新增成功',
                duration: 2000,
            });
            dialogVisible.value = false
            // 清除弹窗数据
            ruleForm.account = ''
            ruleForm.password = ''
            ruleForm.password2 = ''
            getList();
       }

    })
}




</script>

<style lang="scss" scoped>

</style>