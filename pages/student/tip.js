var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: util.book,

    btnDisabled: [],
    first: -1,
    index: -1
  },

  initBtn: function (data) {
    var btnDisabled = [];
    for (var i = 0; i < data.length; i++) {
      var oneBtn = [];
      for (var j = 0; j < data[i].unitIdList.length; j++) {
        oneBtn.push(false);
      }
      btnDisabled.push(oneBtn);
    }
    this.setData({
      btnDisabled: btnDisabled
    })
  },


  loadVoiceTips: function () {
    var op = this;
    // 加载课程
    app.getUrl('/wx/getBookId', function (data) {
      if (app.hasData(data)) {
        var bookList = data;
        op.initBtn(data);
        op.setData({ bookList: bookList });
      }
    });
  },

  unitClick: function (event) {
    var index = event.currentTarget.dataset.index;
    var first = event.currentTarget.dataset.first;
    var bookId = event.currentTarget.dataset.book;
    var unitId = event.currentTarget.dataset.unit;
    var btnDisabled = this.data.btnDisabled;
    var bookList = this.data.bookList;
    if (this.data.first != -1 && this.data.index != -1)
      btnDisabled[this.data.first][this.data.index] = false;
    btnDisabled[first][index] = true;
    this.setData({
      first: first,
      index: index,
      btnDisabled: btnDisabled,
    });

    var allUrl = util.fillUrlParams('/pages/my/voice', {
      bookId: bookId,
      unitId: unitId
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadVoiceTips();
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