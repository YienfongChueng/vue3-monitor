<template>
	<div class="search-form-wrap">
		<el-form ref="formRef" :model="form" onsubmit="return false">
			<slot></slot>
			<div class="search-form" v-for="item in formConfigList" :key="item.field">
				<!-- input 输入框 -->
				<div class="form-item" v-if="item.type === 'input'">
					<el-form-item :label="item.label">
						<el-input
							v-model="form[item.field]"
							:placeholder="item.placeholder || placeholderHandle(item)"
						></el-input>
					</el-form-item>
				</div>

				<!-- select 普通下拉框 -->
				<div class="form-item" v-if="item.type === 'select'">
					<el-form-item :label="item.label">
						<el-select
							v-model="form[item.field]"
							clearable
							:placeholder="item.placeholder || placeholderHandle(item)"
						>
							<slot name="customSelect">
								<el-option
									:label="obj.label"
									:value="obj.value"
									v-for="obj in item.options"
									:key="obj.value"
								></el-option>
							</slot>
						</el-select>
					</el-form-item>
				</div>

				<!-- datePicker 日期范围选择 -->
				<div class="form-item" v-if="item.type == 'datePicker'">
					<el-form-item :label="item.label">
						<el-date-picker
							v-model="form[item.field]"
							:type="item.pickType || 'daterange'"
							range-separator="~"
							:start-placeholder="placeholderHandle(item, 'start')"
							:end-placeholder="placeholderHandle(item, 'end')"
							@change="dateChange($event, item.field)"
							:disabledDate="item.disabledDate || function dateFun() {}"
							:format="item.format || 'YYYY-MM-DD'"
						>
						</el-date-picker>
					</el-form-item>
				</div>

				<!-- complexInput 下拉框+输入框复合 -->
				<div
					class="form-item selectInput-item"
					v-if="item.type == 'complexInput'"
				>
					<el-form-item :label="item.label">
						<el-input
							:placeholder="placeholderHandle(item, 'input')"
							v-model="form[item.field[1]]"
						>
							<template #prepend>
								<el-select
									v-model="form[item.field[0]]"
									:placeholder="placeholderHandle(item, 'select')"
									@change="complexInputChange($event, item.options)"
								>
									<el-option
										:label="obj.label"
										:value="obj.value"
										v-for="obj in item.options"
										:key="obj.value"
									></el-option>
								</el-select>
							</template>
						</el-input>
					</el-form-item>
				</div>

				<!-- cascaderInput 级联选择器+输入框复合 -->
				<div class="form-item cascaderInput-item" v-if="item.type === 'cascaderInput'">
					<el-form-item :label="item.label">
						<el-input
							:placeholder="placeholderHandle(item, 'input')"
							v-model="form[item.field[1]]"
						>
							<template #prepend>
								<el-cascader
									:placeholder="placeholderHandle(item, 'select')"
									v-model:value="form[item.field[0]]"
									:options="item.options"
									clearable
									filterable
								/>
							</template>
						</el-input>
					</el-form-item>
				</div>

				<!-- cascaderInput 级联选择器 -->
				<div class="form-item" v-if="item.type === 'cascader'">
					<el-form-item :label="item.label">
						<el-cascader
							:placeholder="item.placeholder || placeholderHandle(item)"
							v-model:value="form[item.field]"
							:options="item.options"
							clearable
							filterable
						/>
					</el-form-item>
				</div>
			</div>
			<slot name="right"></slot>
		</el-form>

		<div class="btns">
			<el-button class="lv2-btn-blue" @click="searchHandle">
				<i class="iconfont icon-sousuo"></i>
				查询
			</el-button>
			<el-button class="lv2-btn-white" @click="resetHandle">
				<i class="iconfont icon-zhongzhi"></i>
				重置
			</el-button>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs, ref, onMounted, watch } from 'vue'
import moment from 'moment'
    const props = defineProps({
        formConfig: {
            type: Object,
            default: () => {}
        }
    })
    const formConfigList = props.formConfig

    const formRef = ref()
    // 存储表单所有的值
	const form = reactive({})
    // 表单初始化
    const formInit = (data) => {
        data.forEach((item) => {
            switch (item.type) {
                case 'input':
                case 'select':
                case 'datePicker':
                case 'cascader':
                    form[item.field] = item.default
                    break
                case 'complexInput':
                    form[item.field[0]] = item.default.length > 0 ? item.default[0] : ''
                    form[item.field[1]] = item.default.length > 0 ? item.default[1] : ''
                    break
                case 'cascaderInput':
                    form[item.field[0]] = item.default.length > 0 ? item.default[0] : []
                    form[item.field[1]] = item.default.length > 0 ? item.default[1] : ''
                    break
                default:
            }
        })
        formConfigList.value = data
    }
    onMounted(() => {
        formInit(props.formConfig)
    })
    watch(()=> props.formConfig, (val) => {
        formInit(val)
    })

    // 处理placeholder
    const placeholderHandle = (data, flag) => {
        switch (data.type) {
            case 'input':
                return data.placeholder || `请填写${data.label.replace(/：/, '')}`
            case 'select':
                return data.placeholder || `请选择${data.label.replace(/：/, '')}`
            case 'datePicker': {
                const placeholderArr = data.placeholder || ['开始日期', '结束日期']
                return flag === 'start' ? placeholderArr[0] : placeholderArr[1]
            }
            case 'complexInput':
            case 'cascaderInput': {
                const placeholderArr = data.placeholder || ['请选择', '请填写关键字']
                return flag === 'select' ? placeholderArr[0] : placeholderArr[1]
            }
            case 'cascader': {
                return data.placeholder || `请选择${data.label.replace(/：/, '')}`
            }
            default:
                return ''
        }
    }

    // 日期选择器change事件
    const dateChange = (data, fieldName) => {
        if (data) {
            let startTime = data[0]
            let endTime = data[1]
            // 格式化时间返回值
            form[fieldName] = [
                // moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
                // moment(endTime).format('YYYY-MM-DD HH:mm:ss')
                moment(startTime).format('YYYY-MM-DD'),
                moment(endTime).format('YYYY-MM-DD')
            ]
        }
    }

    const complexInputChange = (value, options = []) => {
        options.forEach((item) => {
            form[item.value] = undefined
        })
    }

    const emit = defineEmits(['searchHandle','resetHandle'])
    // 查询回调
    const searchHandle = () => {
        emit('searchHandle', form)
    }

    // 重置回调
    const resetHandle = () => {
        formInit(props.formConfig)
        emit('resetHandle', form)
    }
</script>

<style lang="scss" scoped>
.search-form-wrap {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
    align-items: center;
    .search-form {
        margin-right: 20px;
    }
	.el-form {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
	}
	.form-item {
		margin: 0 0.3rem 0.3rem 0;
	}
	.btns {
		// width: 3rem;
		padding-bottom: 0.3rem;
		.lv2-btn-white {
			margin-left: 0.2rem;
		}
	}
}
</style>
<style lang="scss">
    // 使下拉框+输入框组合顶部对齐
    .selectInput-item {
        .el-input-group__prepend .el-select,
        .el-input-group__prepend .el-input,
        .el-input-group__prepend .el-input__inner {
            // vertical-align: top;
            // min-width: 1.5rem;
        }
    }
    .cascaderInput-item {
        .el-input-group__prepend {
                padding: 0;
        }
    }
    .el-form-item__label {
            color: #fff;
    }
</style>
