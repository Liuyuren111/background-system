<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {defineProps,toRef} from "vue";

const props = defineProps({
  slides: {
    type: Array,
    required:true
  }
})
let slides = toRef(props,'slides')


const timer = ref(null)
let val = ref(0)


const clickItem = (index) => {
  val.value = index
  for (let i = 0; i < slides.value.length; i++) {
    if (slides.value[i].isShow) {
      slides.value[i].isShow = false;
      break;
    }
  }
  slides.value[index].isShow = true
}

let play = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    if (val.value < slides.value.length - 1) {
      val.value++
    } else {
      val.value = 0
    }
    clickItem(val.value)
  }, 3000)
}

onMounted(() => {
  play()
})

onUnmounted(() => {
  clearInterval(timer.value)
})

</script>

<template>
  <div class="banner-main" @mouseout="play">
    
  <img class="LRlogo" src="../assets/image/logo.png">
    <transition-group name="banner">
      <div class="banner-slide" v-show="item.isShow" v-for="item in slides" :key="item.id">
        <div :id=" 'banner' + item.id" class="agileits-banner-info">
          <h3>{{item.h3}}</h3>
					<h4>{{item.h4}}</h4>
        </div>
        <img :src="item.img" alt="">
      </div>
    </transition-group>
    <div class="spot-wrap">
      <div :class="{'spot':true,'active':item.isShow}"
           v-for="(item,index) in slides"
           :key="item.id"
           @click="clickItem(index)"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.LRlogo{
  position: absolute;
  right: 3em;
  top: 3em;
  z-index: 3;
  width: 9em;
}
.banner-main {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  .banner-slide {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .spot-wrap {
    width: auto;
    height: auto;
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 4%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;

    .spot {
      width: 6px;
      height: 6px;
      background-color: #FFFFFF;
      border-radius: 100%;
      margin: 0px 3px;
      cursor: pointer;
      border: 2px solid #FFFFFF;
    }

    .active {
      background: #586cb1;
    }
  }
}

.banner-enter-active,.banner-leave-active{
  transition: opacity 1s;
}
.banner-enter-from,.banner-leave-to{
  opacity: 0;
}
// .agileits-banner-info{
//   z-index: 3;
// }
.agileits-banner-info{
  position: absolute;
  width: 100%;
  z-index: 3;
}
#banner1 h3{
  background: -webkit-linear-gradient(transparent, transparent), url("../assets/image/1a.jpg") repeat 0px 0px;
  -webkit-background-clip: text; // 裁减掉文字以外的背景。效果如下
}
#banner2 h3{
  background: -webkit-linear-gradient(transparent, transparent), url("../assets/image/2a.jpg") repeat 0px 0px;
  -webkit-background-clip: text; // 裁减掉文字以外的背景。效果如下
}
#banner3 h3{
  background: -webkit-linear-gradient(transparent, transparent), url("../assets/image/3a.jpg") repeat 0px 0px;
  -webkit-background-clip: text; // 裁减掉文字以外的背景。效果如下
}
.agileits-banner-info h3{
  color: #4DD0E1;
    font-size: 35em;
    margin: 0;
    line-height: .8em;
    font-weight: 700;
    text-transform: uppercase;
    font-family: '庞门正道标题体';/*'Open Sans', sans-serif;*/
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(transparent, transparent), url("../img/LoginRegister/1a.jpg")repeat 0px 0px;
    background: -o-linear-gradient(transparent, transparent);
    -webkit-background-clip: text;
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.agileits-banner-info h4{
	font-family: '庞门正道标题体';
    color: #FFFFFF;
    font-size: 8em;
    margin: 0;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 10px;
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>