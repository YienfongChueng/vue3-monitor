<template>
    <div class="pagination-wrap">
        <el-pagination
                v-model:current-page="props.currentPage"
                v-model:page-size="props.pageSize"
                :page-sizes="props.pageSizes"
                small="small"
                :background="true"
                :layout="props.layout"
                :total="props.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
    </div>
</template>
<script setup>
import {ref} from 'vue'

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type:Number,
        default: 10
    },
    pageSizes: {
        type: Array,
        default: [20, 50, 100, 200]
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    }
})
const emit = defineEmits(['handleChange','update:currentPage','update:pageSize'])

const handleSizeChange = (val) => {
    emit('update:pageSize',val)
    emit('handleChange')
  
}
const handleCurrentChange = (val) => {
    emit('update:currentPage',val)
    emit('handleChange')
}

</script>