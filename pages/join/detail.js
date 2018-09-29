// pages/join/class.js
var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    hasJoin : false,
    person : {}
  },

  // 微信界面初始化
  initWxBase: function () {
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadJoinClass();
  },

  loadJoinClass: function () {
    var op = this;
    // 加载拼班详情
    app.getUrl('/wx/getJoinClassByOpenId/' + app.userCode, function (data) {
      if (app.hasData(data)) {
        op.setData({ person: data, hasJoin:data.length == 0 ? false : true });
      }
    });
  },

  jumpOneClass:function(event){
    var classId = event.currentTarget.dataset.class;
    var minNum = event.currentTarget.dataset.minnum;
    var allUrl = util.fillUrlParams('/pages/join/oneClass', {
      classId: classId,
      minNum: minNum
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  cancelJoinPerson: function (event){
    var personId = event.currentTarget.dataset.person;
    var isStarter = event.currentTarget.dataset.start;
    if(isStarter == 1){
      wx.showToast({
        title: '发起人不能取消班级',
        duration: 2000
      });
    }
    var op = this;
    app.deleteUrl('/wx/deleteJoinPerson/' + personId, function (data) {
      if (app.hasData(data)) {
        if (data != -1) {
          wx.showToast({
            title: '取消拼班成功',
            duration: 2000
          });
          op.loadJoinClass();
        } else {
          wx.showToast({
            title: '取消拼班失败',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initWxBase();
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