// 工具函数库

import config from './config'

export function get (url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          reslove(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}