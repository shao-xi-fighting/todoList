
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeList('all')">全部</a-button> 
          <a-button :type="viewKey==='unDone'?'primary':'default'" @click="changeList('unDone')">未完成</a-button>
          <a-button :type="viewKey==='Done'?'primary':'default'" @click="changeList('Done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
// 导入任务清单
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  created(){
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue','viewKey']),
    ...mapGetters(['infoList','unDoneLength'])
  },
  methods: {
    // 监听任务输入变化
    handleInputChange(e){
      this.$store.commit('setInputValue',e.target.value)
    },
    // 向列表新增任务
    addItemToList(){
      if(this.inputValue.trim().length<=0){
        return this.$message.warning('输入内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    // 根据id删除事项任务
    removeItemById(id){
      this.$store.commit('removeItem',id)
    },
    // 监听复选框变化
    cbStatusChanged(e,id){
      // e.target.checked
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus',param)
    },
    // 清除已完成任务
    clean(){
      this.$store.commit('cleanDone')
    },
    // 修改列表展示数据
    changeList(key){
      this.$store.commit('changeViewKey',key)
    }
  }
}
</script>

<style scoped>
body {
  position: relative;
}
#app {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin-top: 50px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>