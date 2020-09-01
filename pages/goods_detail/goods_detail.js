// pages/goods_detail/goods_detail.js
//1发送请求获取数据
//2点击轮播图预览大图
//2.1给轮播图绑定点击事件
//2.2调用小程序API previewImage
//3加入购物车 写进本地缓存
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
    goodsObj: {}
  },
  //商品对象
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.goodsInfo = goodsObj.pics;
    this.setData({
      goodsObj: {
        pics: goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
    console.log(goodsObj);
  },


  //点击轮播图放大预览
  handlePrevewImage(e) {
    const urls = this.goodsInfo.map(v => v.pics_mid);
    const current = e.target.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //加入购物车
  handleCartAdd() {
    //刚开始如果为空的时候给一个格式
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v[0].goods_id == this.goodsInfo[0].goods_id);
    console.log(index)
    if (index == -1) {
      //不存在，是第一次添加
      this.goodsInfo[0].num = 1;
      // this.goodsInfo[6] = 1;
      cart.push(this.goodsInfo);
      // console.log("1");
      // console.log(JSON.stringify(cart))
      //添加选择状态
      this.goodsInfo[0].isChoosed = true;
    } else {
      cart[index][0].num++;
      console.log(cart[index][0].num);
    }
    wx.setStorageSync("cart", cart);
    console.log(cart)
    wx.showToast({
      title: '加入购物车成功',
      duration: 1500,
      mask: true
    });
  }
})