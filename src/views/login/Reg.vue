<script setup>
import Banner from "../../components/Banner.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "../../hooks/useRequest";
import { useMessage } from "../../hooks/useMessage";
import { View } from "@element-plus/icons-vue";

const { success, error } = useMessage();
const { request } = useRequest();
const router = useRouter();
import img1 from "../../assets/image/1.jpg";
import img2 from "../../assets/image/2.jpg";
import img3 from "../../assets/image/3.jpg";

const ruleForm = ref("");
const slides = ref([
  { id: 1, img: img1, h3: "V", h4: "Visual", isShow: true },
  { id: 2, img: img2, h3: "D", h4: "Data", isShow: false },
  { id: 3, img: img3, h3: "C", h4: "Center", isShow: false },
]);

const isActive1 = ref(false);
const isActive2 = ref(false);
const form = ref({
  unit: "",
  account: "", //账号
  username: "", //姓名
  password: "", //密码
  confirm: "", //确认密码
  email: "", //邮箱
  phone: "", //电话号码
});
const options = reactive({
  arr: [
    { value: "北京邮电大学", label: "北京邮电大学" },
    { value: "北京邮电大学世纪学院", label: "北京邮电大学世纪学院" },
    { value: "滨州学院", label: "滨州学院" },
    { value: "渤海大学", label: "渤海大学" },
    { value: "沧州师范大学", label: "沧州师范大学" },
    { value: "产品支持", label: "产品支持" },
    { value: "长春财经学院", label: "长春财经学院" },
    { value: "长春大学", label: "长春大学" },
    { value: "东北财经大学", label: "东北财经大学" },
  ],
});

//确认密码验证
const validateMobilePass = (rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error("密码输入不匹配"));
  } else {
    callback();
  }
};
//手机号验证
const validateMobilePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号不可为空"));
  } else {
    if (value !== "") {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的手机号码"));
      }
    }
    callback();
  }
};
//邮箱验证
const checkEmail = (rule, value, callback) => {
  if (value) {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (mailReg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的邮箱格式"));
    }
  } else {
    callback();
  }
};

const rules = reactive({
  unit: [{ required: true, message: "请选择单位", trigger: "change" }],
  account: [{ required: true, message: "请填写账号！", trigger: "blur" }],
  username: [{ required: true, message: "请填写姓名！", trigger: "blur" }],
  password: [{ required: true, message: "请填写密码！", trigger: "blur" }],
  confirm: [
    { required: true, message: "请确认密码！", trigger: "blur" },
    { validator: validateMobilePass, trigger: "blur" },
  ],
  email: [{ validator: checkEmail, trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { validator: validateMobilePhone, trigger: "blur" },
  ],
});

//获取单位
const handleChange = (val) => {
  form.value.unit = val;
};

//注册
const handleReg = (formDOM) => {
  formDOM.validate(async (e) => {
    if (!e) return;
    if (e) {
      const res = await request("/register/", "post", {
        school: form.value.unit, //学校
        account: form.value.account, //账号
        name: form.value.username, //用户名
        password: form.value.password, //密码
        email: form.value.email, //邮箱
        telephone: form.value.phone, //电话号码
      });
      console.log(res);
      if (res.msg === "注册成功") {
        success(res.msg);
        router.replace({ name: "login" });
      } else {
        error(res.msg);
        return;
      }
    }
  });
};
//取消
const handleReset = () => {
  form.value.account = "";
  form.value.username = "";
  form.value.password = "";
  form.value.confirm = "";
  form.value.email = "";
  form.value.phone = "";
};

const handleMousedown1 = () => {
  isActive1.value = true;
};
const handleMouseup1 = () => {
  isActive1.value = false;
};
const handleMousedown2 = () => {
  isActive2.value = true;
};
const handleMouseup2 = () => {
  isActive2.value = false;
};
</script>

<template>
  <el-container class="fullscreen">
    <el-aside width="30%">
      <div class="LRtopArea">
        <div class="titleC txt-center">注册账号</div>
      </div>
      <div class="LRForm">
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          label-width="7.8em"
          class="demo-ruleForm"
        >
          <el-form-item label="单位" prop="unit">
            <!-- <div class="input_ico_position">
              <i class="iconfont icon-danwei"></i>
            </div>-->
            <el-select
              v-model="form.unit"
              filterable
              placeholder="请选择单位"
              @change="handleChange"
              clear-icon
            >
              <template #prefix>
                <i class="iconfont icon-danwei"></i>
              </template>
              <el-option
                v-for="item in options.arr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="formNote">
              <i class="iconfont">&#xe600;</i>注：没有单位选项，无法注册账号！
            </div>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <div class="input_ico_position">
              <i class="iconfont icon-zhanghao"></i>
            </div>
            <el-input
              v-model="form.account"
              placeholder="请填写账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <div class="input_ico_position">
              <i class="iconfont icon-zhanghao"></i>
            </div>
            <el-input
              v-model="form.username"
              placeholder="请填写姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <div class="input_ico_position">
              <i class="iconfont icon-mima"></i>
            </div>
            <el-input
              :type="isActive1 ? 'text' : 'password'"
              v-model="form.password"
              placeholder="请填写密码"
            >
              <template #suffix>
                <el-icon
                  class="el-icon--right"
                  @mousedown="handleMousedown1"
                  @mouseup="handleMouseup1"
                  ><View
                /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <div class="input_ico_position">
              <i class="iconfont icon-mima"></i>
            </div>
            <el-input
              :type="isActive2 ? 'text' : 'password'"
              v-model="form.confirm"
              placeholder="请填写密码"
            >
              <template #suffix>
                <el-icon
                  class="el-icon--right"
                  @mousedown="handleMousedown2"
                  @mouseup="handleMouseup2"
                  ><View
                /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <div class="input_ico_position">
              <i class="iconfont icon-youxiang"></i>
            </div>
            <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <div class="input_ico_position">
              <i class="iconfont icon-shoujihao"></i>
            </div>
            <el-input
              type="number"
              v-model="form.phone"
              placeholder="请填写手机号"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="fr">
          <el-button class="btn btn-primary" @click="handleReg(ruleForm)"
            >注册</el-button
          >
          <el-button class="btn btn-white" @click="handleReset">取消</el-button>
        </div>
      </div>
    </el-aside>
    <el-main>
      <Banner :slides="slides"></Banner>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__error) {
  top: -1.8em;
}
</style>
