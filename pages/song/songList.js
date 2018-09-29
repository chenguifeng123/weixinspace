var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hometeach: app.hometeach,
    songClassId: '',
    songImg : '',
    songList: []
  },

  playVedio: function (event){
    var name = event.currentTarget.dataset.name;
    var vedio = event.currentTarget.dataset.vedio;
    var allUrl = util.fillUrlParams('/pages/song/oneSong', {
      songName: name,
      songVedio: vedio
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  // 暂时全部加载,后续优化
  filterSongList : function(list){
    var filter = [];
    for(var index = 0; index < list.length; index ++){
      if(list[index].songClassId == this.data.songClassId)
        filter.push(list[index]);
    }
    this.setData({ songList: filter });
  },

  loadSongList: function () {
    var op = this;
    // 加载外教
    app.post('/weixin_songList/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        op.filterSongList(data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classId = options.songClassId;
    var img = options.songImg;
    this.setData({ 
      songClassId: classId,
      songImg: img
      });
    this.loadSongList();
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
    var allUrl = util.fillUrlParams('/pages/song/songList', {
      songClassId: op.data.songClassId,
      songImg: op.data.songImg
    });

    return {
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