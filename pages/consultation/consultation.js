// pages/consultation/consultation.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: "情感资深专家、专业婚姻家庭咨询师 \n 职业规划咨询师",
    percent: '100',
    noAuthorized:true
  },
  tapToAuthorize () {
    console.log("我是谁"),
      //再授权
      wx.openSetting({
        success: (res) => {
          if (res.authSetting["scope.writePhotosAlbum"] === true) {
            
          }
          else {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用小程序，请点击授权按钮，勾选用户信息并点击确定。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        }
      })
  },
  baochun() {
    console.log("我点了")
    wx.getSetting({
      success: function (res) {
        console.log("成功了")
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function (res) {
            console.log("授权成功");
            var imgUrl = "https://jzs.deeptk.com/upload/imgs/2019912.jpg";
            wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
              url: imgUrl,
              success: function (res) {
                // 下载成功后再保存到本地
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: function (res) {
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail: function () {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用小程序功能，请按确定并且在【我的】页面中点击授权按钮，勾选用户信息并点击确定。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        })
        // wx.authorize({
        //   scope:"scope.writePhotosAlbum",
        //   success(){
        //     wx.downloadFile()
        //   }
        // })
      }
      // fail: function (res) {
      //   //console.log(res)
      //   wx.showModal({
      //     title: '操作提示',
      //     content: '你点击了拒绝授权，将无法进行下一步操作，请先同意授权。',
      //     success: function (res) {
      //       if (res.confirm) {
      //         wx.openSetting({
      //           success: function (res) {
      //             that.useradd();
      //           }
      //         })
      //       }
      //     }
      //   })
      // }
    })
  },
  // //点击开始的时间  
  // timestart: function (e) {
  //   var _this = this;
  //   _this.setData({ timestart: e.timeStamp });
  // },
  // //点击结束的时间
  // timeend: function (e) {
  //   var _this = this;
  //   _this.setData({ timeend: e.timeStamp });
  // },

  // //保存图片
  // saveImg: function (e) {
  //   var _this = this;
  //   var times = _this.data.timeend - _this.data.timestart;
  //   if (times > 300) {
  //     console.log("长按");
  //     wx.getSetting({
  //       success: function (res) {
  //         wx.authorize({
  //           scope: 'scope.writePhotosAlbum',
  //           success: function (res) {
  //             console.log("授权成功");
  //             var imgUrl = "https://jzs.deeptk.com/upload/imgs/2019912.jpg";
  //             wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
  //               url: imgUrl,
  //               success: function (res) {
  //                 // 下载成功后再保存到本地
  //                 wx.saveImageToPhotosAlbum({
  //                   filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
  //                   success: function (res) {
  //                     wx.showToast({
  //                       title: '成功保存到相册',
  //                       icon: 'success'
  //                     })
  //                   }
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
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