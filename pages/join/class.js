// pages/join/class.js
var util = require('../../utils/util.js');
const app = getApp()
import ageTemplate from '../common/age';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    childNumber : 1,
    age: util.kidAge,
    ageIndex: 1,
    btnDisabled:[],

    addBtnImg: 'classAddNum',
    minusBtnImg: 'classMinusNumDisable',

    price : util.price
  },

  addChildNumber:function(){
    var current = this.data.childNumber;
    if( current == 6) return;
    if (current == 5) {
      this.setData({ 
        addBtnImg: 'classAddNumDisable',
        minusBtnImg: 'classMinusNum'
        });
    }else{
      this.setData({
        minusBtnImg: 'classMinusNum',
      });
    }
    this.setData({ childNumber: current + 1});
  },

  minusChildNumber: function () {
    var current = this.data.childNumber;
    if (current == 1) return;
    if (current == 2){
      this.setData({ 
        addBtnImg: 'classAddNum',
        minusBtnImg: 'classMinusNumDisable' 
        });
    }else {
      this.setData({
        addBtnImg: 'classAddNum',
      });
    }
    this.setData({ childNumber: current - 1 });
  },

  ageConfirm: ageTemplate.ageConfirm,
  initClass: ageTemplate.initClass,

  joinClass:function(){
    var allUrl = util.fillUrlParams('/pages/join/setting', {
      //kidAge: this.data.age[this.data.ageIndex],
      kidAge: Number(this.data.ageIndex) + 3,
      kidNumber: this.data.childNumber
    });
    wx.navigateTo({
      url: allUrl
    });
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initClass();
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