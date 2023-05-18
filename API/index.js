import $request from '@/request/http.js'



export default {
	
	// 基地址 生产环境 || 开发环境
	baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://www.meta-artwork.com:10584',
	
	/**
	 * 各个页面的接口地址写在这里
	 */
	
	// 验证码
	sendSMS: (params) => $request('/login/sms/send',params,'post'),
	loginByCode: (params) => $request('/login/sms',params,'post'),
	loginByPassword: (params) => $request('/login/user',params,'post'),
	register: (params) => $request('/login/register',params,'post'),
	identity: (params) => $request('/core/user/info/realname',params,'get'),
	perfectinfo: (params) => $request('/core/user/info/perfect/info',params,'get'),
	logout: (params) => $request('/login/logout',params,'post'),
	userInfo: (params) => $request('/core/user/info/user/info',params,'get'),
	getList: '/api/getList' ,// 示例 
	
	// 藏品
	postOwnHero: '/core/user/house/metaNft/hero',
	postOwnEqip: '/core/user/house/metaNft/equip',
	postBadge: '/core/user/house/badge',
	postBox: '/core/user/house/box',
	postOwnPiece: '/core/user/house/piece',
	postProp: '/core/user/house/prop',
	
	//邀请码
	getInviteList:(params)=> $request('/core/invite/rank',params,'get'),
	invite:'/core/invite/code',
	inviterank:'/core/invite/rank',
	logout:'/login/logout',
	invitation:'/core/user/records/invitation',
	
}