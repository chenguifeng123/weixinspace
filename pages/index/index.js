const app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播URL和图片用来做广告栏
    imgUrls: [
      {
        link: '/pages/index/intro',
        url: "/pages/img/banner-main1.jpg",
        isTab : false,
      }
      /*
      , {
        link: '/pages/join/classList',
        url: "/pages/img/banner-main2.jpg",
        isTab : true
      }
      */
    ],
    // 轮播控制项
    indicatorDots: true,
    autoplay: true,
    interval: 5000,  // 轮播间隔
    duration: 1000,

    hometeach : app.hometeach,  // 请求的URL根路径
    // 老师显示
    onePageTeacherSize : 3,     // 一页显示的数目(老师和班级)
    teacherList : [],           // 老师信息
    pageTeacher : [],           // 一页显示的老师

    // 班级显示
    gradeList: [],             // 班级信息
    currentGradeIndex : 0,      // 拼班的当前信息
    pageGrade : [],              // 一页班级的情况

    joinClassList: [],            // 暂时先一次加载完
    pageJoinClass :[]             // 一页显示的拼班
  },

  // 一页教师显示的内容
  fillTeacherByOnePage : function(teacher){
    var array = teacher.slice(0, this.data.onePageTeacherSize);
    this.setData({ pageTeacher: array });
  },

  // 一页拼班的内容
  fillJoinClassByOnePage: function (joinClass) {
    var array = joinClass.slice(0, this.data.onePageTeacherSize);
    this.setData({ pageJoinClass: array });
  },

  // 一页班级显示的内容
  setPageGrade : function(){
    var length = this.data.gradeList.length;
    var pageSize = this.data.onePageTeacherSize;
    var index = this.data.currentGradeIndex;

    var start = index; // pageSize * index;
    if (start >= length) start = index = 0;
    var array = this.data.gradeList.slice(start, start + pageSize);
    if (array.length < pageSize) array = array.concat(
      this.data.gradeList.slice(0, pageSize - array.length));
    this.setData({ pageGrade: array });
    this.setData({ currentGradeIndex: index + 1 });
  },

  // ID和名称关联
  getTeacherNameById(teacher, teacherId){
    for(var index = 0; index < teacher.length; index ++){
      if (teacher[index].teacherId == teacherId) return teacher[index].lastName;
    }
    return teacherId;
  },

  // 更多老师列表
  moreTeacher : function(event){
    wx.navigateTo({
      url: './allTeacher'
    })
  },

  oneTeacher : function(event){
    var index = event.currentTarget.dataset.index;
    var allUrl = util.fillUrlParams('./oneTeacher', this.data.pageTeacher[index]);
    wx.navigateTo({
      url: allUrl
    });
  },

  // 更多拼班列表
  moreJoinClass: function (event) {
    wx.navigateTo({
      url: '/pages/join/classList'
    })
  },

  // 跳转单个拼班
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

  // 发起拼班
  joinClass : function(event){
    app.joinConfirm(event, function(){
      wx.navigateTo({
        url: '/pages/join/class'
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var op = this;
    // 加载外教
    app.post('/teacher/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        data = data.reverse();
        op.setData({ teacherList: data });
        op.fillTeacherByOnePage(data);
        // 函数写两次 -- 保证能够正确翻译
      }
    });
    // 加载班级
    app.post('/grade/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        op.setData({ gradeList: data });
        op.setPageGrade(0);
      }
    });
    // 定时显示拼班信息
    op.setPageGrade();
    setInterval(function(){
      op.setPageGrade();
    }, 2000); 

    // 一次性全部加载完 所有拼班 -- 临时写,后续可以优化只取3条
    app.getUrl('/wx/getNewAllJoinClass', function (data) {
      if (app.hasData(data)) {
        op.setData({ joinClassList: data });
        op.fillJoinClassByOnePage(data);
      }
    });
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

  },

  click: function () {
    
  }
})