
let appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],
    ccode : "",
    orderby:1,
    priceText: "价格",
    priceIcon: "/images/shangjialiebiao_03.png",
    offset: 0
  },
  // 按人气排序
  renqiAction:function(){
    this.setData({
      orderby:1,
      priceText: "价格", 
      priceIcon: "/images/shangjialiebiao_03.png"
    })
    this.requestInitProduct();
  },
  // 按销量排序
  xiaoliangAction:function(){
    this.setData({
      orderby: 2,
      priceText: "价格",
      priceIcon: "/images/shangjialiebiao_03.png"
    })
    this.requestInitProduct();
  },
  // 按价格排序
  jiageAction:function(){
    console.log(this.data.orderby);
    if(this.data.orderby == 3){
      console.log("价格升");
      this.setData({
        orderby: 4,
        priceText: "价格升",
        priceIcon: "/images/shangjialiebiao_07.png"
      })
    }else{
      console.log("价格降");
      this.setData({
        orderby: 3,
        priceText: "价格降",
        priceIcon: "/images/shangjialiebiao_05.png"
      })
    }
    this.requestInitProduct();
  },
  // 跳转商品详情
  gotoProductDetail: function (e) {
    wx.navigateTo({
      url: '../productDetail/productDetail?gsid=' + e.currentTarget.dataset.gsid,
    })
  },
  // 请求商品数据
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
      ccode:options.ccode
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.requestProduct(0);
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