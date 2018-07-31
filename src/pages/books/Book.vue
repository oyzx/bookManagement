<template>
	<div>
		图书页面111
		<button bindgetuserinfo="getUser" class="btn" open-type='getUserInfo'>添加图书</button>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	      userinfo: {}
	    }
	  },
	  methods: {
	    getUser (e) {
	      // wx.setStorageSync('userInfo', userInfo);
	      console.log(e)
	    }
	  }
	}
</script>

<style>
	
</style>