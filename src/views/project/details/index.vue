<template>
<div>
    <el-row :gutter="20">
    <el-card>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <img :src="project.img_url" class="image">
            </div>
        </el-col>
        <el-col :span="8">
                <el-form ref="form" :model="project" label-width="120px">
                <el-form-item label="项目名称">
                <el-input
                    label="项目名称"
                    type="text"
                    placeholder="请输入内容"
                    readonly="true"
                    v-model="project.name"
                    maxlength="10"
                    show-word-limit
                    >
                </el-input>
                </el-form-item>
                <el-form-item label="项目详情">
                    <el-input 
                    type="textarea"
                    readonly="true"
                    :rows="4"
                    v-model="project.description"
                    axlength="200"
                    show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="key">
                    <el-input 
                    type="text"
                    readonly="true"
                    v-model="project.key"
                    axlength="10"
                    show-word-limit></el-input>
                </el-form-item>

                </el-form>
            </el-col>

        
    </el-card>
    </el-row>
    <el-row :gutter="20">
        
        <el-col :span="8">
            <el-card>
              <span>基础数据</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="btnCreated">添加+</el-button>
              <el-table :data="project.baseMetaData">
                  <el-table-column
                      prop="key"
                      label="key"
                      sortable
                      width="100">
                      </el-table-column>
                  <el-table-column
                  prop="value"
                  label="value"
                  sortable
                  width="320">
                  </el-table-column>
                  <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
            </el-card>
         </el-col>
        
        <el-col :span="16">
            <el-card>
              <span>版本数据</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="btnVersionCreated">添加+</el-button>
            <el-table
                :data="project.metaData"
         
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="key"
                label="key"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                :prop="item"
                :label="item"
                sortable
                v-for="item in project.versionLables"
                :key="item"
                width="180">
                </el-table-column>
                
            </el-table>
            </el-card>
        </el-col>
    </el-row>
  
  <el-dialog
    :title="'添加'+editType+'元数据'"
    :visible.sync="baseDialogVisible"
    width="30%">
      <el-form :model="baseMetaDataForm">
        <el-form-item label="key">
          <el-input v-model="baseMetaDataForm.key" :disabled="fromKeyreadon"></el-input>
        </el-form-item>
        <el-form-item label="value">
          <el-input type="textarea"  :rows="4" v-model="baseMetaDataForm.value"></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="baseDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="pushProjectBaseMetaData">提 交</el-button>
    </span>
  </el-dialog>
</div>

</template>
<script>
import { getProjectDetails,pushBaseMetaData,deleteBaseMetaData,pushMetaData } from "@/api/project";
export default {
    data() {
    return {
        editType : '基础', // 基础 版本
        fromKeyreadon:false,
        baseMetaDataForm:{key:'',value:''},
        baseDialogVisible:false,
        project:{
            img_url:"",
            name:"",
            description:"",
            baseMetaData:[],
            versionLables:[],
            metaData:[]
        }
    };
    },
    methods:{
      pushProjectBaseMetaData(){
        var data = { [this.baseMetaDataForm.key] : this.baseMetaDataForm.value};
        if(this.editType=='基础'){
            pushBaseMetaData(this.project.name,data).then(response=>{
              this.project.baseMetaData = response.data;
              this.$message({
                    message: "增加成功",
                    type: 'success'
                  });
              this.baseDialogVisible = false;
            })
        }else{
          pushMetaData(this.project.name,data).then(response=>{
              this.project.metaData = response.data.metaData;
              this.project.versionLables = response.data.versionLables;
              this.$message({
                    message: "增加成功",
                    type: 'success'
                  });
              this.baseDialogVisible = false;
            })
        }
      },
      handleEdit(index,row){
        this.fromKeyreadon = true
        this.baseMetaDataForm = row;
        this.baseDialogVisible = true;

      },
      // 删除元数据
      handleDelete(index,row){
        deleteBaseMetaData(this.project.name,row.key).then(response=>{
          this.project.baseMetaData = response.data;
          this.$message({
                message: "删除成功",
                type: 'success'
              });
        })
        
      },
      // 点击添加按钮事件
      btnCreated(){
        this.editType = "基础";
        this.baseMetaDataForm = {key:'',value:''};
        this.fromKeyreadon = false;
        this.baseDialogVisible = true;
      },
      btnVersionCreated(){
        this.editType = "版本";
        this.baseMetaDataForm = {key:'',value:''};
        this.fromKeyreadon = false;
        this.baseDialogVisible = true;
      }
    },
    
    created () {
      console.log(this.$route.query);
      // 获取项目详情
      getProjectDetails(this.$route.query).then(response =>{
        this.project = response.data

      })
      
    }
    
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
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
  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

</style>