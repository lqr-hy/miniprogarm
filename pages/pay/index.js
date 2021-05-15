import regeneratorRuntime from '../../libs/runtime/runtime'
import {
  showToast,
  requestPayment
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address')
    if (address) {
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    }
    // 获取加入购物车的数据
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v => v.checked)
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
  // 支付
  async handlePay() {
    try {
      // 首先判断是否有权限
      const token = wx.getStorageSync('token')
      // 没有就跳到权限页面
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      // 获取订单参数
      const order_price = this.data.totailPrice
      // 获取收获地址
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      // 获取订单数组
      let good = []
      cart.forEach(v => good.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      let payParams = {
        order_price,
        consignee_addr,
        good
      }
      // 1、 创建订单  获取订单编号
      const {
        order_number
      } = await wx.$request({
        url: '/my/orders/create',
        method: "POST",
        data: payParams
      })
      // console.log(order_number)
      // 发起预支付接口
      const {
        pay
      } = await wx.$request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        }
      })
      // // 发起微信支付
      await requestPayment(pay)
      // 查询订单
      const res = await wx.$request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        data: {
          order_number
        }
      })
      // console.log(res)
      await showToast({
        title: '支付成功'
      })
      // 最后删除购物车中以支付的数据
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(v => !v.checked)
      this.setData({
        cart: newCart
      })
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (error) {
      await showToast({
        title: '支付失败'
      })
      console.log(error)
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