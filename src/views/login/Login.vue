<script setup>
import Banner from '../../components/Banner.vue'
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "@/hooks/useRequest";
import { useMessage } from '@/hooks/useMessage';
import { useCookie } from '@/hooks/useCookie';
import img1 from "../../assets/image/1.jpg";
import img2 from "../../assets/image/2.jpg";
import img3 from "../../assets/image/3.jpg";
import { useUserState } from '@/store/user.js'
import { View } from '@element-plus/icons-vue'


const userState = useUserState()
const { removeCookie, setCookie, getCookie } = useCookie()
const { success, error } = useMessage()
const { request } = useRequest()
const router = useRouter();
// const route = useRoute();
// console.log(JSON.parse(route.params.arr1))
// console.log(JSON.parse(route.params.arr2))
const active1 = ref(false)
const active2 = ref(false)
const active3 = ref(false)
const isActive = ref(false)
const slides = ref([
  { id: 1, img: img1, h3: 'V', h4: 'Visual', isShow: true },
  { id: 2, img: img2, h3: 'D', h4: 'Data', isShow: false },
  { id: 3, img: img3, h3: 'C', h4: 'Center', isShow: false }
])
const options = ref([
  { value: '北京邮电大学', label: '北京邮电大学' },
  { value: '北京邮电大学世纪学院', label: '北京邮电大学世纪学院' },
  { value: '滨州学院', label: '滨州学院' },
  { value: '渤海大学', label: '渤海大学' },
  { value: '沧州师范大学', label: '沧州师范大学' },
  { value: '产品支持', label: '产品支持' },
  { value: '长春财经学院', label: '长春财经学院' },
  { value: '长春大学', label: '长春大学' },
  { value: '东北财经大学', label: '东北财经大学' },
])
const ruleForm = ref('')
const form = ref({
  unit: '',
  username: '',
  password: '',
  checkbox: false
})
//表单校验
const rules = reactive({
  unit: [
    { required: true, message: '请选择单位', trigger: 'change', }
  ],
  username: [
    { required: true, message: '请输入账号！', trigger: 'blur', },
  ],
  password: [
    { required: true, message: '请填写密码！', trigger: 'blur', },
  ]
})


const goRegister = () => {
  router.push({ name: 'reg' })
}
//登录
const handleLogin = (ruleForm) => {
  ruleForm.validate(async (e) => {
    if (!e) return;
    if (e) {
      const res = await request('/login/', 'post', {
        school: form.value.unit,
        account: form.value.username,
        password: form.value.password
      })
      if (res) {
        console.log(res)
        if (res.msg === '登录成功') {
          userState.$patch(state => {
            state.unit = res.school, //单位(学校)
              state.account = res.account, //账号
              state.name = res.name, //用户名
              state.email = res.email, //邮箱
              state.telephone = res.telephone, //电话
              state.isLogin = true
            localStorage['unit'] = state.unit
            localStorage['account'] = state.account
            localStorage['name'] = state.name
            localStorage['email'] = state.email
            localStorage['telephone'] = state.telephone
            sessionStorage['isLogin'] = state.isLogin
          })
          setCookieData()
          success('登录成功')
          router.push({ name: 'home' })
        } else {
          error('账号或密码不对,请重新输入')
          return;
        }
      }
    }
  })
}
//设置cookie
const setCookieData = () => {
  if (form.value.checkbox) {
    setCookie(form.value)
  } else {
    removeCookie()
  }
}
//获取cookie
const getCookieData = () => {
  getCookie(form.value, 'checkbox', 'unit', 'username', 'password')
}
//获取选择的单位
const handleChange = (val) => {
  form.value.unit = val
}
//获取焦点
const setFocus = (num) => {
  switch (num) {
    case 1:
      active1.value = true
      break;
    case 2:
      active2.value = true
      break;
    case 3:
      active3.value = true
      break;
  }
}
//失去焦点
const getBlur = (num) => {
  switch (num) {
    case 1:
      active1.value = false
      break;
    case 2:
      active2.value = false
      break;
    case 3:
      active3.value = false
      break;
  }
}
//checkbox
const handleCheckBox = (val) => {
  form.value.checkbox = val
}
const handleMousedown = () =>{
  isActive.value = true
}
const handleMouseup = () =>{
  isActive.value = false
}
onMounted(() => {
  getCookieData()
})
</script>

<template>
  <el-container class="fullscreen">
    <el-aside width="30%">
      <div class="LRtopArea">
        <div class="titleE">VDC</div>
        <div class="titleC">财务大数据科研平台</div>
        <div>Financial big data research platform</div>
      </div>
      <div class="LRForm">
        <el-form
          class="demo-ruleForm"
          label-position="top"
          label-width="100px"
          :model="form"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="unit">
            <label class="name">单位</label>
            <!-- <div class="input_ico_position">
              <i class="iconfont icon-danwei"></i>
            </div>-->
            <el-select
              @focus="setFocus(1)"
              @blur="getBlur(1)"
              v-model="form.unit"
              filterable
              placeholder="选择单位"
              @change="handleChange"
            >
              <template #prefix>
                <i class="iconfont icon-danwei"></i>
              </template>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="username">
            <label class="name">账号</label>
            <!-- <div class="input_ico_position">
              <i class="iconfont icon-zhanghao"></i>
            </div>-->
            <el-input
              @focus="setFocus(2)"
              @blur="getBlur(2)"
              v-model="form.username"
              placeholder="请填写账号"
            >
              <template #prefix>
                <i class="iconfont icon-zhanghao"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <label class="name">密码</label>
            <!-- <div class="input_ico_position">
              <i class="iconfont icon-mima"></i>
            </div>-->
            <el-input
              :type="isActive?'text':'password'"
              @focus="setFocus(3)"
              @blur="getBlur(3)"
              v-model="form.password"
              placeholder="请填写密码"
            >
              <template #prefix>
                <i class="iconfont icon-mima"></i>
              </template>
              <template #suffix>
                <el-icon class="el-icon--right" @mousedown="handleMousedown" @mouseup="handleMouseup"><View /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              @change="handleCheckBox"
              v-model="form.checkbox"
              label="Remember me"
              name="type"
            ></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="btn btn-primary w100" @click="handleLogin(ruleForm)">Login</el-button>
          </el-form-item>
        </el-form>
        <div class="register txt-right" @click="goRegister">还没账号？立即注册</div>
      </div>
    </el-aside>
    <el-main>
      <Banner :slides="slides"></Banner>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/viriables.scss";

.register {
  user-select: none;
  text-decoration: underline;
  color: $hightlight-fontColor;
  font-size: 1em;
  cursor: pointer;
}

:deep(.el-form-item__error) {
  top: 8px;
  left: 3em;
}
</style>
