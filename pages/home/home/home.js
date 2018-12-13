
let appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[],
    offset:1
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
    this.requestInitProduct();
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
  // 加载首页数据
  requestInitProduct: function (){
    var that = this;
    var currentPage = 0;
    let dataStr = { "command": "geGoodsList", "tel": "15737954647", "orderby": 1, "type": 0, offset: currentPage + 1, pagesize: 16 };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    that.setData({
      dataArray:[]
    })
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({
      title: tips,
    })
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data.data)
        that.setData({
          ["dataArray[" + currentPage + "]"]: res.data.data.glist,
          offset: currentPage
        })
      }
    })
  },
  //上拉加载更多
  requestMoreProduct: function () {
    var that = this;
    var currentPage = that.data.offset; // 获取当前页码
     currentPage += 1;
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({
      title: tips,
    })
    let dataStr = { "command": "geGoodsList", "tel": "15737954647", "orderby": 1, "type": 0, offset: currentPage + 1, pagesize: 16 };
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        wx.hideLoading();
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
    this.requestInitProduct();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestMoreProduct();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})