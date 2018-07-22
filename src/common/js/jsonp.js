import originJsonp from 'jsonp'

export default function jsonp(url, params, option) {
	url += (url.indexOf('?') < 0 ? '?' : '') + getParamsStr(params)

	return new Promise((resolve, reject) => {
		// console.log('url', url)
		originJsonp(url, option, (err, data) => {
			if (!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}

export function getParamsStr(params) {
	let url = ''

	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			let value = params[key]
			url += '&' + key + '=' + encodeURIComponent(value)
		}
	}
	return url ? url.substring(1) : ''
}
