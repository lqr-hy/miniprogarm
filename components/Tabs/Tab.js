// components/Tabs/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    changeTab(e){
      // 获取父组件穿过来的index 
      const { index }  = e.target.dataset
      // console.log(index)
      // 触发父组件的事件 改变isActive
      this.triggerEvent('changeTabActive', {index} )
    }
  }
})
