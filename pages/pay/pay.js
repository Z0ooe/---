// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWX.js"

//引用es7 的语法引用，或者勾选增强编译
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart");
    cart = cart.filter(v => v[0].isChoosed);
    //every 数组方法 遍历 会接收一个回调函数 如果每一个回调函数的返回值都为true every的返回值就为true
    //只要有一个是false直接返回false 
    //但是 空数组调用every返回值为true
    // const allChecked = cart.length ? cart.every(v => v[0].isChoosed) : false;
    this.setData({
      address
    })

    //加载购物车
    let totalPrice = 0;
    let totalNum = 0;
    console.log(cart);
    cart.forEach(v => {
      totalPrice += v[0].num * v[0].pics_id;
      totalNum += v[0].num;
    });
    this.setData({
      totalPrice,
      totalNum,
      cart
    })
  },
  // 判断缓存中有没有token，没有就先去获取，
  // 获取token需要code，code在wx- login里面拿
  async handlePay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth'
      });
      return;
    }
  }
})