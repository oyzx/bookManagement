// 新增图书
// 1.获取豆瓣信息
// 豆瓣api：https://developers.douban.com/wiki/?title=book_v2#get_book
// 获取图书接口：https://api.douban.com/v2/book/isbn/图书编码号
// 2.入库

// 获取http请求的实例
const https = require('https')
// 获取当前环境下mysql的实例
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
	const { isbn,openid } = ctx.request.body
	console.log('开始')
	console.log(ctx.request.body)
	console.log('结束')
	if(isbn && openid) {
		// 查询图书是否已存在
		const findRes = await mysql('books').select().where('isbn', isbn);
		console.log()
		if(findRes.length) {
			ctx.state = {
				code: -1,
				data: {
					msg: '图书已存在'
				}
			}
			return
		}

		let url = 'https://api.douban.com/v2/book/isbn/' + isbn
		const bookinfo = await getJSON(url)
		const rate = bookinfo.rating.average
		const { title, image, alt, publisher, summary, price } = bookinfo
		const tags = bookinfo.tags.map(v => {
			return `${v.title} ${v.count}`
		}).join(',')
		const author = bookinfo.author.join(',')
		console.log({
			rate, openid, title, image, alt, publisher, summary, price, author
		})
		// 返回数据到前端
		try {
			await mysql('books').insert({
				isbn, openid ,rate, title, image, alt, publisher, summary, price, author
			})
			ctx.state.data = {
				title,
				msg: 'success'
			}
		}catch(e) {
			ctx.state = {
				code: -1,
				data: {
					msg: '新增失败' + e.sqlMessage
				}
			}
		}

		
	}
}

function getJSON(url) {
	return new Promise((reslove, reject) => {
		https.get(url, res => {
			let urlData = ''
			res.on('data', data => {
				urlData += data
			})
			res.on('end', data => {
				const bookinfo = JSON.parse(urlData)
				if(bookinfo.title) {
					reslove(bookinfo)
				}
				reject(bookinfo)
			})

		})
	})
}

