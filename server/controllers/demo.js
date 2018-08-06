
// router示例
module.exports = async (ctx, next) => {
	console.log('demo入口')
	console.log(ctx.request.query)
	console.log('demo出口')
	ctx.state.data = {
		msg: 'hello 小程序后台'
	}
}