<script setup>
// f12 测试效果 原因：高度不够
import {nextTick, onMounted, ref} from "vue";

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
</script>

<template>
  <div class="back"></div>
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
  background-image: url("assets/image/2a.jpg");
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
</style>