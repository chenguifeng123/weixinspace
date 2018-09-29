var util = require('../../utils/util.js');
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["班级信息", "学习记录"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    userInfo: app.globalData.userInfo,
    book: util.book,

    btnDisabled: [],
    first: -1,
    index: -1
  },

  // TAB页设置,系统默认处理
  setTab : function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // tab页点击,系统默认处理
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  // 微信界面初始化
  initWxBase :function(){
    this.setData({ userInfo: app.globalData.userInfo });
    this.setTab();
  },

  trans : function(teachingType){
    var tran = teachingType == undefined ? 0 : teachingType;
    return util.translate(util.teachingType, tran);
  },

  // 加载学员信息
  loadUserData : function(studentId){
    var op = this;
    // 加载学员班级
    app.getUrl('/wx/getGrade/' + studentId, function (data) {
      if (app.hasData(data)) {
        var gradeList = [
          { name: '班级名称', value: data['className']},
          { name: '班级类型', value: util.translate(util.classType, data['classType']) },
          { name: '学员人数', value: data['kidsNumber'] },
          { name: '当前教材', value: util.translate(util.book, data['currentBook']) },
          { name: '老师姓名', value: data['teacherName'] },
          { name: '上课时间', value: data['teachingTime'] },
          { name: '上课地址', value: data['address'] },
          { name: '总课时数', value: data['classNumber'] },
          { name: '剩余课时', value: data['remainClassNumber'] },
          { name: '开始时间', value: data['startTime'] },
          { name: '班主任  ', value: data['teachingAssistant'] }
        ];
        op.setData({ grade: gradeList });
      }
    });
    // 加载学员学习记录
    app.getUrl('/wx/getTeaching/' + studentId, function (data) {
      if (app.hasData(data)) {
        var teach = data;
        for(var index = 0; index < teach.length; index++)
          teach[index]["teachingType"] = op.trans(teach[index]["teachingType"]);
        op.setData({ teaching: data });
      }
    });
  },

  initBtn: function (data) {
    var btnDisabled = [];
    for (var i = 0; i < data.length; i ++){
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


  loadVoiceTips:function(){
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
    if(this.data.first != -1 && this.data.index != -1)
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
  var studentId = options.studentId;
  var studentName = options.studentName;
  this.initWxBase();
  this.loadUserData(studentId);
  this.loadVoiceTips();
  //this.loadUserData('20170250001');
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