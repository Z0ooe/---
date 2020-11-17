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
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];

    //every 数组方法 遍历 会接收一个回调函数 如果每一个回调函数的返回值都为true every的返回值就为true
    //只要有一个是false直接返回false 
    //但是 空数组调用every返回值为true
    // const allChecked = cart.length ? cart.every(v => v[0].isChoosed) : false;
    this.setData({
      address
    })

    //加载购物车
    this.cartSet(cart);

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
  },

  //列表单选框点击事件
  handleItemChange(e) {
    //获取被修改的商品id
    // console.log(e.currentTarget.dataset.id);
    let goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {
      cart
    } = this.data;
    // let cart1 = this.data.cart;
    // console.log(cart);
    // console.log('cart1' + cart1);
    //找到被修改的商品对象
    let index = cart.findIndex(v => v[0].goods_id === goods_id);
    // console.log(index);
    cart[index][0].isChoosed = !cart[index][0].isChoosed;
    this.cartSet(cart);
  },
  //设置购物车状态同时，重新计算底部工具栏的数据：全选，总价格，购买的数量
  cartSet(cart) {
    //底部的总价格 总数量 商品被选中的时候才计算
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v[0].isChoosed) {
        totalPrice += v[0].num * v[0].pics_id;
        totalNum += v[0].num;
        // console.log("1");
      } else {
        allChecked = false;
        // console.log("2");
      }
    });
    // console.log(allChecked);
    allChecked = cart.length != 0 ? allChecked : false;
    // console.log(allChecked);
    this.setData({
      cart: cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handleAllChange() {
    let {
      cart,
      allChecked
    } = this.data;
    // console.log(allChecked);
    allChecked = !allChecked;
    // console.log(allChecked);
    cart.forEach(v => {
      v[0].isChoosed = allChecked;
    })
    this.cartSet(cart);
  }
})