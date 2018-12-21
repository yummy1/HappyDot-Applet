let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneId:null,
    twoId:null,
    fenleiArr:[],
    latitude:null,
    longtitude:null,
    dataArray:[]
  },
  // 请求商品数据
  requestFenlei: function () {
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    let dataStr = { "command": "getCategorys", "tel": "15737954647", "id": that.data.oneId, "tp": 3};
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          
        })
      }
    })
  },
  // 请求商品数据
  requestShangjia: function (page) {
    var that = this;
    var currentPage = page; // 获取当前页码
    currentPage += 1;
    var tips = "加载第" + currentPage + "页";
    console.log("load page " + currentPage);
    wx.showLoading({
      title: tips,
    })
    let dataStr = { "command": "getShopList", "tel": "15737954647", "ccode": that.data.twoId, "classify": 0, offset: currentPage, pagesize: 16, "latitude": that.data.latitude,"longtitude":that.data.longtitude};
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        wx.hideLoading();
        if (currentPage == 1) {
          wx.stopPullDownRefresh()
        }
        console.log(res.data.data)
        that.setData({
          ["dataArray[" + currentPage + "]"]: res.data.data.glist,
          offset: currentPage
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      oneId:options.id,
      twoId:options.code
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
    // this.requestFenlei();
    
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