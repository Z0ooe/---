//解决es7 async

//同时发送多个ajax请求的时候，关闭加载到最后一次才进行
let ajaxTimes = 0;

export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            //全部参数都解构
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}