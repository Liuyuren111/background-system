<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header-left">
          <div class="logo _link" @click="routerPush('board')">
            <img src="@/assets/image/logoTop.png" alt="">
          </div>
          <div>
            <el-button color="#586CB1" class="iconfont icon-caidan" :style="{ color: '#FFF' }" @click="iconClick"></el-button>
          </div>
        </div>
        <div class="header-right">
          <el-menu class="_el-menu" mode="horizontal" :ellipsis="false">
            <el-sub-menu v-for="(item,index) in menu_data" :key="index" :index="''+index" :popper-append-to-body="false">
              <template #title>{{item.name}}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="index+'-'+index2" @click="clickHeaderChild(item2)">{{item2.name}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
            <el-sub-menu index="1">
              <template #title>
                <i
                    class="iconfont icon-yonghu"
                    style="
                                    color: #c4c4c4;
                                    margin: 0 .3em 0 2em;
                                  "
                ></i>
                <span style="color: #7f7f7f">username</span>
              </template>
              <el-menu-item index="2-1" @click="handleUpdate" style="font-size:12px;">
                <i class="iconfont icon-shezhitianchong mr05"></i> Setting
              </el-menu-item>
              <el-menu-item index="2-2" @click="handleQuit" style="font-size:12px;">
                <i class="iconfont icon-tuichu mr05"></i> Logout
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-header>
      <el-container class="content">
        <el-aside :width="is_collapse?'90px':'280px'">
            <el-menu :default-active="default_active" :ellipsis="false" :collapse="is_collapse" :class="{
                        'is-collapse':is_collapse
                    }">
              <template v-for="(item,index) in aside_menu_data" :key="index">
                <el-sub-menu v-if="item.children&&item.children.length" :index="''+index" :popper-append-to-body="false">
                  <template #title>
                    <i :class="[item.icon,{
                                        isIconFont:is_collapse,
                                    }]"></i>
                    <span>&nbsp;{{item.name}}</span>
                  </template>
                  <template v-for="(item2,index2) in item.children" :key="index2">
                    <el-sub-menu v-if="item2.children&&item2.children.length" :index="index+'-'+index2" :popper-append-to-body="false">
                      <template #title>
                        <i :class="[item2.icon,{
                                                isIconFont:is_collapse`,`
                                            }]"></i>
                        <span>&nbsp;{{item2.name}}</span>
                      </template>
                      <el-menu-item v-for="(item3,index3) in item2.children" :key="index3" :index="index+'-'+index2+'-'+index3" @click="clickHeaderChild(item3)">{{item3.name}}</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="index+'-'+index2" @click="clickHeaderChild(item2)">
                      <i :class="[item2.icon,{
                                            isIconFont:is_collapse,
                                        }]"></i>
                      <span>&nbsp;{{item2.name}}</span>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                <el-menu-item v-else :index="''+index" @click="clickHeaderChild(item)">
                  <i :class="[item.icon,{
                                    isIconFont:is_collapse,
                                }]"></i>
                  <span>&nbsp;{{item.name}}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-aside>
        <el-main>
          <div class="content__header">
            <div class="content__header__title">
              {{ $route.matched[1]&&$route.matched[1].meta.title }}
            </div>
            <div>
                            <span class="_link home" @click="routerPush('custom')">
                                <i class="iconfont icon-home"></i>&nbsp;Home
                            </span> &nbsp;/&nbsp;
              <span>{{ $route.matched[1]&&$route.matched[1].meta.title }}</span>
            </div>
          </div>
          <router-view></router-view>
          <el-footer>
            <div className="txt-center">
              <strong>Copyright</strong> &copy; 2021.&nbsp;
              <a href="http://www.yuekekeji.com" target="_blank">
                yuekekeji
              </a>&nbsp; All rights reserved.
            </div>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import menuList from "@/config/data/menuData";

import {useRoute} from 'vue-router'
import router from "@/router";

const route = useRoute()

const is_collapse = ref(false);
const menu_data = ref(menuList)
const aside_menu_data = ref(menuList[0].children)
const default_active = ref('')

function routerPush(name, data) {
  router.push({
    name: name,
    params: data
  });
}

const iconClick = () =>{
  is_collapse.value = !is_collapse.value;
}

const clickHeaderChild = (item) =>{
  const asideDefActive = item.path || item.children[0].path || item.children[0].children[0].path;
  routerPush(asideDefActive, {})
}
const handleUpdate = () =>{

}
const handleQuit = () =>{

}
const asideMenuDataRe = () =>{
  for (let i = 0; i < menu_data.value.length; i++) {
    // v_1 一级数据对象 {name: '数据爬取', subActive: '0', children: []}
    let v_1 = menu_data.value[i]
    // console.log('v_1',{...v_1});
    for (let j = 0; j < v_1.children.length; j++) {
      const test = ref(false)
      // v_2 每个一级数据对象children属性里的对象 {name: '定制爬取', path: 'custom', index: '0', icon: 'iconfont icon-jixiaofenxi'}
      let v_2 = v_1.children[j]
      if(v_2.path === route.name){
        aside_menu_data.value = v_1.children
        // console.log(j)
        default_active.value = j + ""
        test.value = true
      }
      // if()
      if(v_2.children){
        for (let k = 0; k < v_2.children.length; k++) {
          // console.log(k);
          let v_3 = v_2.children[k]
          if(v_3.path === route.name){
            aside_menu_data.value = v_1.children
            default_active.value = j + "-" + k
            test.value = true
          }
          if(v_3.children) {
            for (let l = 0; l < v_3.children; l++) {
              let v_4 = v_3.children[l]
              if(v_4.path === route.name){
                aside_menu_data.value = v_1.children
                // console.log("v_1", { ...v_1 })
                // console.log("v_2", { ...v_2 })
                default_active.value = j + "-" + k + "-" + l
                test.value = true
              }
            }
          }
        }
      }
      if(test.value){
        return
      }
    }
  }
}
watchEffect(() =>{
  if(route.name){
    asideMenuDataRe()
  }
})
</script>

<style lang="scss" scoped>
.home {
  .el-header {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
      width: 22.5em;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        font-size: 16px;
        font-weight: bold;
        color: #586CB1;
      }
    }
    .header-right {
      display: flex;
      .el-menu {
        .is-active .el-sub-menu__title {
          color: #4b4b4b;
          font-size: 14px;
          border-bottom: none;
        }
        .el-sub-menu.is-active .el-sub-menu__title {
          border-bottom-color: none;
        }
        .el-sub-menu .el-sub-menu__title {
          padding: 0 10px;
          border-bottom: 0px
        }
        .el-sub-menu__title {
          transition: none;
        }
      }
      .user {
        margin-left: 32px;
        .icon-yonghu {
          color: #c4c4c4;
        }
      }
    }
  }
  .content{
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .el-aside{
      -webkit-transition: all .3s ease-in-out;
      -moz-transition: all .3s ease-in-out;
      -ms-transition: all .3s ease-in-out;
      -o-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out;
      padding-bottom: 60px;
      background: #fff;
      .el-menu{
        border-right: none;
        width: 100%;
        .is-collapse {
          .el-sub-menu__title {
            justify-content: center;
          }
          .el-menu-item {
            justify-content: center;
          }
        }
        .el-popper {
          display: none;
        }
      }
    }
    .el-main {
      padding: 3.3em 3em 0 3em;
      box-sizing: border-box;
      background-color: #eff1f7;
      .content__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2em;
        &__title {
          font-size: 1.5em;
          color: #4b4b4b;
          font-weight: 600;
        }
        ._link {
          color: rgb(88, 108, 177);
        }
      } // 表格上面的查询
      .table_header_search {
        display: inline-block;
        .el-input__inner {
          height: 2.6em;
        }
      }
    }
    .el-footer {
      margin-top: 65px;
      .txt-center{
        text-align: center;
      }
    }
  }

}
</style>
