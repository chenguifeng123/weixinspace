const app = getApp()
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hometeach: app.hometeach,
    teacherList: []
  },

  oneTeacher: function (event) {
    var index = event.currentTarget.dataset.index;
    var allUrl = util.fillUrlParams('./oneTeacher', this.data.teacherList[index]);
    wx.navigateTo({
      url: allUrl
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var op = this;
    // 加载外教
    app.post('/teacher/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        op.setData({ teacherList: data });
      }
    });
  }

})