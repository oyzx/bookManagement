<template>
	<div class="progressbar">
		<p>进度条</p>
		<progress percent='20' actionColor='#EA5A49'></progress>
		<p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
	</div>
</template>

<script>
	export default{
	  methods: {
	    isLeapYear () {
	      const year = new Date().getFullYear()
	      if (year % 400 === 0) {
	        return true
	      } else if (year % 4 === 0 && year % 100 !== 0) {
	        return true
	      } else {
	        return false
	      }
	    },
	    getDayOfYear () {
	      return this.isLeapYear() ? 366 : 365
	    }
	  },
	  computed: {
	    year () {
	      return new Date().getFullYear()
	    },
	    days () {
	      let start = new Date()
	      start.setMonth(0)
	      start.setDate(1)
	      // start就是今年的第一天
	      // 今天的时间戳减去今年第一天的时间戳
	      let offset = new Date().getTime() - start.getTime()
	      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
	    },
	    percent () {
	      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
	    }
	  }
	}
</script>

<style lang='scss'>
	.progressbar {
		width: 100%;
		margin-top: 20rpx;
		margin-bottom: 80rpx;
		text-align: center;
		progress {
			margin-bottom: 20rpx;
		}
	}
</style>