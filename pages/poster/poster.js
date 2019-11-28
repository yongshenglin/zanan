// pages/poster/poster.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: null,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //使用canvas画海报
  onReady: function () {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          systemInfo: res
        })
      }
    })
    const context = wx.createCanvasContext("myCanvas");
    const grd = context.createCircularGradient(that.data.systemInfo.windowWidth / 2, that.data.systemInfo.windowHeight / 603 * 204, that.data.systemInfo.windowWidth)
    grd.addColorStop(0, "#21d3fc");
    grd.addColorStop(1, "#021f49");
    context.fillStyle = grd;
    context.fillRect(0, 0, that.data.systemInfo.windowWidth, that.data.systemInfo.windowHeight);
    context.draw(true);
    
      wx.downloadFile({
      url: app.globalData.imgInfo.img4url,
      success(res) {
        context.drawImage(res.tempFilePath, 0, 0, that.data.systemInfo.windowWidth / 372 * 187.5, that.data.systemInfo.windowWidth / 375 * 250)
        if (app.globalData.imgInfo.score >= 50 && app.globalData.imgInfo.score < 70) {
          context.drawImage('../../images/poster/Cu_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
        } else if (app.globalData.imgInfo.score >= 70 && app.globalData.imgInfo.score < 90) {
          context.drawImage('../../images/poster/Ag_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
        } else {
          context.drawImage('../../images/poster/Au_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
        }
        wx.downloadFile({
          url: app.globalData.descriptionInfo[0].typeUrl,
          success(res){
            context.drawImage(res.tempFilePath, that.data.systemInfo.windowWidth / 375 * 240, that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 264 * 0.3, that.data.systemInfo.windowWidth / 375 * 171 * 0.3)
            context.font = "nomal nomal bold 32px nomal";
            context.fillStyle = "#00489d";
            context.fillText(app.globalData.imgInfo.score + '分', that.data.systemInfo.windowWidth / 375 * 73, that.data.systemInfo.windowWidth / 375 * 126)
            context.draw(true, wx.hideLoading())
          }
        })
      }
    })
    context.fillStyle = '#d4eef9';
    context.fillRect(0, 0, that.data.systemInfo.windowWidth, that.data.systemInfo.windowWidth / 375 * 250)
    // function () {
    //   wx.canvasToTempFilePath({
    //     canvasId: 'myCanvas',
    //     quality: 1,
    //     success(res) {
    //       that.setData({
    //         url: res.tempFilePath
    //       })
    //     }
    //   })
    // }

    // wx.downloadFile({
    //   url: app.globalData.imgInfo.img4url,
    //   success(res) {
    //     context.drawImage(res.tempFilePath, 0, 0, that.data.systemInfo.windowWidth / 372 * 187.5, that.data.systemInfo.windowWidth / 375 * 250)
    //     if (app.globalData.imgInfo.score >= 50 && app.globalData.imgInfo.score < 70) {
    //       context.drawImage('../../images/poster/Cu_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
    //     } else if (app.globalData.imgInfo.score >= 70 && app.globalData.imgInfo.score < 90) {
    //       context.drawImage('../../images/poster/Ag_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
    //     } else {
    //       context.drawImage('../../images/poster/Au_2.png', that.data.systemInfo.windowWidth / 375 * 40, -20, that.data.systemInfo.windowWidth / 375 * 324 * 0.4, that.data.systemInfo.windowWidth / 375 * 525 * 0.4)
    //     }
    //     wx.downloadFile({
    //       url: app.globalData.descriptionInfo[0].typeUrl,
    //       success(res){
    //         context.drawImage(res.tempFilePath, that.data.systemInfo.windowWidth / 375 * 240, that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 264 * 0.3, that.data.systemInfo.windowWidth / 375 * 171 * 0.3)
    //         context.font = "nomal nomal bold 32px nomal";
    //         context.fillText(app.globalData.imgInfo.score + '分', that.data.systemInfo.windowWidth / 375 * 73, that.data.systemInfo.windowWidth / 375 * 126)
    //         context.draw(false, function () {
    //           wx.canvasToTempFilePath({
    //             canvasId: 'myCanvas',
    //             quality: 1,
    //             success(res) {
    //               that.setData({
    //                 url: res.tempFilePath
    //               })
    //             }
    //           })
    //         })
    //       }
    //     })
    //   }
    // })
    context.drawImage('../../images/poster/kuang.png', that.data.systemInfo.windowWidth / 375 * 210, that.data.systemInfo.windowWidth / 375 * 30, that.data.systemInfo.windowWidth / 375 * 234 * 0.6, that.data.systemInfo.windowWidth / 375 * 67 * 0.6)
      context.fillStyle = "#00489d";
      context.font = "nomal nomal bold 18px nomal";
      context.textAlign = "center";
      context.textBaseline = 'middle';
      context.fillText(app.globalData.descriptionInfo[0].name, that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 51);
    // context.fillStyle = "#00489d";
    // context.font = "nomal nomal bold 18px nomal";
    // context.textAlign = "center";
    // context.textBaseline = 'middle';
    // context.fillText(app.globalData.descriptionInfo[0].name, that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 51);

    // context.drawImage('../../images/index/index_3.png', that.data.systemInfo.windowWidth / 375 * 48, that.data.systemInfo.windowWidth / 375 * 510, that.data.systemInfo.windowWidth / 375 * 355 * 0.8, that.data.systemInfo.windowWidth / 375 * 94 * 0.8)

      context.fillStyle = "#02afe9";
      var des = [];
      var n = 9;
      for (var i = 0, l = app.globalData.descriptionInfo[0].description.length; i < l / n; i++) {
        var a = app.globalData.descriptionInfo[0].description.slice(n * i, n * (i + 1));
        des.push(a);
      }
      context.fillText(des[0], that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 160);
      context.fillText(des[1] ? des[1] : '', that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 190);
    // context.fillStyle = "#02afe9";
    // var des = [];
    // var n = 9;
    // for (var i = 0, l = app.globalData.descriptionInfo[0].description.length; i < l / n; i++) {
    //   var a = app.globalData.descriptionInfo[0].description.slice(n * i, n * (i + 1));
    //   des.push(a);
    // }
    // context.fillText(des[0], that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 160);
    // context.fillText(des[1] ? des[1] : '', that.data.systemInfo.windowWidth / 375 * 280, that.data.systemInfo.windowWidth / 375 * 190);
    context.drawImage('../../images/poster/tuoyuan.png', that.data.systemInfo.windowWidth / 375 * 237, that.data.systemInfo.windowWidth / 375 * 210, that.data.systemInfo.windowWidth / 375 * 286 * 0.3, that.data.systemInfo.windowWidth / 375 * 26 * 0.3)
    context.draw(true)

    
      context.setFontSize(that.data.systemInfo.windowWidth / 375 * 16);
      context.fillStyle = "white";
      context.font = "nomal nomal bold 12px nomal";
      context.setTextAlign("left");
      context.fillText("测一测", that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 535)
      context.fillText("扫描小程序码进行测试", that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 560)
    context.drawImage('../../images/index/index_3.png', that.data.systemInfo.windowWidth / 375 * 48, that.data.systemInfo.windowWidth / 375 * 510, that.data.systemInfo.windowWidth / 375 * 355 * 0.8, that.data.systemInfo.windowWidth / 375 * 94 * 0.8)

    // context.setFontSize(that.data.systemInfo.windowWidth / 375 * 16);
    // context.fillStyle = "white";
    // context.font = "nomal nomal bold 12px nomal";
    // context.setTextAlign("left");
    // context.fillText("测一测", that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 535)
    // context.fillText("扫描小程序码进行测试", that.data.systemInfo.windowWidth / 375 * 80, that.data.systemInfo.windowWidth / 375 * 560)
    context.drawImage('../../images/poster/xiaocx.jpg', that.data.systemInfo.windowWidth / 375 * 240, that.data.systemInfo.windowWidth / 375 * 510, that.data.systemInfo.windowWidth / 375 * 72, that.data.systemInfo.windowWidth / 375 * 72)
    context.draw(true)
    
      context.setFontSize(that.data.systemInfo.windowWidth / 375 * 20);
      context.fillStyle = "#fef1bc";
      context.drawImage('../../images/poster/zhanan.png', that.data.systemInfo.windowWidth / 375 * 46, that.data.systemInfo.windowWidth / 375 * 300, that.data.systemInfo.windowWidth / 375 * 100 * 0.37, that.data.systemInfo.windowWidth / 375 * 191 * 0.37)
      context.fillText('渣男说：', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 310);
      // context.font = "nomal nomal nomal 18px nomal";
      context.setFontSize(that.data.systemInfo.windowWidth / 375 * 12);
      var zhananDes = [];
      var n2 = 20;
      for (var i = 0, l = app.globalData.zhanan[0].description.length; i < l / n2; i++) {
        var a = app.globalData.zhanan[0].description.slice(n2 * i, n2 * (i + 1));
        zhananDes.push(a);
      }
      context.fillText(zhananDes[0], that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 340);
      context.fillText(zhananDes[1] ? zhananDes[1] : '', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 360);
      context.draw(true);

      // context.font = "nomal nomal bold 16px nomal";
        context.setFontSize(that.data.systemInfo.windowWidth / 375 * 20);
        context.fillStyle = "#f87ea7";
        context.drawImage('../../images/poster/yaojing.png', that.data.systemInfo.windowWidth / 375 * 30, that.data.systemInfo.windowWidth / 375 * 410, that.data.systemInfo.windowWidth / 375 * 142 * 0.37, that.data.systemInfo.windowWidth / 375 * 185 * 0.37);
        context.fillText('妖精说：', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 420);
        // context.font = "nomal nomal nomal 16px nomal";
        context.setFontSize(that.data.systemInfo.windowWidth / 375 * 12);
        var yaojingDes = [];
        var n3 = 20;
        for(var i = 0, l = app.globalData.yaojing[0].description.length; i<l / n3; i++) {
  var a = app.globalData.yaojing[0].description.slice(n3 * i, n3 * (i + 1));
  yaojingDes.push(a);
}
context.fillText(yaojingDes[0], that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 450);
context.fillText(yaojingDes[1] ? yaojingDes[1] : '', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 470);
context.draw(true)
wx.showLoading({
  title:"海报生成中..."
})
// setTimeout(()=>{
//   wx.canvasToTempFilePath({
//     canvasId: 'myCanvas',
//     quality: 1,
//     success(res) {
//       console.log(res.tempFilePath)
//       that.setData({
//         url: res.tempFilePath
//       })
//       wx.hideLoading()
//     },
//     fail: function (res) {
//       console.log(res)
//     }
//   })
// },3000)
    
    // context.setFontSize(that.data.systemInfo.windowWidth / 375 * 20);
    // context.fillStyle = "#fef1bc";
    // context.drawImage('../../images/poster/zhanan.png', that.data.systemInfo.windowWidth / 375 * 46, that.data.systemInfo.windowWidth / 375 * 300, that.data.systemInfo.windowWidth / 375 * 100 * 0.37, that.data.systemInfo.windowWidth / 375 * 191 * 0.37)
    // context.fillText('渣男说：', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 310);
    // context.font = "nomal nomal nomal 18px nomal";
    // context.setFontSize(that.data.systemInfo.windowWidth / 375 * 12);
    // var zhananDes = [];
    // var n2 = 20;
    // for (var i = 0, l = app.globalData.zhanan[0].description.length; i < l / n2; i++) {
    //   var a = app.globalData.zhanan[0].description.slice(n2 * i, n2 * (i + 1));
    //   zhananDes.push(a);
    // }
    // context.fillText(zhananDes[0], that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 340);
    // context.fillText(zhananDes[1] ? zhananDes[1] : '', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 360);
    // context.font = "nomal nomal bold 16px nomal";
    // context.setFontSize(that.data.systemInfo.windowWidth / 375 * 20);
    // context.fillStyle = "#f87ea7";
    // context.drawImage('../../images/poster/yaojing.png', that.data.systemInfo.windowWidth / 375 * 30, that.data.systemInfo.windowWidth / 375 * 410, that.data.systemInfo.windowWidth / 375 * 142 * 0.37, that.data.systemInfo.windowWidth / 375 * 185 * 0.37);
    // context.fillText('妖精说：', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 420);
    // context.font = "nomal nomal nomal 16px nomal";
    // context.setFontSize(that.data.systemInfo.windowWidth / 375 * 12);
    // var yaojingDes = [];
    // var n3 = 20;
    // for (var i = 0, l = app.globalData.yaojing[0].description.length; i < l / n3; i++) {
    //   var a = app.globalData.yaojing[0].description.slice(n3 * i, n3 * (i + 1));
    //   yaojingDes.push(a);
    // }
    // context.fillText(yaojingDes[0], that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 450);
    // context.fillText(yaojingDes[1] ? yaojingDes[1] : '', that.data.systemInfo.windowWidth / 375 * 100, that.data.systemInfo.windowWidth / 375 * 470);
    // context.fillStyle = "#00489d";
  },
  goReport() {
    wx.redirectTo({
      url: '../report/report',
    });
  },
  saveImg() {
    let that = this;
    console.log("11")
    console.log(that.data.url)
    wx.canvasToTempFilePath({
    canvasId: 'myCanvas',
    quality: 1,
    success(res) {
      console.log(res.tempFilePath)
      that.setData({
        url: res.tempFilePath
      })
      wx.saveImageToPhotosAlbum({
        filePath: that.data.url,
        success() {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
        }
      })
    },
    fail: function (res) {
      console.log(res)
    }
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