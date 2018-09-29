var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 轮播URL和图片用来做广告栏
    imgUrls: "/pages/img/class-banner.jpg",

    classId : 0,
    className : '',
    lastNum : 0,
    currentNum : 0,
    lastNumList : [],
    minNum : 0,
    currentPersonList : [],
    price: util.price,

    pageJoinClass: []             // 一页显示的拼班
  },

  loadJoinPersonInClass: function () {
    var op = this;
    var classId = op.data.classId;
    // 
    app.getUrl('/wx/getJoinClassById/' + classId, function (data) {
      if (app.hasData(data)) {
        op.setData({ className: data != null ? data.className : '' });
      }
    });
    app.getUrl('/wx/getJoinPersonByClass/' + classId, function (data) {
      if (app.hasData(data)) {

        var current = data.length;
        var last = op.data.minNum - current;
        //var lastNumList = new Array(last); 此方法不行不知为何
        var lastNumList = [];
        for (var index = 0; index < last; index++)
          lastNumList.push(index);
        op.setData({
          currentNum: current,
          lastNum: last,
          lastNumList: lastNumList,
          currentPersonList: data
        })
      }
    });
  },

  checkThenJoined : function(event){
    var op = this;
    if (op.data.lastNum <= 0){
      wx.showToast({
        title: '当前拼班已满',
        duration: 2000
      });
      return;
    }
    var classId = op.data.classId;
    app.getUrl('/wx/hasPersonJoined/' + classId + "-" + app.userCode, function (data) {
      if (app.hasData(data)) {
        //op.joinPerson();
        if(data == true){
          wx.showToast({
            title: '我已参加过拼班',
            duration: 2000
          });
        }else{
          op.joinPerson(event);
        }
      }
    });
  },

  joinPerson:function(event){
    var that = this;
    app.joinConfirm(event, function () {
      var allUrl = util.fillUrlParams('/pages/join/person', {
        classId: that.data.classId
      });
      wx.navigateTo({
        url: allUrl
      });
    });

  },

  joinClass: function (event) {
    app.joinConfirm(event, function () {
      wx.navigateTo({
        url: '/pages/join/class'
      })
    });
  },

  backHome:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  initData: function (classId, minNum){
    this.setData({
      classId: classId,
      minNum: minNum
    })
  },

  loadJoinClassList : function(){
    var op = this;
    app.getUrl('/wx/getNewAllJoinClass', function (data) {
      if (app.hasData(data)) {
        var arr = data.slice(0, 10);
        op.setData({ pageJoinClass: arr });
      }
    });
  },

  oneJoinClass: function (event) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options.classId, options.minNum);
    this.loadJoinClassList();
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
    this.loadJoinPersonInClass();
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
  onShareAppMessage: function (res) {
    var name = '我';
    if(!! app.globalData.userInfo )
      name = app.globalData.userInfo.nickName;
    var op = this;
    var allUrl = util.fillUrlParams('/pages/join/oneClass', {
      classId: op.data.classId,
      minNum: op.data.minNum
    });

    return {
      title: '快来加入' + name + '的红提外教拼班',
      path: allUrl,
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})