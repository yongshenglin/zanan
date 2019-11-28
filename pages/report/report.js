// pages/report/report.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      app
    })
    console.log(app)
  },
  goIndex(){
    wx.redirectTo({
      url: '../index/index',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //购买测试次数
  purchase(){
    let that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res.platform)
        if (res.platform == "android"){
          wx.request({
            url: 'https://jzs.deeptk.com/user/purchase.do',
            method: 'POST',
            data: {
              userId: that.data.app.globalData.accountInfo.id,
              openId: that.data.app.globalData.accountInfo.account
            },
            dataType: 'json',
            success(res) {
              wx.requestPayment({
                timeStamp: res.data.data.timeStamp,
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                paySign: res.data.data.paySign,
                signType: "MD5",
                success(res) {
                  if (res.errMsg == 'requestPayment:ok') {
                    wx.request({
                      url: 'https://jzs.deeptk.com/user/getResult.do',
                      method: 'POST',
                      data: {
                        userId: app.globalData.accountInfo.id,
                        openId: app.globalData.accountInfo.account
                      },
                      dataType: 'json',
                      success(res) {
                        app.globalData.accountInfo = res.data.user
                        that.setData({
                          app
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        }else{
          wx.showModal({
            title:"对不起",
            content:"ios系统用户暂时不支持该功能"
          })
        }
      }
    })
  },
  goDes(){
    wx.redirectTo({
      url: '../description/description'
    })
  },
  follow(){
    let that = this;
    that.setData({
      istrue: true
    })
  },
  experience(){
    wx.navigateTo({
      url: '../consultation/consultation',
    })
  },
  openDialog: function () {
    this.setData({
        istrue: true
    })
  },
  closeDialog: function () {
    let that = this;
    wx.request({
      url: 'https://jzs.deeptk.com/user/attention.do',
      method: 'POST',
      data: {
        openId: that.data.app.globalData.accountInfo.account
      },
      dataType: 'json',
      success(res){
        app.globalData.accountInfo = res.data.user
        that.setData({
          app
        })
      }
    })
    that.setData({
        istrue: false
    })
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