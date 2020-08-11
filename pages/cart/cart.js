// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWX.js"

//引用es7 的语法引用，或者勾选增强编译
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: []
  },
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart");
    this.setData({
      address: address,
      cart: cart
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击收货地址
  async handleChooseAdress() {
    // wx.getSetting({
    //   success: (result) => {
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       wx.openSetting({
    //         success: (result3) => {
    //           console.log(result3)
    //         },
    //         fail: () => {},
    //         complete: () => {}
    //       });
    //     }
    //     console.log(result)
    //   }
    // });
    try {
      //1获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //2判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      const res2 = await chooseAddress();
      wx.setStorageSync("address", res2);
      console.log(res2);
    } catch (error) {
      console.log(error)
    }
  }
})