var util = require('../../utils/util.js');
const app = getApp()

Page({

  data: {
    hometeach: app.hometeach,
    songClass: []
  },

  loadSongClass: function () {
    var op = this;
    // 加载外教
    app.post('/weixin_songClass/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        op.setData({ songClass: data });
      }
    });
  },

  songClick: function (event) {
    var index = event.currentTarget.dataset.index;
    var songClassId = event.currentTarget.dataset.class;
    var img = event.currentTarget.dataset.img;
    var allUrl = util.fillUrlParams('/pages/song/songList', {
      songClassId: songClassId,
      songImg : img
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSongClass();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})