// pages/category/category.js
import {
  request
}
from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuDatas: [],
    rightContents: [],
    isSelect: 1,
    //点击左侧菜单右侧重新回到顶部
    scrool_top: 0
  },
  Cates: [],
  onLoad: function () {
    //使用缓存技术
    const Cates = wx.getStorageSync("cates");
    //没有缓存
    if (!Cates) {
      this.getCates();
    } else {
      //有缓存，就取出来判断过期了没有
      let storageTime = wx.getStorageSync("cates").time;
      if (Date.now() - storageTime > 1000 * 60 * 10) {
        this.getCates();
      } else {
        console.log("使用旧的数据")
        this.Cates = Cates.data;
        //左边总的目录
        let leftMenuDatas = this.Cates.map(v => v.cat_name);
        //右边的具体内容
        let rightContents = this.Cates[0].children;
        this.setData({
          leftMenuDatas,
          rightContents
        })
      }
    }

  },
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   console.log(res);
    //   this.Cates = res.data.message;
    //   //请求成功存入缓存
    //   wx.setStorageSync("cates", {
    //     time: Date.now(),
    //     data: this.Cates
    //   });
    //   //左边总的目录
    //   let leftMenuDatas = this.Cates.map(v => v.cat_name);
    //   //右边的具体内容
    //   let rightContents = this.Cates[0].children;
    //   this.setData({
    //     leftMenuDatas,
    //     rightContents
    //   })
    // })
    //es7 的async await来发送请求
    const res = await request({
      url: "/categories"
    })
    console.log(res);
    this.Cates = res;
    //请求成功存入缓存
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });
    //左边总的目录
    let leftMenuDatas = this.Cates.map(v => v.cat_name);
    //右边的具体内容
    let rightContents = this.Cates[0].children;
    this.setData({
      leftMenuDatas,
      rightContents
    })
  },

  changeSrot(e) {
    console.log(e);
    const {
      index
    } = e.currentTarget.dataset;
    let rightContents = this.Cates[index].children;
    this.setData({
      isSelect: index,
      rightContents,
      scrool_top: 0
    })
  }
})