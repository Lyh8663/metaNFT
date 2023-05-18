import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $H from '@/request/http.js';

export default new Vuex.Store({
	state:{
		test:'头像',
		user:null,
		tokenName: 'sa-token',
		tokenValue: null,
		invitationCode:''
	},
	actions:{
		logout({ state }){
			state.user = null
			state.tokenValue = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('tokenValue')
			
			uni.reLaunch({
			    url: '/pages/login/login'
			});
		},
		login({ state },user){
			
			uni.setStorageSync('user',JSON.stringify(user))
			
			
			state.tokenName = user.tokenInfo.tokenName
			state.tokenValue = user.tokenInfo.tokenValue
			
			uni.setStorageSync('tokenName', user.tokenInfo.tokenName); 
			uni.setStorageSync('tokenValue', user.tokenInfo.tokenValue); 
		},
		initUser({ state }){
			let user = uni.getStorageSync('user')
			if(user){
				state.user = JSON.parse(user)
				let tokeninfo = state.user.tokenInfo
				state.tokenName = tokeninfo.tokenName
				state.tokenValue = tokeninfo.tokenValue
			}
		},
	}
})