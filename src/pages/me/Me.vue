<template>
	<div class="container">
		<div class="userinfo" @click='login'>
			<img :src="userinfo.avatarUrl" alt="" />
			<p>{{userinfo.nickName}}</p>
		</div>
		<YearProgress></YearProgress>

		<button v-if='userinfo.openId' @click='scanBook' class="btn">添加图书</button>
	</div>
</template>

<script>
	import YearProgress from '@/components/YearProgress'
	import {get, showSuccess} from '@/unit'
	import qcloud from 'wafer2-client-sdk'
	import config from '@/config'
	export default {
	  data () {
	    return {
	      userinfo: {
	        avatarUrl: '../../../static/img/unlogin.png',
	        nickName: '点击登陆'
	      }
	    }
	  },
	  components: {
	    YearProgress
	  },
	  methods: {
	    scanBook () {
	      	wx.scanCode({
				success: (res) => {
				  	console.log(res)
				    wx.showToast({
				    	title: res.result,
				    	icon: 'success'
				    })
				},
				fail: (res) => {
				  	console.log(res)
				}
	      	})
	    },
	    login () {
	      let user = wx.getStorageSync('userinfo')
	      const self = this
		    if (!user) {
			    // 设置登录地址
			    qcloud.setLoginUrl(config.loginUrl)
		        qcloud.login({
				    success: function (userinfo) {
				        showSuccess('登录成功')
			            qcloud.request({
				            url: config.userUrl,
				            login: true,
				            success: function (userRes) {
				                console.log(userRes)
			                	wx.setStorageSync('userinfo', userRes.data.data)
			                	self.userinfo = userRes.data.data
			                }
				        })
				    },
				    fail: function (err) {
				        console.log('登录失败', err)
			        }
			    })
		    }
	    }
	  },
	  onShow () {
	    let userinfo = wx.getStorageSync('userinfo')
	    if (userinfo) {

	    }
	    // console.log(this.userinfo);
	  },
	}
</script>


<style lang='scss'>
	.container {
		padding:0 30rpx;
		.userinfo {
			margin-top: 100rpx;
			text-align: center;
			img {
				width: 128rpx;
				height: 128rpx;
				margin: 20rpx;
				border-radius: 50%;
			}
		}
	}
</style>