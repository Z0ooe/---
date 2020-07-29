//Page Object
import {
  request
} from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   responseType: 'text',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取轮播图
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      console.log(result);

      this.setData({
        swiperList: result
      })
    })
  },
  //获取导航
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      console.log(result);
      this.setData({
        cateList: result
      })
    })
  },
  //获取楼层
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      console.log(result);
      this.setData({
        floorList: result
      })
    })
  }
});