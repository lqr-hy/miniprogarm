import regeneratorRuntime from '../../libs/runtime/runtime'
import { showToast } from '../../libs/asyncWX.js'
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: '',
    totailPrice: '',
    totailNum: ''
  },

  // 获取收获地址
  handleChooseAddress() {
    // 首先判断权限
    // wx.getSetting({
    //   success:(res)=>{
    //     // console.log(res)
    //     // 根据全选状态进行调用获取地址
    //     const status = res.authSetting['scope.address']
    //     if(status === true || status === undefined){
    //       wx.chooseAddress({
    //         success: (result) => {
    //           console.log(result)
    //         },
    //       })
    //     }
    //   }
    // })  
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        wx.setStorageSync('address', result)
      },
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
    const address = wx.getStorageSync('address')
    if (address) {
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    }

    // 获取加入购物车的数据
    const cart = wx.getStorageSync('cart') || []
    // 全选按钮的状态
    // const allChecked = cart.length ? cart.every(v=>v.checked) : false
    // console.log(cart)
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 商品选中的状态改变
  handleItemChange(e) {
    // 获取当前点击的商品id 
    const goods_id = e.currentTarget.dataset.id
    const {
      cart
    } = this.data
    // 找当前点击索引的下标
    const index = cart.findIndex(v => v.goods_id === goods_id)
    // 取反选中
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 处理购物车数据
  setCart(cart) {
    let allChecked = true
    // 计算总价格 和总数量
    let totailPrice = 0
    let totailNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totailPrice += v.num * v.goods_price
        totailNum += v.num
      } else {
        allChecked = false
      }
    })
    // 如果cart没有数据就为false
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totailPrice,
      totailNum
    })
    // 同步到缓存数据
    wx.setStorageSync('cart',cart)
  },
  // 处理全选按钮
  handleAllChecked() {
    let {
      allChecked,
      cart
    } = this.data
    allChecked = !allChecked
    // 修改数据
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },

  // 处理商品数量的加减
  handleItemEdit(e) {
    //  获取商品的id 和商品信息
    const {
      id,
      operation
    } = e.currentTarget.dataset
    // console.log(id,operation)
    // 获取商品数据
    const {
      cart
    } = this.data
    // 查找到当前商品的索引
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '是否移除此商品',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }
        }
      })
    } else {
      // 修改当前商品的数量
      cart[index].num += operation
      this.setCart(cart)
    }
  },

  // 结算购物车
  async handleSettlement(){
    const { address, totailNum} = this.data
    if(!address){
      await showToast({title:'您还未添加购物车地址'})
      return
    }

    if(totailNum === 0){
      await showToast({title:"您还未选中商品"})
      return 
    }

    wx.navigateTo({
      url: '/pages/pay/index',
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