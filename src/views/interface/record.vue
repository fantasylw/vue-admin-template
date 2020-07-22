<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="5">
        <sticky :sticky-top="10">
          <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
        </sticky>
        <sticky :sticky-top="80">
          <div class="grid-content bg-purple" style="height:820px;">
            <el-scrollbar id="scrollbar-tree" style="height:100%;">
              <el-tree
                ref="tree2"
                :data="data2"
                :props="defaultProps"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                class="filter-tree"
                default-expand-all
              />
            </el-scrollbar>
          </div>
        </sticky>
      </el-col>
      <el-col :xs="3" :sm="3" :md="4" :lg="4" :xl="4">
        <div class="block" style="height:820px;">
          <el-scrollbar id="scrollbar-tree" style="height:100%;">
            <el-timeline v-for="item in timelines" :key="item">
              <el-timeline-item :timestamp="item.createdAt" placement="top">
                <el-card shadow="hover" @click.native="showTimeLine(item)">
                  <el-tag type="info">{{item.msg}}</el-tag>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :xs="3" :sm="4" :md="5" :lg="5" :xl="14">
        <sticky :sticky-top="10">
          <el-tabs type="border-card">
            <el-tab-pane label="差异">
              <div class="block" style="height:820px;">
               <el-scrollbar style="height:100%;">
              <code-diff
                :old-string="oldStr"
                :new-string="newStr"
                :outputFormat="outputFormat"
                :context="100"
              ></code-diff>
              </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理"></el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
        </sticky>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Sticky from "@/components/Sticky";
import CodeDiff from "vue-code-diff";
import { getHost } from "@/api/record";
import { getApiDoc, getApiDocTimeLines } from "@/api/api";
export default {
  components: { CodeDiff, Sticky},
  data() {
    return {
      filterText: "",
      data2: this.demo(),
      defaultProps: {
        children: "children",
        label: "label"
      },
      oldStr: "old code",
      newStr: "new code",
      timelines: [],
      apidoc: {},
      outputFormat:"side-by-side"
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    demo() {
      getHost("").then(response => {
        this.data2 = response.data;
      });
    },
    handleNodeClick(data) {
      if (data.children.length == 0) {
        getApiDoc(data.id).then(response => {
          this.apidoc = response.data;
          getApiDocTimeLines(this.apidoc._id).then(response => {
            this.timelines = response.data;
          });
        });
      }
    },
    showTimeLine(item) {
      console.log(item);
      this.oldStr = JSON.stringify(item.source, null, 4)
      if(item.target != null){
         this.newStr = JSON.stringify(item.target, null, 4)
      }
      else{

      }
      
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

