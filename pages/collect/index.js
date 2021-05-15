// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '收藏商铺',
      isActive: true
    },
    {
      id: 1,
      name: '收藏商品',
      isActive: false
    },
    {
      id: 2,
      name: '待收货',
      isActive: false
    },
    {
      id: 3,
      name: '浏览记录',
      isActive: false
    }
  ],
  },
   //  改变父组件的激活
   handlechangeTabActive(e) {
    // console.log(e)
    // 获取被点击的索引
    const {
      index
    } = e.detail
    this.changeTab(index)
  },
  // 根据点击切换tab
  changeTab(index) {
    // 根据点击的索引修改isActive
    const {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs: tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 小程序页面栈最大长度是10  获取页面栈
     let pages = getCurrentPages()
     // 获取最后一个页面栈 根据最后一个页面栈获取type
     const {
       type
     } = pages[pages.length - 1].options
     this.changeTab(type - 1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})