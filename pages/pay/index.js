import regeneratorRuntime from '../../libs/runtime/runtime'
import {
  showToast
} from '../../libs/asyncWX.js'
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totailPrice: '',
    totailNum: ''
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
    const address = wx.getStorageSync('address')
    if (address) {
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    }
    // 获取加入购物车的数据
    let cart = wx.getStorageSync('cart') || []
    cart  = cart.filter(v=>v.checked)
    // 计算总价格 和总数量
    let totailPrice = 0
    let totailNum = 0
    cart.forEach(v => {
        totailPrice += v.num * v.goods_price
        totailNum += v.num
    })
    this.setData({
      cart,
      totailPrice,
      totailNum,
      address
    })
  },
  // 处理购物车数据
  setCart(cart) {
 
  },

  // 支付
  async handlePay() {
    // 首先判断是否有权限
    const token = wx.getStorageSync('token')
    // 没有就跳到权限页面
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
    }
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