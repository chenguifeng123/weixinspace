var util = require('../../utils/util.js');
const app = getApp()

Page({

  data: {
    name: '红提外教',
    author: '红提外教',
    poster:'https://www.hometeach.cn/img/logo.jpg',
    src: '',

    lessonList: [],
    lessonIndex: -1,
    lessonText: '',

    btnDisabled: [],

    bookId: 0,
    unitId : 0,
    book: util.book
  },

  loadVocieByBookAndUnit: function () {
    var op = this;
    // 加载课程
    app.getUrl('/wx/getLesson/' + op.data.bookId + "-" + op.data.unitId, function (data) {
      if (app.hasData(data)) {
        op.setData({ lessonList: data });
        op.initBtnStatus();
        if (op.data.lessonIndex == undefined)
          op.setData({ lessonIndex : 0 });
        //if (!!op.data.lessonIndex){
        op.initClick(op.data.lessonIndex);
        //}
      }
    });
  },

  lessonClick: function (event){
    var index = event.currentTarget.dataset.index;
    this.initClick(index);
  },

  initClick:function(index){
    var btnDisabled = this.data.btnDisabled;
    var lessonList = this.data.lessonList;
    index = typeof index == "string" ? Number(index) : index;
    btnDisabled[this.data.lessonIndex] = false;
    btnDisabled[index] = true;
    this.setData({
      lessonIndex: index,
      btnDisabled: btnDisabled,
      src: util.translateUrl(lessonList[index].voicePath),
      name: 'Lesson' + lessonList[index].lessonId,
      lessonText: lessonList[index].ponintsDesc
    });
  },

  initData: function (bookId, unitId, lessonIndex) {
    this.setData({
      bookId: bookId,
      unitId: unitId,
      lessonIndex: lessonIndex
    })
  },

  initBtnStatus:function(){
    var btnDisabled = [];
    for (var index = 0; index < this.data.lessonList.length; index++) {
      btnDisabled.push(false);
    }
    btnDisabled[this.data.lessonIndex] = true;
    this.setData({
      btnDisabled: btnDisabled
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options.bookId, options.unitId, options.lessonIndex);
    this.loadVocieByBookAndUnit();
  },

  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var op = this;
    var allUrl = util.fillUrlParams('/pages/my/voice', {
      bookId: op.data.bookId,
      unitId: op.data.unitId,
      lessonIndex: op.data.lessonIndex,
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