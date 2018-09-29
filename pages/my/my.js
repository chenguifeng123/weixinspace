const app = getApp()
var util = require('../../utils/util.js');
import contactTemplate from '../common/contact';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    hiddenmodalput : true,
    globalStudentId : 0
  },

  // 取消
  studentInputCancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  // 确认  
  studentInputConfirm: function (event) {

    if (!this.data.globalStudentId || this.data.globalStudentId.length < 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位编号',
        showCancel: false,
        confirmText: '确认',
        success: function (res) {
        }
      })
      return;
    }

    this.setData({
      hiddenmodalput: true
    });
    // 加载学员信息
    var op = this;
    var getStudentUrl = '/wx/getStudent/' + this.data.globalStudentId;
    app.getUrl(getStudentUrl, function (data) {
      if (app.hasData(data)) {
        if (!!data.globalId){
          wx.setStorageSync('studentId', data.globalId);
          wx.setStorageSync('studentName', data.studentName);
          op.studentLogin();
        }else{
          wx.showToast({
            title: '学员不存在',
            duration: 2000
          });
        }
      }
    });
  },
  // 学员输入
  studentInput : function(event){
    var student = event.detail.value;
    this.setData({
      globalStudentId: student
    });
  },

  // 学员登录
  studentLogin : function(){
    var currentStudentId = wx.getStorageSync('studentId');
    // 学生已登录
    if (currentStudentId != '') {
      var currentStudentName = wx.getStorageSync('studentName');
      var allUrl = util.fillUrlParams('/pages/student/student', {
        studentId: currentStudentId,
        studentName: currentStudentName
      });
      wx.navigateTo({
        url: allUrl
      });
    }else{
      // 弹出学员输入提示框
      this.setData({
        hiddenmodalput: false
      });
    }
  },

  // 跳转到用户信息的设置
  setUserInfo:function(){
    wx.navigateTo({
      url: '/pages/my/user'
    });
  },

  clearCache: contactTemplate.clearCache,

  // 暂时做个清空
  clear : function(){
    var op = this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗?',
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('studentId', '');
          wx.setStorageSync('studentName', '');
          op.clearCache();
          wx.showToast({
            title: '已退出',
            duration: 2000
          });
        } else if (res.cancel) {
          console.log('User canceld')
        }
      }
    })
  },

  joinDetail: function(){
    wx.navigateTo({
      url: '/pages/join/detail'
    });
  },

  // 微信登录
  wxUserInit : function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  jumpContact:function(){
    wx.navigateTo({
      url: '/pages/my/contact'
    });
  },

  jumpSales: function(){

    wx.navigateToMiniProgram({
      appId: 'wx0225a83961d59938',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    });
    /*
    wx.navigateTo({
      url: '/pages/my/sales'
    });
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxUserInit();

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