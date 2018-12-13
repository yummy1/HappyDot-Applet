
let appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: null,
    heji: 0,
    selectedNum: 0,
    isAllSelected:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
  },
  requestData:function(){
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    let dataStr = { "command": "getShopcartList", "tel": "15737954647", "uid": appData.globalData.personalInformation.uid};
    console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
    wx.request({
      url: appData.globalData.urlStr,
      data: {
        data: JSON.stringify(dataStr)
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data.data)
        var datas = res.data.data.sclist;
        for (var i=0; i < datas.length; i++) {
          var shop = datas[i];
          shop.selected = false;
          for (var j=0; j < datas[i].goodss.length; j++) {
            var product = datas[i].goodss[j];
            product.selected = false;
          }
        }
        that.setData({
          shopList: datas,
        })
      }
    })
  },
  // 选择
  dianpuSelectedAction:function(e){
    var index = e.currentTarget.dataset.index;
    var datas = this.data.shopList;
    var shop = datas[index];
    shop.selected = !shop.selected;
    for (var i = 0; i < shop.goodss.length; i++) {
      var product = shop.goodss[i];
      product.selected = shop.selected;
    }
    this.setData({
      shopList: datas,
    })
    this.totalPrice();
  },
  productSelectedAction: function (e) {
    var shopIndex = e.currentTarget.dataset.sid;
    var productIndex = e.currentTarget.dataset.pid;
    var datas = this.data.shopList;
    var shop = datas[shopIndex];
    var product = shop.goodss[productIndex];
    product.selected = !product.selected;
    var count = 0;
    for(var i=0;i < shop.goodss.length;i++){
      if (shop.goodss[i].selected == true){
        count += 1;
      }
    }
    if (count == shop.goodss.length){
      shop.selected = true;
    }else{
      shop.selected = false;
    }
    this.setData({
      shopList: datas,
    })
    this.totalPrice();
  },
  AllSelectedAction: function () {
    this.setData({
      isAllSelected: !this.data.isAllSelected,      
    })
    var datas = this.data.shopList;
    for (var i = 0; i < datas.length; i++) {
      var shop = datas[i];
      shop.selected = this.data.isAllSelected;
      for (var j = 0; j < shop.goodss.length; j++) {
        var product = datas[i].goodss[j];
        product.selected = this.data.isAllSelected;
      }
    }
    this.setData({
      shopList: datas,
    })
    this.totalPrice();
  },
  totalPrice:function(){
    var datas = this.data.shopList;
    var price = 0;
    for (var i = 0; i < datas.length; i++) {
      var shop = datas[i];
      for (var j = 0; j < shop.goodss.length; j++) {
        var product = shop.goodss[j];
        if (product.selected == true){
          price += product.price * product.num;
        }
      }
    }
    this.setData({
      heji: price,
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