var util = require('../../utils/util.js');
const app = getApp();
import contactTemplate from '../common/contact';

Page({
  data: {
    area: util.area,
    areaIndex: 0,
    userName : '',
    contact : '',
    address : '',
    kidAge : 4,
    kidNum : 5,
  },

  bindUserNameInput: contactTemplate.bindUserNameInput,
  bindContactInput: contactTemplate.bindContactInput,
  bindAddressInput: contactTemplate.bindAddressInput,
  bindAreaChange: contactTemplate.bindAreaChange,
  makeRequest: contactTemplate.makeRequest,
  checkInput: contactTemplate.checkInput,
  saveCache: contactTemplate.saveCache,
  getCache: contactTemplate.getCache,

  go: function () {
    this.setData({
      showModal: false
    })
  },

  confirm : function(){
    var that = this
    if (!this.checkInput()) return;
    var requestData = this.makeRequest(app);
    requestData["childAge"] = this.data.kidAge;
    requestData["minNum"] = this.data.kidNum;
    app.post('/wx/addJoinClass', requestData, function (data) {
      if (app.hasData(data)) {
        if (data == -1) {
          wx.showToast({
            title: '发起拼班失败',
            duration: 2000
          });
        } else {
          that.saveCache();
          wx.showToast({
            title: '发起拼班成功',
            duration: 2000
          });

          var allUrl = util.fillUrlParams('/pages/join/success', {
            classId: data,
            kidNum: that.data.kidNum
          });
          wx.navigateTo({
            url: allUrl
          });
          //wx.navigateTo({
          //  url: '/pages/join/classList'
          //});

        }
        console.log(data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var age = options.kidAge;
    var num = options.kidNumber;
    this.setData({
      kidAge: age,
      kidNum : num
    })
    this.getCache();
  },

 
});