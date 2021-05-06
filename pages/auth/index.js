// pages/auth/index.js
import regeneratorRuntime from '../../libs/runtime/runtime'
import {
  login
} from '../../libs/asyncWX.js'
Page({
  // 获取全选
  async handleGetUserInfo(e){
    // console.log(e)
    // 获取生成用户token的字段
    const {encryptedData, rawData, iv, signature } = e.detail
    // 获取登录的code 
    const {code} = await login()
    const loginParams = {
      encryptedData, rawData, iv, signature,code
    }
    // 发送获取token的请求 必须是企业账号才能获取token
    const {token} = await wx.$request({url:'/users/wxlogin',data: loginParams, method:'post'})
    // 将token存入缓存
    wx.setStorageSync('token', token)
    // 返回上一个页面
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

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