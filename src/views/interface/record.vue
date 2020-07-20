<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import { getHost } from '@/api/record'
export default {

  data() {
    return {
      filterText: '',
      data2: this.demo(),
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    demo(){
        getHost("").then(response => {
        this.data2 = response.data
      })
    },
    handleNodeClick(data){
      console.log(data)
    //   getHost(data.id).then(response => {
        
    //     data.children = response.data
    //   })
    }
    
  }
}
</script>

