// 获取图书列表

// 获取当前环境下mysql的实例
const { mysql } = require('../qcloud')

module.exports = async(ctx) => {
	const books = await mysql('books').select('*')
	// .orderBy('id', desc)

	ctx.state.data = {
		list: books
	}
}