<script setup>
// f12 测试效果 原因：高度不够
import {nextTick, onMounted, ref} from "vue";
import {useMessage} from "@/hooks/useMessage";

const {success,error} = useMessage()
const data_data = ref({
  a: 1022,
  b: 539,
  c: 5000,
  d: 82,
})
const data_show = ref({
  a: 0,
  b: 0,
  c: 0,
  d: 0,
})
const data_init = ref(false)
const data_offsetTop = ref(0)
const data_offsetHeight = ref(0)
const ref_data = ref(null)
function dataInitFun() {
  data_data,
      data_show
  var time = 1000
  var frame = 1000 / 60
  var frame_count = Math.ceil(time / frame)
  var now_count = 1
  var dsq = setInterval(() => {
    if (now_count >= frame_count) {
      data_show.value = data_data.value
      clearInterval(dsq)
      return
    }
    data_show.value = {
      a: Math.round(data_data.value.a * now_count / frame_count),
      b: Math.round(data_data.value.b * now_count / frame_count),
      c: Math.round(data_data.value.c * now_count / frame_count),
      d: Math.round(data_data.value.d * now_count / frame_count),
    }
    now_count++
  }, frame)
}
onMounted(() =>{
  nextTick(() => {
    data_offsetTop.value = ref_data.value.offsetTop
    data_offsetHeight.value = ref_data.value.offsetHeight
  })
  window.onscroll = function() {
    if (window.pageYOffset + window.innerHeight > data_offsetTop.value + data_offsetHeight.value && !data_init.value) {
      data_init.value = true
      dataInitFun()
    }
  }
})
function handleSuccess() {
  success('成功提示')
}
function handleError() {
  error('失败提示')
}
</script>

<template>
  <el-button @click="handleSuccess">成功</el-button>
  <el-button @click="handleError">失败</el-button>
  <div class="back"></div>
  <div class="visualization">
    <div class="wrap">
      <div class="title">可视化报表</div>
      <!-- <el-carousel :interval="4000" type="card" height="390px"> -->
      <el-carousel :autoplay="false" type="card" height="390px">
        <el-carousel-item>
          <div class="item">
            <div class="l">
              <div class="item-title">报表大数据</div>
              <div class="info">
                一是上市公司（含三板）披露的报表数据，包含合并报表、母公司报表，年报和季报，港股月报；
                <br> 二是所有债券发行主体公司的报表数据；
                <br> 三是所有在中国境内注册成立的公司在国家工信部信用管理系统中可以公开查询的部分报表信息。
              </div>
            </div>
            <img src="@/assets/image/board/pic-1.png" alt="">
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="item">
            <div class="l">
              <div class="item-title">财经字典应用</div>
              <div class="info">
                通过财经字典，提取财经领域本体的特征信息，平台已经构建了包含重大风险关注、董监高异议声明、经营模式、业绩驱动因素、核心竞争力、行业发展现状、行业发展阶段、目标成本控制、会计政策变更、会计师事务所更换、存货发出、存货盘存、材料摊销、存货净值确定等150多个子字典体系。
              </div>
            </div>
            <img src="@/assets/image/board/pic-2.png" alt="">
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="item">
            <div class="l">
              <div class="item-title">财经数据可视化</div>
              <div class="info">
                结构化财经数据的可视化报表体系，包含存货、固定资产、无形资产等会计可视报表；宏观分析、行业分析、财务分析、投融资分析等财务分析可视报表；战略分析、前景分析、事件分析、股票投资等财务决策可视报表；财务舞弊、关键审计事项等审计内控可视报表。
              </div>
            </div>
            <img src="@/assets/image/board/pic-3.png" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div class="data" ref="ref_data">
    <div class="wrap">
      <div class="title">平台数据统计</div>
      <div class="list">
        <div class="item">
          <div class="num">{{data_show.a}}</div>
          <div class="name">爬取数据量</div>
        </div>
        <div class="item">
          <div class="num">{{data_show.b}}</div>
          <div class="name">检索频次</div>
        </div>
        <div class="item">
          <div class="num">{{data_show.c}}+</div>
          <div class="name">全国用户量</div>
        </div>
        <div class="item">
          <div class="num">{{data_show.d}}%</div>
          <div class="name">方案利用率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.back{
  height: 1200px;
}
.data {
  height: 400px;
  background-image: url("../assets/image/2a.jpg");
  background-position: center center;
  background-size: cover;
  color: #fff;
  .title {
    padding-top: 65px;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }
  .list {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
    .num {
      font-size: 44px;
    }
    .name {
      font-size: 16px;
      color: #fff;
    }
  }
}
.visualization {
  background: #eff1f7;
  padding: 60px 0 100px;
  .title {
    font-weight: bold;
    font-size: 26px;
    text-align: center;
  }
  .el-carousel {
    margin-top: 50px;
    .el-carousel__item {
      box-shadow: 0px 2px 23.52px 0.48px rgba(226, 230, 234, 0.57);
      background: #fff;
    }
    .el-carousel__indicators {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 25px;
      .el-carousel__indicator {
        padding: 0;
        .el-carousel__button {
          width: 14px;
          height: 14px;
          border: 1px solid #2f6ed5;
          background: #fff;
          border-radius: 8px;
          margin: 0 5px;
          opacity: 1;
          -webkit-transition: all .3s ease-in-out;
          -moz-transition: all .3s ease-in-out;
          -ms-transition: all .3s ease-in-out;
          -o-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
        }
        &.is-active {
          .el-carousel__button {
            width: 30px;
            background: #2f6ed5;
            border: 1px solid #fff;
          }
        }
      }
    }
  }
  .item {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    padding: 30px 30px;
    box-sizing: border-box;
    .l {
      flex-grow: 1;
      align-self: flex-start;
      margin-right: 30px;
      .item-title {
        margin-top: 33px;
        font-size: 18px;
      }
      .info {
        margin-top: 45px;
        font-size: 14px;
        line-height: 20px;
        color: #767C8D;
        overflow: hidden;
        white-space: initial;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
      }
    }
    img {
      width: 270px;
      height: 270px+30;
      object-fit: cover;
      flex-shrink: 0;
    }
  }
}
</style>