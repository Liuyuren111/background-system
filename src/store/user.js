import {defineStore} from 'pinia'

export const useUserState = defineStore('user', {
    state: () => {
        return {
            unit: localStorage['unit'] || '', //单位(学校)
            account: localStorage['account'] || '', //账号
            name: localStorage['name'] || '', //用户名
            email: localStorage['email'] || '', //邮箱
            telephone: localStorage['telephone'] || '', //电话
            isLogin: Boolean(sessionStorage['isLogin']) || '',
        }
    },
    actions: {
        //清除登陆信息
        clearUser() {
            this.$patch(state => {
                state.account = '' , //账号
                state.name = '' , //用户名
                state.email = '' , //邮箱
                state.telephone = '' //电话
                // state.isLogin = ''
            })
            localStorage.clear();
        }
    }
})
