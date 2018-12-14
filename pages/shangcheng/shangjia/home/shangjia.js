let appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upData:[],
    lowData:[]
  },
  requestData:function(){
    var that = this;
    let data = { "command": "getShopCatogoryList", "tel": "15737954647", "tp": 1 };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(data));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: data
      },
      success(res) {
        console.log(res.data.data)
        var upperpart = res.data.data.upperpart
        upperpart.splice(6, upperpart.length - 6)
        that.setData({
          upData: upperpart,
          lowData: res.data.data.lowerpart
        })
      }
    })
  },
  // 跳转列表页
  gotoListAction:function(){
    wx.navigateTo({
      url: '../list/shangjiaList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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