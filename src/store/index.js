import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务·列表存储
    list: [],
    // 添加任务
    inputValue: 'what to do',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state,list){
      state.list= list
    },
    // 为store中inputValue赋值
    setInputValue(state,val){
      state.inputValue = val
    },
    // 添加任务
    addItem(state){
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: 'false'
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应任务
    removeItem(state,id){
      const i = state.list.findIndex(x=>x.id===id)
      if(i!==-1){
        state.list.splice(i,1)
      }
    },
    // 复选框状态改变监听
    changeStatus(state,param){
      const i= state.list.findIndex(x=>x.id === param.id)
      if(i!==-1){
        state.list[i].done = param.status
      }
    },
    // 清除已完成任务
    cleanDone(state){
      state.list = state.list.filter(x=>x.done === false)

    },
    // 修改视图关键字
    changeViewKey(state,key){
      state.viewKey = key
    }
  },
  actions: {
    getList(context){
      axios.get('/list.json').then(({data})=>{
        // console.log(data);
        context.commit('initList',data)
      })
    }
  },
  getters: {
    // 统计未完成任务个数
    unDoneLength(state){
      return state.list.filter(x=>x.done===false).length
    },
    infoList(state){
      if(state.viewKey==='all'){
        return state.list
      }
    if(state.viewKey==='unDone'){
      return state.list.filter(x=>!x.done)
    }
    if(state.viewKey==='Done'){
      return state.list.filter(x=>x.done)
    }
    return state.list
    }
  },
  modules: {
  }
})
