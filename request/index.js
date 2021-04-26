// 统计同时发出去的接口
let ajaxTimec = 0

export const request = (params) => {
  ajaxTimec++
  wx.showLoading({
    title: '加载中'
  })
  //  定义公共的路径
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

  return new Promise((resolve, reject) => {

    wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result) => {
        result = result.data.message
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () =>{
        // 当全部完成了就隐藏
        ajaxTimec--
        if(ajaxTimec === 0 ){
          wx.hideLoading()
        }
      }
    })
  })
}