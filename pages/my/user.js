var util = require('../../utils/util.js');
const app = getApp();
import contactTemplate from '../common/contact';

Page({
  data: {
    area: util.area,
    areaIndex: 0,
    userName: '',
    contact: '',
    address: ''
  },

  bindUserNameInput: contactTemplate.bindUserNameInput,
  bindContactInput: contactTemplate.bindContactInput,
  bindAddressInput: contactTemplate.bindAddressInput,
  bindAreaChange: contactTemplate.bindAreaChange,
  makeRequest: contactTemplate.makeRequest,
  checkInput: contactTemplate.checkInput,
  saveCache: contactTemplate.saveCache,
  getCache: contactTemplate.getCache,

  confirm: function () {
    var that = this
    var requestData = this.makeRequest(app);
    app.post('/wx/updateContact', requestData, function (data) {
      if (app.hasData(data)) {
        if (data >= 0) {
          that.saveCache();
          wx.showToast({
            title: '修改信息成功',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '修改信息失败',
            duration: 2000
          });
        }
        console.log(data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCache();
  },


});