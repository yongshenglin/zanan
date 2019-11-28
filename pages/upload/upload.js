// pages/upload/upload.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      clickFlag: false
    })
  },
  //选择图片进行上传
  
  chooseImg() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '请确认是否消耗一次次数(如上传失败,不扣除次数)',
      success(res) {
        if (res.confirm) {
          that.aaa()
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // let that = this;
    // let obj = {
    //   count: 1,
    //   sizeType: ['original'],
    //   sourceType: ['album', 'camera'],
    //   success(res){
    //     that.setData({
    //       clickFlag: true
    //     })
    //     that.getFileInfo(res.tempFiles[0].path)
    //   }
    // }
    // if(!that.data.clickFlag && app.globalData.accountInfo.balance >= 1){
    //   wx.chooseImage(obj)
    // }else if(app.globalData.accountInfo.balance < 1){
    //   wx.showModal({
    //     title: '剩余测试次数不足',
    //     content: '请补充次数。',
    //     confirmText: "确定",
    //     cancelText: '取消',
    //     success(res){
    //       if(res.confirm){
    //         that.purchase();
    //       }
    //     }
    //   });
    // }
  },
  aaa: function(){
    let that = this;
    let obj = {
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        that.setData({
          clickFlag: true
        })
        that.getFileInfo(res.tempFiles[0].path)
      }
    }
    if(!that.data.clickFlag && app.globalData.accountInfo.balance >= 1){
      wx.chooseImage(obj)
    }else if(app.globalData.accountInfo.balance < 1){
      wx.showModal({
        title: '剩余测试次数不足',
        content: '请补充次数。',
        confirmText: "确定",
        cancelText: '取消',
        success(res){
          if(res.confirm){
            wx.getSystemInfo({
              success(res) {
                if (res.platform == "android") {
                  that.purchase()
                }else{
                  wx.showModal({
                    title: "对不起",
                    content: "ios系统用户暂时不支持该功能"
                  })
                }
              }
            })
          }
        }
      });
    }
  },
  //获取图片md5值提交至后端
  getFileInfo(path) {
    let that = this;
    wx.getFileInfo({
      filePath: path,
      success(res) {
        wx.showLoading({
            title: '加载中',
          }),
          wx.uploadFile({
            url: 'https://jzs.deeptk.com/user/photoUpload.do',
            filePath: path,
            name: 'photoFile',
            formData: {
              'userId': app.globalData.accountInfo.id,
              'md5': res.digest
            },
            success(res) {
              var result = JSON.parse(res.data);
              if (result.state == 200) {
                wx.hideLoading();
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                });
                app.globalData.imgInfo = result.data;
                app.globalData.descriptionInfo = result.description;
                app.globalData.zhanan = result.listZ;
                app.globalData.yaojing = result.listY;
                app.globalData.accountInfo = result.user;
                // setTimeout(function(){
                //   wx.redirectTo({
                //     url: '../confirm/conirm'
                //   })
                //   console.log("我延时了")
                // },2000)
                wx.redirectTo({
                  url: '../confirm/conirm'
                })
              } else if (result.state == 300) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                });
                that.getImgUrl(result.data.id, result.data.userid)
              } else if (result.state == 400) {
                wx.hideLoading();
                that.setData({
                  clickFlag: false
                })
                wx.showModal({
                  title: '上传失败',
                  content: '图片中未识别到人脸，请重新上传。',
                  confirmText: "确定"
                });
              }
            },
            fail() {
              that.setData({
                clickFlag: false
              })
              wx.hideLoading();
              wx.showModal({
                title: '上传失败',
                content: '未知错误，请稍后重新上传。',
                confirmText: "确定"
              });
            }
          })
      }
    })
  },
  //上传图片后获取分析结果
  getImgUrl(imgId, userId) {
    let that = this;
    (function a(imgId, userId) {
      wx.request({
        url: 'https://jzs.deeptk.com/user/download.do',
        method: 'POST',
        data: {
          'imgId': imgId,
          'userId': userId
        },
        dataType: 'json',
        success(res) {
          if (res.data.state == 200) {
            app.globalData.imgInfo = res.data.data;
            app.globalData.descriptionInfo = res.data.description;
            app.globalData.zhanan = res.data.listZ;
            app.globalData.yaojing = res.data.listY;
            app.globalData.accountInfo = res.data.user;
            wx.redirectTo({
              url: '../confirm/conirm'
            })
          } else if (res.data.state == 300) {
            a(imgId, userId);
          }
        },
        fail() {
          that.setData({
            clickFlag: false
          })
          wx.showModal({
            title: '上传失败',
            content: '未知错误，请稍后重新上传。',
            confirmText: "确定"
          });
        }
      })
    })(imgId, userId)

  },
  purchase() {
    let that = this;
    wx.request({
      url: 'https://jzs.deeptk.com/user/purchase.do',
      method: 'POST',
      data: {
        userId: app.globalData.accountInfo.id,
        openId: app.globalData.accountInfo.account
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})