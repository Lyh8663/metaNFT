<template>
	<view class="flex flex-column w-90 justify-start align-center mx-auto">
		<text class="text-main font-lg mr-auto my-3" style="margin-top: 50rpx;">实名认证即可生成区块链账户</text>
		<text class="text-main font-md mr-auto mb-5">请如实填写实名信息</text>
		<view class="w-100 flex flex-column">
			<!-- <text class="my-3">已注册手机号</text>
			  <u-input
			    :placeholder="user.phone"
				placeholderStyle='fontSize: 30rpx'
			    border="surround"
				fontSize="30rpx"
				color="#ffffff"
				disabled="true"
				style="background-color: #1e1e1e;"
			  ></u-input> -->
		</view>
		
		<view class="w-100 flex flex-column">
			<text class="my-3">真实姓名</text>
			  <u-input
			    placeholder="请输入真实姓名"
				placeholderStyle='fontSize: 30rpx'
			    border="surround"
				fontSize="40rpx"
				color="#ffffff"
				v-model="realName"
			  ></u-input>
		</view>
		
		<view class="w-100 flex flex-column">
			<text class="my-3">身份证号</text>
			  <u-input
			    placeholder="请输入身份证号"
				placeholderStyle='fontSize: 30rpx'
			    border="surround"
				fontSize="30rpx"
				color="#ffffff"
				v-model="identity"
			  ></u-input>
		</view>
		
		<view class="mt-5 flex justify-center align-center">
				<label>
					<checkbox value="cb" checked="true" color="#7948ea"/>
				</label>
				<view class="flex justify-center align-items">
					<text class="text-main">
					我已阅读</text>
					<u--text mode="text" text="《用户协议》" color="#7948ea" class="text-main" @click="toYHXY()"></u--text>
					<text class="text-main">和</text>
					<u--text mode="text" text="《隐私政策》" color="#7948ea" @click="toYSZC()"></u--text>
				</view>

		</view>
		
		<view style="margin-top: 100rpx;" class="w-85">
			<u-button class="submitBTN" @click="click" size="large" text="立刻认证" color="linear-gradient(90deg, rgba(172, 50, 228, 1) 0%, rgba(121, 24, 242, 1) 48%, rgba(119, 66, 252, 1) 100%)"></u-button>
		</view>
		<!-- <input type="text" :value="code"> -->
		<!-- {{code}} -->
		<!-- {{code==undefined?'123':'321'}} -->
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				realName:'',
				identity:'',
				code:uni.getStorageSync('tokenValue'),
			}
		},
		methods: {
			toYHXY(){
				uni.navigateTo({
					url:"../UserAgreementPage/UserAgreementPage"
				})
			},
			toYSZC(){
				uni.navigateTo({
					url:"../PrivacyPolicyPage/PrivacyPolicyPage"
				})
			},
			click(){
				
				//告诉上一页，我修改了数据（给finishDetail页的信号）
				const eventChannel = this.getOpenerEventChannel();
				console.log(eventChannel);
				eventChannel.emit('handleSuccess', true);
				
				//发送实名认证请求
				// this.$api.identity({realName: this.realName,identity: this.identity, invitationCode: this.$store.state.invitationCode}).then(
				// res => {
				// 		console.log(res);
				// 		uni.showToast({
				// 			title:'认证成功'
				// 		})
				// 		uni.navigateTo({
				// 			url:'/pages/finishDetail/finishDetail?isReal=1'  
				// 		})
				// 	}
				// ).catch(
				// 	err => {
				// 		console.log(err);
				// 		uni.showToast({
				// 			title: err
				// 		})
				// 	}
				// )
				console.log("即将进入判断")
				if(uni.getStorageSync('tokenValue')==undefined){
					console.log("进入判断内")
					uni.showModal({
						title:"注意！",
						content:'实名认证失败，请稍后重试',
					})
					return;
				}
				
				var token = uni.getStorageSync('tokenValue')
				
				//@lyh
				//实名认证请求于7.27 22:18暂时修改为
				var that = this;
				if(uni.getStorageSync('invitationCode')==''){//如果注册没填邀请码，这时候缓存就没有
					//发起不带邀请码的请求
					uni.request({
						url:"https://www.meta-artwork.com:10584/core/user/info/realname",
						method:"GET",
						header:{
							'sa-token':token
						},
						data:{
							realName: that.realName,
							identity: that.identity, 
							code:uni.getStorageSync('tokenValue')
							// invitationCode: this.$store.state.invitationCode
							
							//上面的代码是从store.state中获取，
							//但是注册时，为了赶紧解决bug，将邀请码存入缓存中了
							//现在使用缓存来获取邀请码
						},
						success(res) {
							console.log("发起不带邀请码的请求")
							console.log(res.data.message);
							// console.log(res.data.data.phone);
							
							//检查code是否为200
							if(res.data.code!=200){
								uni.showToast({
									title: res.data.message
								})
								return;
							}
							
							if(res.data.data.phone!=undefined){//成功接收到合法的返回值
								uni.setStorageSync('realName',that.realName);
								uni.setStorageSync('identity',that.identity);
								uni.setStorageSync('chainWallet',res.data.data.chainWallet)
								uni.setStorageSync('isReal',1)
								uni.showToast({
									title:'认证成功'
								})
								
								uni.navigateTo({
									url:'/pages/finishDetail/finishDetail?isReal=1',
									
								})
							}
						}
					})
				}else{//这个情况下，注册的时候填写了邀请码
					//发起带邀请码的请求
					uni.request({
						url:"https://www.meta-artwork.com:10584/core/user/info/realname",
						method:"GET",
						header:{
							'sa-token':token
						},
						data:{
							realName: this.realName,
							identity: this.identity, 
							// invitationCode: this.$store.state.invitationCode
							
							//上面的代码是从store.state中获取，
							//但是注册时，为了赶紧解决bug，将邀请码存入缓存中了
							//现在使用缓存来获取邀请码
							invitationCode: uni.getStorageSync('invitationCode')
						},
						success(res) {
							console.log("发起带邀请码的请求")
							// console.log(res.data.data.phone);
							// console.log(res.statusCode);
							// console.log(res.data.data.head)
							
							//检查code是否为200
							if(res.data.code!=200){
								uni.showToast({
									title: res.data.message
								})
								return;
							}
							
							if(res.data.data.phone!=undefined){//成功接收到合法的返回值
								uni.setStorageSync('realName',that.realName);
								uni.setStorageSync('identity',that.identity);
								uni.setStorageSync('chainWallet',res.data.data.chainWallet)
								uni.setStorageSync('isReal',1)
								//提前加载一下页面
								uni.preloadPage({
									url:"../MinePage/MinePage"
								})
								uni.showToast({
									title:'认证成功'
								})
								uni.navigateTo({
									url:'/pages/finishDetail/finishDetail?isReal=1'  
								})
							}
						}
					})
				}
				
			}
		},
		computed: {
			...mapState({
				user: state =>  {
					return state.user || {}
				}
			})
		},

	}
</script>

<style>
	.submitBTN{
		border-radius: 100000000rpx;
		width: 40vw;
	}
</style>
