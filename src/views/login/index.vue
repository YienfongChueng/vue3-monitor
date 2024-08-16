<template>
    <WaterMaker text="禁止盗用" :fontSize="20" :gap="1">
        <div class="login" >
            <div class="login-content">
                <div class="login-item login-box">
                <el-icon><Connection /></el-icon>
                    <p>软件平台</p>
                </div>
                <div class="login-item login-box">
                    <el-icon><PieChart /></el-icon>
                    <p>智慧能耗</p>
                </div>
                <!-- 登陆表单start -->
                <div class="login-item login-form">
                    <p class="login-title">电量智能监控系统</p>
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                        class="demo-ruleForm"
                        status-icon
                    >
                        <el-form-item prop="account">
                            <el-input v-model="ruleForm.account" clearable placeholder="请输入账号"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="ruleForm.password" clearable placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button  class="login-button" type="primary" @click="submitForm(ruleFormRef)">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 登陆表单end -->
                <div class="login-item login-box">
                    <el-icon><Service /></el-icon>
                    <p>消防监测</p>
                </div>
                <div class="login-item login-box">
                    <el-icon><Bell /></el-icon>
                    <p>智能报警</p>
                </div>
            </div>
        </div>
    </WaterMaker>
</template>

<script setup>
import {ref,reactive } from 'vue'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { apiLogin } from '@/api/modules/user.js'
import useToken from '@/utils/auth.js'
import { useUserStore } from '@/store/user.js'
import WaterMaker from '@/components/waterMaker/index.vue'

const userStore = useUserStore()
const router = useRouter()
const {setToken} = useToken()
const ruleFormRef = ref()
const ruleForm = reactive({
    account: 'admin',
    password: 'admin@123'
})
const rules = reactive({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 18, message: '账号长度为3-18位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 18, message: '密码长度为3-18位', trigger: 'blur' },
    ],
})

const submitForm = (fromEl) => {
    fromEl.validate(async valid => {
        if(!valid) {
            ElMessage.error('账号密码错误，请重新输入')
            return false
        }
        // 密码加密
        const data = {
            account: ruleForm.account,
            password: md5(ruleForm.password)
        }
        const res = await apiLogin(data)
        const {data: {token,id,account}} = res.data
        setToken(token)
        userStore.setUid(id)
        userStore.setAccount(account)
        // to index
        router.push('/index')
    })
}

</script>

<style lang="scss" scoped>

</style>