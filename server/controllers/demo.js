
// router示例
module.exports = async (ctx, next) => {
	console.log('demo入口');
	ctx.state.data = {
		msg: 'hello 小程序后台'
	}
}