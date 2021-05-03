import regeneratorRuntime from "../../libs/runtime/runtime.js"
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单栏数据
    leftMenuData: [],
    // 右侧商品数据
    rightGoodData: [],
    // 左侧当选中的菜单栏
    currentIndex: 0,
    // 右边距离上面的距离
    scrollTop: 0
  },
  // 商品列表数据
  categoryList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  获取storage 数据
    const cates = wx.getStorageSync('cates')
    // 判断数据是否在缓存中 
    if (!cates) {
      this.getCategory()
    } else {
      // 判断时间是否过期
      if (Date.now() - cates.time > 1000 * 100) {
        // 时间过期重新获取数据
        this.getCategory()
      } else {
        this.categoryList = cates.data
        // 左侧菜单数据
        let leftMenuData = this.categoryList.map(v => v.cat_name)
        let rightGoodData = this.categoryList[0].children
        this.setData({
          leftMenuData,
          rightGoodData
        })
      }
    }
  },

  // 获取分类数据
  async getCategory() {
    // wx.$request({
    //   url: '/categories'
    // }).then(result => {
    //   // console.log(result)
    //   this.categoryList = result.data.message
    //   // 将获取到的数据存入storage里面
    //   wx.setStorageSync('cates', {
    //     time: Date.now(),
    //     data: this.categoryList
    //   })
    //   // 左侧菜单数据
    //   let leftMenuData = this.categoryList.map(v => v.cat_name)
    //   let rightGoodData = this.categoryList[0].children
    //   this.setData({
    //     leftMenuData,
    //     rightGoodData
    //   })
    // })
    const res = await wx.$request({
      url: '/categories'
    })
    this.categoryList = res
    // 将获取到的数据存入storage里面
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.categoryList
    })
    // 左侧菜单数据
    let leftMenuData = this.categoryList.map(v => v.cat_name)
    let rightGoodData = this.categoryList[0].children
    this.setData({
      leftMenuData,
      rightGoodData
    })
  },
  // 左侧menu切换
  changeMenu(e) {
    const {
      menuindex
    } = e.currentTarget.dataset
    let rightGoodData = this.categoryList[menuindex].children
    this.setData({
      currentIndex: menuindex,
      rightGoodData,
      scrollTop: 0
    })
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