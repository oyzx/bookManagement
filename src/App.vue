<script>
import {get, showSuccess} from './unit'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  async created () {
    // const res = await get('./weapp/demo')
    // console.log(123, res)
    // wx.request({
    // 	url: config.host + '/weapp/demo',
    // 	success: function(res) {
    // 		console.log(res);
    // 	}
    // })
    console.log('小程序启动了')
  }
}
</script>

<style lang='scss'>
    .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        padding-left: 15px;
        padding-right: 15px;
        background: #EA5A49;
        color: white;
        font-size: 16px;
        border-radius: 2rpx;
    }
    .btn:active {
        background: #FA5A49
    }
</style>