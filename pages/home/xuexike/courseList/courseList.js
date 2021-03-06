// pages/home/xuexike/courseList/courseList.js
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:null,
    courseList:[]
  },
  gotoCourseDetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../courseDetail/courseDetail?tid=' + e.currentTarget.dataset.tid,
    })
  },
  requestData:function(){
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    let dataStr = { "command": "getTeachersList", "tel": "15737954647", "ccode": this.data.code };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        that.setData({
          courseList:res.data.data.tlist
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      code:options.code
    })
    this.requestData();
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