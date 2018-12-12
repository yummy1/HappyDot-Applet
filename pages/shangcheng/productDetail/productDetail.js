
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gsid: 0,
    productDetail:null,
    pics:[],
    index: 1,
    tuwenPics:[],
    isShowSelected:false,
    selectedModel:null,
    selectedColor:"",
    selectedSize:"",
    num:1
  },
  requestProductDetail: function () {
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    let dataStr = { "command": "getGoodsDetail", "tel": "15737954647", "gsid": that.data.gsid};
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
          productDetail: res.data.data,
          pics: res.data.data.pic.split(",")
        })
      }
    })
  },
  lookDetails:function(e){
    console.log(e);
    this.setData({
      index : e.currentTarget.dataset.idx
    })
  },
  AddToCart:function(){
    if (this.data.selectedColor == "" && this.data.productDetail.colors.length > 0){
      wx.showToast({
        title: '请先选择颜色',
        icon: 'none'
      })
    } else if (this.data.selectedSize == "" && this.data.productDetail.specs.length > 0){
      wx.showToast({
        title: '请先选择尺寸',
        icon: 'none'
      })
    }else{
      var that = this;
      let dataStr = { "command": "addOrDelShopcart", "tel": "15737954647", "gsid": this.data.selectedModel.gsid, "num": this.data.num,"tp":1};
      console.log('url:' + appData.globalData.urlStr + "?data=" + JSON.stringify(dataStr));
      wx.request({
        url: appData.globalData.urlStr,
        data: {
          data: JSON.stringify(dataStr)
        },
        success(res) {
          wx.showToast({
            title: '加入购物车成功',
          })
          that.setData({
            isShowSelected: false
          })
        }
      })
    }
  },
  
  showSelectColor:function(){
    this.setData({
      isShowSelected: true
    })
  },
  closeAction:function(){
    this.setData({
      isShowSelected: false
    })
  },
  selectColorAction:function(e){
    console.log(e);
    this.setData({
      selectedColor:e.currentTarget.dataset.color,
    })
    if (this.data.productDetail.specs.length == 0) {
      for (var i=0; i < this.data.productDetail.alllist.length; i++) {
        if (this.data.productDetail.alllist[i].color == this.data.selectedColor) {
          this.setData({
            selectedModel: this.data.productDetail.alllist[i]
          })
        }
      }
    } else if (this.data.selectedSize != "") {
      for (var i=0; i < this.data.productDetail.alllist.length; i++) {
        if (this.data.productDetail.alllist[i].color == this.data.selectedColor && this.data.productDetail.alllist[i].spec == this.data.selectedSize) {
          this.setData({
            selectedModel: this.data.productDetail.alllist[i]
          })
        }
      }
    }
  },
  selectSizeAction:function(e){
    console.log(e);
    this.setData({
      selectedSize: e.currentTarget.dataset.size,
    })
    if (this.data.productDetail.colors.length == 0) {
      for (var i=0; i < this.data.productDetail.alllist.length; i++) {
        if (this.data.productDetail.alllist[i].spec == this.data.selectedSize) {
          this.setData({
            selectedModel: this.data.productDetail.alllist[i]
          })
        }
      }
    } else if (this.data.selectedColor != "") {
      for (var i=0; i < this.data.productDetail.alllist.length; i++) {
        if (this.data.productDetail.alllist[i].color == this.data.selectedColor && this.data.productDetail.alllist[i].spec == this.data.selectedSize) {
          this.setData({
            selectedModel: this.data.productDetail.alllist[i]
          })
        }
      }
    }
  },
  jianAction:function(){
    if(this.data.num > 1){
      var num = this.data.num;
      num -= 1;
      this.setData({
        num: num
      })
    }

  },
  jiaAction:function(){
    var num = this.data.num;
    num += 1;
    this.setData({
      num: num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      gsid: options.gsid
    })
    this.requestProductDetail();
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