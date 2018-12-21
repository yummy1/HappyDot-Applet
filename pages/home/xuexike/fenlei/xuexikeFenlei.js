let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenleiArr:[]
  },
  gotoCourseList:function(e){
    wx.navigateTo({
      url: '../courseList/courseList?code=' + e.currentTarget.dataset.code + "&id=" + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  // 请求数据
  requestXuexike: function () {
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    let dataStr = { "command": "getGoodsCatogoryList", "tel": "15737954647","tp": 2};
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
          fenleiArr:res.data.data.clist
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestXuexike();
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