<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
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
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <Sticky :sticky-top="10">
        <div class="block" style="height:820px;">
          <el-scrollbar id="scrollbar-tree" style="height:100%;">
            <el-timeline v-for="item in timelines" :key="item">
              <el-timeline-item :timestamp="item.createdAt" placement="top">
                <el-card shadow="hover" @click.native="showTimeLine(item)">
                  {{item.msg}}
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </div>
        </Sticky>
      </el-col>
      <el-col :xs="15" :sm="15" :md="16" :lg="16" :xl="17">
        <el-card>
          <span>JsonSchema</span>
          <el-collapse v-model="activeNames" v-for="diff in diffCollapse" :key="diff" @change="handleChange">
            <el-collapse-item :title="diff.name" name="1">
               <div>
                  <el-row>
                    <el-col :span="12">当前版本</el-col>
                    <el-col :span="12">上一版本</el-col>
                  </el-row>
                  <el-row>
                    <iframe :src="diff.url" style="height:430px;width:100%"></iframe>
                  </el-row>
                  <el-row>
                      <el-button type="success">正确</el-button>
                      <el-button type="danger">错误</el-button>
                      <el-button type="primary">校验</el-button>
                    </el-row>
              </div>
              
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Sticky from "@/components/Sticky";
import JsonDiff from "@/components/JsonDiff";
import { getHost } from "@/api/record";
import { getApiDoc, getApiDocTimeLines } from "@/api/api";
export default {
  components: { Sticky,JsonDiff},
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
      outputFormat:"side-by-side",
      timelineUrl:null,
      diffCollapse:[],
      activeNames:['1']
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
      this.diffCollapse = []
        this.diffCollapse.push({"name":"query_schema","url":'http://127.0.0.1:8000/jsondiff/'+item._id+"?f=query_schema"})
        this.diffCollapse.push({"name":"request_schema","url":'http://127.0.0.1:8000/jsondiff/'+item._id+"?f=request_schema"})
        this.diffCollapse.push({"name":"reponse_schema","url":'http://127.0.0.1:8000/jsondiff/'+item._id+"?f=reponse_schema"})
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

