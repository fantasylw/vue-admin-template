<template>
<div>
    <el-row>
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
                    v-model="project.name"
                    maxlength="10"
                    show-word-limit
                    >
                </el-input>
                </el-form-item>
                <el-form-item label="项目详情">
                    <el-input 
                    type="textarea"
                    :rows="4"
                    v-model="project.description"
                    axlength="200"
                    show-word-limit></el-input>
                </el-form-item>

                </el-form>
            </el-col>

        
    </el-card>
    </el-row>
    <el-row :gutter="20">
        
        <el-col :span="8">
            <el-card>
             <el-table :data="project.metaData">
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
                width="400">
                </el-table-column>
             </el-table>
             </el-card>
         </el-col>
        
        <el-col :span="16">
            <el-card>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
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
                v-for="item in metaData"
                :key="item"
                width="180">
                </el-table-column>
            </el-table>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>
<script>
export default {
    data() {
    return {
        project:{
            img_url:"http://127.0.0.1:8000/image/load?image_id=5f228c82093a22e51662ee93",
            name:"demo",
            description:"dddd",
            metaData:[
                {
                    "key":"git",
                    "value":"http://gitlab.admin.bluemoon.com.cn/luowei2/apitest"
                },
                {
                    "key":"数据库",
                    "value":"mysql:root@192.168.123.123:3306"
                },
                {
                    "key":"测试环境",
                    "value":"http://angelapi.bluemoon.com.cn/"
                }
            ]
        },
        metaData:[
                "value1","value2","value3"
            ],
        tableData: [{
          id: 1,
          key: 'rate',
          value1: '76%'
        }, {
          id: 3,
          key: 'jmeter',
          value1: 70,
          value2: 72,
          children: [{
              id: 31,
              key: 'rate',
              value1: '86%',
              value3:'37%'
            }, {
              id: 32,
              key: 'error',
              value1: 7
          },
          {
              id: 33,
              key: 'samples',
              value1: 104
          }]
        }, {
          id: 4,
          key: 'test',
          value1: 'demo'
        }],
    };
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