<template>
<div class="app-container">
    <el-row :gutter="20">
        <el-col :span="4" v-for="project in projectlist" :key="project">
            <div class="grid-content bg-purple">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="project.img_url" class="image">
                    <div style="padding: 12px;">
                        <span>{{project.name}}</span>
                        <div class="bottom clearfix">
                        <el-button type="text" class="button">编辑</el-button>
                        </div>
                    </div>
                </el-card>
                </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-card :body-style="{ padding: '0px' }" @click.native="dialogVisible = true">
                    <img src="https://file.tapd.cn/img_dist/tcloud/create_project-27c1790576.png" class="image">
                    <div style="padding: 12px;">
                        <span>创建项目</span>
                        <div class="bottom clearfix">
                        <el-button type="text" @click="dialogVisible = true" class="button">创建</el-button>
                        </div>
                    </div>
                </el-card>
                </div>
        </el-col>
</el-row>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="项目名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="项目详情">
    <el-input type="textarea" v-model="form.details"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">创 建</el-button>
  </span>
</el-dialog>
</div>

</template>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
        dialogVisible: false,
        currentDate: new Date(),
        projectlist:[
            {
                "id":1,
                "name":"demo",
                "img_url":"https://file.tapd.cn/img_dist/tcloud/default_homepage_logo-b2f5ba6bc1.png"
            },
            {
                "name":"demo",
                "img_url":"https://file.tapd.cn/img_dist/tcloud/default_homepage_logo-b2f5ba6bc1.png"
            },
            {
                "name":"demo",
                "img_url":"https://file.tapd.cn/img_dist/tcloud/default_homepage_logo-b2f5ba6bc1.png"
            }
        ],
        form:{name: '',details:''}
        };
  },
  methods: {
      onSubmit() {
        console.log('submit!');
      }
  }
}
</script>