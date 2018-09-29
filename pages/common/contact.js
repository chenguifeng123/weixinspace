var contact = {
  bindUserNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  bindContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  bindAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  bindAreaChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      areaIndex: e.detail.value
    })
  },

  makeRequest: function (app) {
    var nickName = undefined;
    var iconPath = undefined;
    if (!!app.globalData.userInfo) {
      nickName = app.globalData.userInfo.nickName;
      iconPath = app.globalData.userInfo.avatarUrl;
    }

    return {
      contactName: this.data.userName,
      phoneNumber: this.data.contact,
      area: this.data.area[this.data.areaIndex],
      address: this.data.address,

      openid: app.userCode,  // 这边是code在服务端进行转换
      nickName: nickName,
      iconPath: iconPath
    }
  },

  checkInput: function () {
    if (!this.data.userName || this.data.userName.length < 1) {
      this.setData({ showTopTips: '联系人不能为空' });
      return false;
    }
    if (!this.data.contact || this.data.contact.length < 8) {
      this.setData({ showTopTips: '手机不能为空' });
      return false;
    }
    if (!this.data.address || this.data.address.length == 0) {
      this.setData({ showTopTips: '详细地址不能为空' });
      return false;
    }
    return true;
  },

  saveCache: function(){
    wx.setStorageSync('userName', this.data.userName);
    wx.setStorageSync('contact', this.data.contact);
    wx.setStorageSync('address', this.data.address);
    wx.setStorageSync('areaIndex', this.data.areaIndex);
  },

  clearCache:function(){
    wx.setStorageSync('userName', '');
    wx.setStorageSync('contact', '');
    wx.setStorageSync('address', '');
    wx.setStorageSync('areaIndex', '');
  },

  getCache: function(){
    var areaindex = wx.getStorageSync('areaIndex');
    areaindex = areaindex == ''? 0 : areaindex;
    this.setData({
      userName: wx.getStorageSync('userName'),
      contact: wx.getStorageSync('contact'),
      address: wx.getStorageSync('address'),
      areaIndex: areaindex
    });
  }
};

export default contact;