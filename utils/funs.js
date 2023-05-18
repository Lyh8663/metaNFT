// 这个文件用来存放全局使用的一些方法
export function getUserId() {
	// 获取UserId
	return JSON.parse(uni.getStorageSync('user')).userId
}

export function getUserName() {
	return JSON.parse(uni.getStorageSync('user')).name
}

export function getUserHead() {
	return JSON.parse(uni.getStorageSync('user')).head
}