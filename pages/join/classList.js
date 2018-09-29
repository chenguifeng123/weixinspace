// pages/join/class.js
var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinClassList: []
  },

  loadJoinClass : function(){
    var op = this;
    // 加载学员班级
    app.getUrl('/wx/getNewAllJoinClass', function (data) {
      if (app.hasData(data)) {
        op.setData({ joinClassList: data });
      }
    });
  },

  joinPerson: function (event) {
    var classId = event.currentTarget.dataset.class;
    var minNum = event.currentTarget.dataset.minnum;
    var allUrl = util.fillUrlParams('/pages/join/oneClass', {
      classId : classId,
      minNum: minNum
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  joinClass:function(event){
    app.joinConfirm(event, function () {
      wx.navigateTo({
        url: '/pages/join/class'
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.loadJoinClass();
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
    this.loadJoinClass();
    wx.stopPullDownRefresh();
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
    console.log(1)
  }
})