
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[]
  },
  gotoFenlei:function(e){
    wx.navigateTo({
      url: '../fenleiProduct/fenleiProduct?ccode=' + e.currentTarget.dataset.ccode + "&name=" + e.currentTarget.dataset.name,
    })
  },
  requestData:function(){
    var that = this;
    let dataStr = { "command": "getGoodsCatogoryList", "tel": "15737954647", "tp": 1 };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          fenlei: res.data.data.clist
        })
      }
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