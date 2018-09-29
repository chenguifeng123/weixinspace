var util = require('../../utils/util.js');
const app = getApp();
import contactTemplate from '../common/contact';
import ageTemplate from '../common/age';

Page({
  data: {
    area: util.area,
    areaIndex: 0,
    userName: '',
    contact: '',
    address: '',

    age: util.kidAge,
    ageIndex: 1,
    btnDisabled: [],

    classId:0
  },

  ageConfirm: ageTemplate.ageConfirm,
  initClass: ageTemplate.initClass,

  bindUserNameInput: contactTemplate.bindUserNameInput,
  bindContactInput: contactTemplate.bindContactInput,
  bindAddressInput: contactTemplate.bindAddressInput,
  bindAreaChange: contactTemplate.bindAreaChange,
  makeRequest: contactTemplate.makeRequest,
  checkInput: contactTemplate.checkInput,
  saveCache: contactTemplate.saveCache,
  getCache: contactTemplate.getCache,

  confirm: function () {
    var that = this;
    if (!this.checkInput()) return;
    var requestData = this.makeRequest(app);
    requestData["childAge"] = Number(this.data.ageIndex) + 3;
    requestData["classId"] = this.data.classId;
    app.post('/wx/addJoinPerson', requestData, function (data) {
      if (app.hasData(data)) {
        if(data == -2){
          wx.showToast({
            title: '已经参加过拼班,不能继续拼班',
            duration: 2000
          });
        }
        else if (data == -1) {
          wx.showToast({
            title: '加入班级失败',
            duration: 2000
          });
        } else {
          that.saveCache();
          wx.showToast({
            title: '加入班级成功',
            duration: 2000
          });
          wx.navigateBack();
        }
        console.log(data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classId = options.classId;
    this.setData({
      classId: classId
    });
    this.initClass();
    this.getCache();
  },


});