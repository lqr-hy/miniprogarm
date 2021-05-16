// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 1,
        name: '体验问题'
      },
      {
        id: 2,
        name: '商品商家投诉'
      }
    ],
    chooseImg: [],
    textVal: ''
  },
  handlechangeTabActive(e) {
    // console.log(e)
    // 获取被点击的索引
    const {
      index
    } = e.detail
    // 根据点击的索引修改isActive
    const {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index - 1 ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs: tabs
    })
  },
  setChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          chooseImg: [...this.data.chooseImg, ...tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  clearCurrentImg(e) {
    const {
      chooseImg
    } = this.data
    const index = e.detail
    chooseImg.splice(index, 1)
    // console.log(e)
    this.setData({
      chooseImg
    })
  },
  // 文本域处理文字
  handletextval(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 处理提交按钮时间
  handlesubmit() {
    const {
      chooseImg,
      textVal
    } = this.data
    if(!textVal.trim()){
      wx.showToast({
        title: '请输入内容',
        icon:'error'
      })
      return 
    }
    wx.showLoading({
      title: '正在上传',
    })
    if(chooseImg.length>0){
      chooseImg.forEach((v,i)=>{
        wx.uploadFile({
          filePath: v,
          name: 'name',
          url: 'https://www.hualigs.cn/',
          success:(res)=>{
            console.log(res)
            // 所有图片都上传成功
            if(i === chooseImg.length-1){
              wx.hideLoading()
              this.setData({
                chooseImg:[],
                textVal:''
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      })
    }else{
      wx.hideLoading()
      console.log('上传成功')
      wx.navigateBack({
        delta: 1,
      })
    }
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