// pages/goods_list/goods_list.js
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
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goods_list: [],
  },
  queryParams: {
    "query": '',
    "cid": '',
    "pagenum": 1,
    "pagesize": 10
  },
  totalPages: 1,
  //标题点击事件，从子组件传过来的
  handleTabsItmeChange(e) {
    console.log(e)
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParams
    });
    console.log(res);
    const total = res.total;
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    this.setData({
      goods_list: [...this.data.goods_list, ...res.goods]
    })
    wx.stopPullDownRefresh();
  },

  onLoad: function (options) {
    console.log(options);
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  onReachBottom: function () {
    console.log("onReachBottom")
    if (this.queryParams.pagenum >= this.totalPages) {
      //console.log("没有下一页")
      wx.showToast({
        title: '没有下一页数据'
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  onPullDownRefresh: function () {
    wx.showToast({
      title: '上拉'
    });
    this.queryParams.pagenum = 1;
    this.setData({
      goods_list: [],
    })
    this.getGoodsList();
  }


})