import regeneratorRuntime from "../../libs/runtime/runtime.js"
/*
1、用户上滑页面 滚动条触底，开始加载下一页数据
  1 先判断有无下一条数据
    获取总页数
    获取当前页码
    比较当前页码和总页码
  2 没有给提示
  3 有就加载

*/
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:'综合',
        isActive:true
      },
      {
        id:1,
        name:'销量',
        isActive:false
      },
      {
        id:2,
        name:'价格',
        isActive:false
      }
    ],
    goods:[]
  },

  //  请求参数的pramas
  queryParam: {
    query:'',
    cid: '',
    pagenum:1,
    pagesize:10
  },

  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  
 async getGoodList(){
  const res = await  wx.$request({url:'/goods/search',data:{...this.queryParam}})
  console.log(res)
  // console.log(res) 
  //  每次获取数据的条数
  const total  = res.total
  // 总页数
  this.totalPages = Math.ceil(total / this.queryParam.pagesize)
  // console.log(this.totalPages)
  // 拼接数据
  this.setData({goods:[...this.data.goods,...res.goods]})
  // console.log(this.data.goods)
  // 拿到数据了 就关闭下拉更新
  wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
    // console.log(options)
    this.queryParam.cid = options.cid || ""
    this.queryParam.query = options.query || ""
    // console.log(options.query)
    // console.log(this.queryParam.cid)
    this.getGoodList()
  },
  
  //  改变父组件的激活
  handlechangeTabActive(e){
    // console.log(e)
    // 获取被点击的索引
    const {index} = e.detail
    // 根据点击的索引修改isActive
    const { tabs } = this.data
    tabs.forEach((v,i)=>i===index ? v.isActive=true : v.isActive=false)
    this.setData({tabs:tabs})
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
    // console.log('gs')
    // 下拉更新数据
    // 清空数据
    this.setData({
      goods:[]
    })
    // 页面配置设置为1
    this.queryParam.pagenum = 1
    // 获取数据
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(this.queryParam.pagenum)
    // console.log(this.totalPages)
    if(this.queryParam.pagenum > this.totalPages){
      wx.showToast({
        title: '没有数据了'
      })
    }else{
      this.queryParam.pagenum++
      this.getGoodList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})