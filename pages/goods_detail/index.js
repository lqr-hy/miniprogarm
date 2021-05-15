// pages/goos_detail/index.js
import regeneratorRuntime from "../../libs/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: '',
    isCollect: false
  },

  // 全部数据
  goodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const pages = getCurrentPages()
    // console.log(options)
    const {
      goods_id
    } = pages[pages.length - 1].options
    // console.log(goods_id)
    this.getGoodDetail(goods_id)
  },

  async getGoodDetail(goods_id) {
    const res = await wx.$request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    // console.log(res)
    this.goodsObj = res
    // 获取缓存中是否有这个收藏的商品 
    const collect = wx.getStorageSync('collect') || []
    const isCollect = collect.some(v => (v.goods_id === this.goodsObj.goods_id))
    this.setData({
      goods_detail: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/, '.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },

  // 点击轮播图 放大
  handlePicturePreview(e) {
    // 图片数组
    const urls = this.goodsObj.pics.map(v => v.pics_mid)
    // 获取当前的点击的图片
    const current = e.currentTarget.dataset.url
    console.log(current)
    wx.previewImage({
      current,
      urls,
    })
  },
  // 加入购物车
  handleCartAdd() {
    // 首先取出缓存的数据
    const cart = wx.getStorageSync('cart') || []
    // 找到当前缓存数据中是否有此商品
    const index = cart.findIndex(v => v.goods_id === this.goodsObj.goods_id)
    // 判断购物车是否有数据
    if (index === -1) {
      // 没有就设置当前数量
      this.goodsObj.num = 1
      // 商品选中的状态
      this.goodsObj.checked = true
      // 并追加到缓存中
      cart.push(this.goodsObj)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  // 处理收藏
  handleCollection() {
    let isCollect = false
    // 1 拿去缓存里面的数据，判断是否有数据
    const collect = wx.getStorageSync('collect') || []
    // 说明数据存在收藏
    const index = collect.findIndex(v => v.goods_id === this.goodsObj.goods_id)
    // 数据存在就取消收藏
    if (index != -1) {
      isCollect = false
      collect.splice(index, 1)
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        mask: true
      })
    } else {
      isCollect = true
      collect.push(this.goodsObj)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 存入缓存中
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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