
let appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[],
    offset:0
  },
  gotoShangcheng:function(){
    wx.navigateTo({
      url: '../../shangcheng/home/shangchengHome',
    })
  },
  gotoProductDetail:function(e){
    wx.navigateTo({
      url: '../../shangcheng/productDetail/productDetail?gsid=' + e.currentTarget.dataset.gsid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestHome();
    this.requestProduct(0);
    //请求个人信息
    this.requestPersonalInformation();
  },
  requestHome: function () {
    var that = this;
    let dataStr = { "command": "getHomepage", "tel": "15737954647", "city": "北京市", "province": "北京市"};
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        console.log(res.data)
        // that.setData({
        //   products: res.data.data.glist
        // })
      }
    })
  },
  requestPersonalInformation: function () {
    var that = this;
    let dataStr = { "command": "getCorpUserDetail", "tel": "15737954647"};
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        console.log(res.data)
        appData.globalData.personalInformation = res.data.data
      }
    })
  },
  //加载商品数据
  requestProduct: function (page) {
    var that = this;
    var currentPage = page; // 获取当前页码
    currentPage += 1;
    var tips = "加载第" + currentPage + "页";
    console.log("load page " + currentPage);
    wx.showLoading({
      title: tips,
    })
    let dataStr = { "command": "geGoodsList", "tel": "15737954647", "orderby": 1, "type": 0, offset: currentPage, pagesize: 16 };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        wx.hideLoading();
        if (currentPage == 1){
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
    this.requestProduct(0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestProduct(this.data.offset);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})