<script setup>
import { ref,toRefs } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  },
  btnText: {
    type: String,
    default: '保存'
  },
  showBtn: {
    type: Boolean,
    default: true
  }

})
const emit = defineEmits(['confirm','cancel','update:visible'])
// 从props 获取visible，用于模板中:model-value="visible"
let { visible } = toRefs(props)

const handleCancel = ()=> {
  emit('update:visible',false)
  emit('cancel')
}
const handleSubmit = ()=> {
  emit('confirm')
}
</script>

<template>
<!-- 此处不用v-model="props.visible",不然会有警告 -->
  <el-dialog 
    :model-value="visible" 
    :title="props.title"
    :before-close="handleCancel">
    <slot>这是默认内容</slot>
    <template #footer v-if="showBtn">
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">{{props.btnText}}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
