<script setup>
import {useRequest} from "@/hooks/useRequest"
import {computed, onMounted, ref} from "vue";

const {request} = useRequest()
const form = ref({
  searchtext: ""
})
const tableData = ref([])
const currentPage = ref(1)
//初始化数据
const getInitData = async () => {
  const res = await request("/selPC/", "post", {
    school: '产品支持',
    account: '001',
    name: '001'
    // school: userState.unit,
    // account: userState.account,
    // name: userState.name
  });
  if (res.length > 0) {
    console.log(res,'初始化表格数据');
    tableData.value = res
    // total.value = res.length
  }
}
// 查询
const dataSearch = async () =>{
  let data = {
    school: '产品支持',
    account: '001',
    name: '001',
    searchtext: form.value.searchtext
  }
 const res = await request('/PCsearch','post',data)
  console.log(res);
}
const tableDataPage = computed(() => {
  return tableData.value.slice((currentPage.value - 1) * 10, currentPage.value * 10)
})
// 重置
const reSearch= () =>{

}
onMounted(() =>{
  getInitData()
})
</script>
<template>
  <div class="planManage">
    <el-card class="_el-card" shadow="always">
      <el-form inline :model="form">
        <el-form-item>
          <el-input v-model="form.searchtext" clearable placeholder="方案名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" @click="dataSearch">查询</el-button>
            <el-button @click="reSearch">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
      <el-table :data="tableDataPage" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <div class="table-expand">
              <div v-if="scope.row.PlanIntroduction">
                <span class="title">方案描述：</span><span class="name">{{scope.row.PlanIntroduction}}</span>
              </div>
              <div v-if="scope.row.first">
                <span class="title">一级类别：</span><span class="name">{{scope.row.first}}</span>
              </div>
              <div v-if="scope.row.second">
                <span class="title">二级类别：</span><span class="name">{{scope.row.second}}</span>
              </div>
              <div v-if="scope.row.third">
                <span class="title">所选分类：</span><span class="name">{{scope.row.third}}</span>
              </div>
              <div v-if="scope.row.PlanHY">
                <span class="title">行业：</span><span class="name">{{scope.row.PlanHY}}</span>
              </div>
              <div v-if="scope.row.PlanDQ">
                <span class="title">地区：</span><span class="name">{{scope.row.PlanDQ}}</span>
              </div>
              <div v-if="scope.row.PlanBK">
                <span class="title">板块：</span><span class="name">{{scope.row.PlanBK}}</span>
              </div>
              <div v-if="scope.row.PlanZT">
                <span class="title">主题：</span><span class="name">{{scope.row.PlanZT}}</span>
              </div>
              <div v-if="scope.row.PlanRD">
                <span class="title">热点：</span><span class="name">{{scope.row.PlanRD}}</span>
              </div>
              <div v-if="scope.row.PlanKJSX">
                <span class="title">会计属性：</span><span class="name">{{scope.row.PlanKJSX}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="PlanName" label="方案名称" />
        <el-table-column prop="PlanIntroduction" label="方案描述" />
        <el-table-column prop="PlanTime" label="查询范围" />
        <!-- <el-table-column align="center" prop="PlanTime" label="分析对象" /> -->
        <!-- <el-table-column prop="PlanVisit" label="访问" /> -->
        <!-- <el-table-column prop="PlanCollect" label="收藏" /> -->
        <el-table-column label="操作" align="right" width="320">
          <template #default="scope">
            <el-button-group>
              <el-button type="primary" @click="routerPush('customCrawl',{
                                type: 'plan_id',
                                PlanID: scope.row.PlanID,
                                data: JSON.stringify(scope.row),
                            })">应用</el-button>
              <!--                             <el-button @click="companySee(scope.row)">分析对象</el-button>-->
              <!-- <el-button type="info" disabled>分享</el-button> -->
              <el-popconfirm title="是否删除此方案?" @confirm="delFun(scope.row)">
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="_pagination-box m-t">
        <div class="p-b-l"></div>
        <div class="p-b-r">
          <el-pagination v-model:currentPage="currentPage" :total="tableData.length" background hide-on-single-page layout="total, prev, pager, next"></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>