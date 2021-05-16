import regeneratorRuntime from "../../libs/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFouce: true,
    inputValue: ""
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

  },
  Timer: null,
  handleInput(e) {
    const {
      value
    } = e.detail
    //  当为空格是不发送请求 进行校验 输入框没有值
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFouce: true
      })
      return
    }
    this.setData({
      isFouce: false
    })
    clearTimeout(this.Timer)
    this.Timer = setTimeout(() => {
      console.log('value',value)
      this.getGoods(value)
    }, 1000)
  },
  // 点击取消情况数据
  handleInputValue() {
    this.setData({
      inputValue: "",
      goods: [],
      isFouce: true
    })
  },
  async getGoods(value) {
    const 
      message
     = await wx.$request({
      url: '/goods/qsearch',
      data: {
        query: value
      }
    })
    // console.log(message)
    this.setData({
      goods: message
    })
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