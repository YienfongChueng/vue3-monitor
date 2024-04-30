<template>
    <div>
        <el-table 
            :style="{ width: '100%' }"
            ref="elTableRef"
            :data="tableData" 
            :height="height" 
            :max-height="maxHeight"
            :stripe="stripe"
            :row-key="rowKey"
            :highlight-current-row="highlightCurrentRow"
            @row-click="handleRowClick"
			@selection-change="handleSelectionChange">
            <el-table-column 
                v-for="item in columns" 
                :key="item.prop"
                :prop="item.prop" 
                :label="item.label"
                :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
                :width="item.width"
                :fixed="item.fixed"
                :type="item.type" 
                :sortable="item.sortable"
                :selectable="item.selectableFn">
                <!-- type 对应列的类型: selection / index / expand
                如果设置了selection则显示多选框； 
                如果设置了 index 则显示该行的索引（从 1 开始计算）； 
                如果设置了 expand 则显示为一个可展开的按钮 -->
                <template #default="{row, column, $index}" v-if="item.type === 'index'">
                    {{getIndex($index)}}
                </template>
                <template #default="{row, column, $index}" v-if="!item.type">
                    <!-- 具名作用域插槽 -->
                    <slot 
                     :name="item.prop"
                     :slotProps="row"
                     :index="$index">
                        <!-- 默认内容,当父组件不传内容时默认显示该内容 -->
                        <span v-if="item.formatter">
                            {{ item.formatter(row[item.prop]) }}
                        </span>
                        <span v-else>
                            {{ row[item.prop] }}
                        </span>
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination
                    v-if="hasPagination"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="pageSizes"
                    :small="small"
                    :background="true"
                    :layout="layout"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup>
import {toRefs} from 'vue'
const props = defineProps({
    // 表格相关
    tableData: {
        type: Array,
        default: []
    },
    columns:{
        type: Array,
        default: []
    },
    height: {
        type: String,
        default: '500px'
    },
    maxHeight: {
        type: String,
        default: '500px'
    },
    stripe: {
        type: Boolean,
        default: true
    },
    rowKey: {
        type: String,
		default: 'id'
    },
    highlightCurrentRow: {
        type: Boolean,
        default: true
    },
    //  分页相关
    hasPagination: {
        type:Boolean,
        default: true
    },
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
        default: [10, 20, 50, 100, 200]
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    small: {
        type: String,
        default: 'small'
    }
})

let {
    tableData,
    columns,
    height,
    maxHeight,
    stripe,
    rowKey,
    highlightCurrentRow,
    hasPagination,
    total,
    currentPage,
    pageSize,
    pageSizes,
    layout,
    small
} = toRefs(props)


const emit = defineEmits(['rowClick','selectChange','changeTableData','update:currentPage','update:pageSize'])
// 当某一行被点击时会触发该事件
const handleRowClick = (row, column, event) => {
    console.log('handleRowClick:',row, column, event)
    emit('rowClick', { row, column, event })
}
// 当选择项发生变化时会触发该事件
const handleSelectionChange = (selection) => {
    console.log('handleSelectionChange:',selection)
    emit('selectChange', selection)
}

// 每页条数变化的事件
const handleSizeChange = (val) => {
    emit('update:pageSize',val)
    emit('changeTableData', currentPage.value, val)
}
// 当前页码变化的事件
const handleCurrentChange = (val) => {
    emit('update:currentPage',val)
    emit('changeTableData', val, pageSize.value)
}

const getIndex = (index)=> {
    return index + 1 + (currentPage.value - 1) * pageSize.value
}

</script>

<style lang="scss" scoped>

</style>