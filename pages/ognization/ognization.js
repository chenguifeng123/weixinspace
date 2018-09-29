const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播URL和图片用来做广告栏
    imgUrls: [
      {
        link: '/pages/ognization/ognization',
        url: "/pages/img/banner-og1.jpg"
      }
    ],
    // 轮播控制项
    indicatorDots: true,
    autoplay: true,
    interval: 5000,  // 轮播间隔
    duration: 1000,

    orgnizationList: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var op = this;
    // 加载外教
    app.post('/ognization/showEntitys', {}, function (data) {
      if (app.hasData(data)) {
        op.setData({ orgnizationList: data });
      }
    });
  },

  calling: function (event) {
    var call = event.currentTarget.dataset.call;
    wx.makePhoneCall({
      phoneNumber: call, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  /**
   * 监听定位到当前位置
   */
  listenerBtnGetLocation: function (longi, lati, addr) {
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        wx.openLocation({
          //当前经纬度
          latitude: lati, //res.latitude,
          longitude: longi, //res.longitude,
          //缩放级别默认28
          scale: 28,
          //位置名
          name: '红提外教',
          //详细地址
          address: addr,
          //成功打印信息
          success: function (res) {
            console.log(res)
          },
          //失败打印信息
          fail: function (err) {
            console.log(err)
          },
          //完成打印信息
          complete: function (info) {
            console.log(info)
          },
        })

      },
      fail: function (err) {
        console.log(err)
      },
      complete: function (info) {
        console.log(info)
      },
    })
  },

  jumpMap : function(event){
    var position = event.currentTarget.dataset.position;
    position = position == undefined ? "118.78198,32.069726" : position;
    var splits = position.split(",");
    var longitude = parseFloat(splits[0]);
    var latitude = parseFloat(splits[1]);
    var address = event.currentTarget.dataset.address;
    this.listenerBtnGetLocation(longitude, latitude, address);
  }

})