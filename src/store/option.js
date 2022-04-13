import { defineStore } from "pinia";

export const useOptionState = defineStore('option', {
    state: () => {
        return {
            showFormItem: '深沪京', //判断表单的item选项
            isClearForm: [], //清除缓存的状态
            watchListTwo: '', //监听列表发生变化

            //爬取
            s_time: '',// ——  开始时间
            e_time: '',// ——  结束时间

        }
    },
})
