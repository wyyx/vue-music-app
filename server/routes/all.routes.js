const axios = require('axios')

module.exports = app => {
	var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

	app.get('/api/getDiscList', (req, res) => {
		axios
			.get(url, {
				headers: {
					referer: 'https://c.y.qq.com/',
					host: 'c.y.qq.com'
				},
				params: req.query
			})
			.then(response => {
				// console.log('response.data', response.data)
				res.json(response.data)
			})
			.catch(e => {
				console.log(e)
			})
	})
}
