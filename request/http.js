import $api from '@/API/index.js'

const baseURL = $api.baseURL

// 导出http请求方法

/**
 * @param{string}url 请求地址(baseUrl基础地址之后的地址)
 * @param{Object}data 请求参数
 * @param{string}method 请求方法(默认为GET请求)
 * @param{string}contentType 请求内容类型(默认为JSON类型，可选form)
 * @param{Object}headers 其他 header 数据
*/
export default (url, data, method = 'GET', contentType = 'query', headers = {}) => {
	console.log(baseURL)
	// 这里要初始化，不然可能存在BUG
	let queryString = '?'
	// 判断请求内容类型 上传文件的接口另外再写
	if (contentType.toUpperCase() === 'JSON') {
		headers['Content-Type'] = 'application/json; charset=UTF-8' // 可以传引用类型
	} else if (contentType.toUpperCase() === 'URLENCODED') {
		headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
	} else if (contentType.toUpperCase() === 'QUERY'){
		// 这里默认为query
		for (const item in data) {
			// console.log(item)
			queryString += `${item}=${data[item]}&`
		}
		// 去掉末尾的 &
		queryString = queryString.slice(0, queryString.length - 1)
		// console.log(queryString)
	}
	
	//TOKEN
	let tokenValue = uni.getStorageSync('tokenValue')
	if(tokenValue) {
		headers['sa-token'] = tokenValue
	}
	// console.log(baseURL + url + (queryString === '?' ? '' : queryString))
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url + (queryString === '?' ? '' : queryString),
			data,
			method,
			header: headers,
			success: (res) => {
				if(res.statusCode === 200) {
					if(res.data.code === 10086){
						resolve(res.data)
					}
					if(res.data.code === 200) {
						// 获取资源成功
						resolve(res.data.data) // 这里将data已经取出来了
					} else if (res.data.code === 401) {
						// 暂时设定401为token失效的情况
						// 这里需要做一些操作
						resolve(res.data)
					} else if (res.data.code === 500){
						reject(res.data)
					}
					 
					else {
						// 其他情况
						resolve(res.data)
					}
				} else {
					
					console.log('请求失败')
				}
			},
			fail: (err) => {
				console.log(err)
			}
		})
	})
}