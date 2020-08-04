<template>
<div class="app-container">
    <el-row :gutter="20">
        <el-col :span="4" v-for="(project,i) in projectlist" :key="project">
            <div class="grid-content bg-purple">
                <el-card :body-style="{ padding: '0px' }">
                  <router-link :to="{path:'/project/details',query: {_id: project._id}}">
                    <img :src="project.img_url" class="image" @click="openProjectDetails(project)" >
                     </router-link>
                    <div style="padding: 12px;">
                        <span>{{project.name}}</span>
                        <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="editProject(project,i)">编辑</el-button>
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
    <el-form-item label="项目id" hidden="true">
    <el-input v-model="form._id"></el-input>
  </el-form-item>
  <el-form-item label="项目名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="项目详情">
    <el-input type="textarea"  :rows="4" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item label="项目图片">

      <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8000/image/upload"
          :show-file-list="false"
          v-model="form.imageId"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>


  </el-form-item>



  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="creatProject">提 交</el-button>
  </span>
</el-dialog>
</div>

</template>


<script>
import { projectAdd,getProjectList } from "@/api/project";

export default {
  data() {
    return {
        dialogVisible: false,
        imagecropperKey: 0,
        imageUrl: '',
        upload_url:"http://127.0.0.1:8000/image/upload",
        currentDate: new Date(),
        projectlist:this.getProjectListData(),
        form:{_id:"", name: '',description:'',imageId:''},
        editIndex:-1,
        _id:"ff"
        };
  },
  methods: {
      creatProject(){
 
        projectAdd(this.form).then(response => {
            this.$message({
                message: response,
                type: 'success'
              });
            console.log(response);
            if(this.form._id==""){
                this.projectlist.push(response.data);
                }
            else{
              this.projectlist[this.editIndex] = response.data
            };
            this.dialogVisible = false;
          });
          

      },
      getProjectListData(){
        getProjectList().then(response =>{
          this.projectlist = response.data
        }
        );
      },
      handleAvatarSuccess(resData) {
        console.log(resData);
        this.form.imageId = resData.data._id
        this.imageUrl = "http://127.0.0.1:8000/image/load?image_id="+resData.data._id
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传项目图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传项目图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleClose(){

      },
      editProject(project,i){
        console.log(project);
        this.dialogVisible = true;
        this.imageUrl = project.img_url;
        this.form = project;
        this.editIndex = i
      },
      openProjectDetails(project){
        console.log(project);

      }
  }
}
</script>


<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
    height: 200px;
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
