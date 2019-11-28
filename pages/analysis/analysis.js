// pages/analysis/analysis.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 0,
    buttonFlag: false,
    titleList: ['三观长度','定位五官','综合分析'],
    analysisList: [
      ['上庭数据提取','中庭数据提取','下庭数据提取'],
      ['定位眉头-眉峰-眉尾','定位眼长-眼高','定位鼻高-鼻翼宽','定位嘴宽-嘴唇厚度'],
      ['量取下颌角度','对比各部位数据','匹配五行格局','整个数据分析']
    ],
    percent:'100',
    urlList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [];
    list.push(app.globalData.imgInfo.img1url);
    list.push(app.globalData.imgInfo.img2url);
    list.push(app.globalData.imgInfo.img3url);
    this.setData({
      urlList: list
    })
  },
  changeTitle(){
    let that = this;
    function time(j){
      setTimeout(()=>{
        that.setData({
          percent: '99'
        })
        that.setData({
          title: j,
          percent: '100'
        })
      },j*6000)
    }
    for(let i=0;i<3;i++){
      time(i)
    }
  },
  showButton(){
    if(this.data.title === 2){
      this.setData({
        buttonFlag: true
      })
    }
  },
  goDescription(){
    wx.redirectTo({
      url: '../description/description',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.changeTitle();
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