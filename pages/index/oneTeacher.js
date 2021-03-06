var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var op = this;
    this.setData({
      oneTeacher : {
        lastName: options.lastName,
        photo: util.translateUrl(options.photo),
        gender: options.gender,
        teachingExperience: util.translate(util.teachingExperience, options.teachingExperience),
        introduction: !!options.introduction ? options.introduction : '',
        teachingTime: options.teachingTime,
        teachingArea: options.teachingArea
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
    var op = this;
    var allUrl = util.fillUrlParams('/pages/index/oneTeacher', {
      lastName: op.data.oneTeacher.lastName,
      photo: op.data.oneTeacher.photo,
      teachingExperience: op.data.oneTeacher.teachingExperience,
      introduction: op.data.oneTeacher.introduction,
      teachingTime: op.data.oneTeacher.teachingTime,
      teachingArea: op.data.oneTeacher.teachingArea
    });

    return {
      title: '快来加入红提外教',
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