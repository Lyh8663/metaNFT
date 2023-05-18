<template>
	<view class="p-7">
		
		<view v-if="show" class="position-fixed top-0 left-0 right-0 bottom-0 flex align-center justify-center bg-light" style="z-index: 100;">
			<text class="font text-muted">加载中...</text>
		</view>
		
		<!-- 登录注册选择栏 -->
		<view class="flex flex-column px-2" style=""> 
			<view class="mt-4 flex justify-start" style="height: 100rpx">
				<u-tabs
					@change="changeType"
				    :list="list"
				    lineWidth="70"
					lineHeight="3"
				    lineColor="#7948ea"
					:current="type === '登录'? 0 : 1 "
				    :activeStyle="{
				        color: '#f1f1f1',
				        fontWeight: 'bold',
						fontSize:'50rpx',
				        transform: 'scale(1.4)'
				    }"
				    :inactiveStyle="{
				        color: '#a6a6a6',
						fontWeight: 'bold',
						fontSize:'50rpx',
				        transform: 'scale(1)'
				    }"
				    itemStyle="height: 130rpx;font-size: 60rpx;"
				>
				</u-tabs>
			</view>
	<view class="mt-5" style="margin-top: 100rpx">
		<!-- 一个表单 -->
		<u--form
			labelPosition="left"
			:model="model1"
			:rules="rules"
			ref="form1" 
		>			
			<!-- 第一部分:手机号输入是固定的 -->
			<u-form-item
				prop="form.phone"
			>		
				<u-input
					placeholder="请输入手机号"
					border="surround"
					v-model="model1.form.phone"
					
					type="number"
					fontSize="34rpx"
					color="#f1f1f1"
					style="padding:20rpx;"
				>		
					<u--text
						text="+86"
						slot="prefix"
						margin="0 3px 0 0"
						type="tips"
						color="#ff0000"
						size="35rpx"
					></u--text>		  
				</u-input>		  							
			</u-form-item>
			
			<!-- 第二部分:注册使用的验证码区域 -->
			<u-form-item
			v-if=" typeOfLogin === 'code' || type === '注册' " 
			prop="form.code"
			>	
				<u-input
				
				  placeholder="请输入验证码"
				  border="surround"
				  v-model="model1.form.code"
					
					type="number"
					fontSize="34rpx"
					color="#f1f1f1"
					style="padding:20rpx;"
				>					
					<template slot="suffix" class="flex justify-center align-items">
						<u-code
							ref="uCode"
							@change="codeChange"
							seconds="60"
							changeText="X秒重新获取"
						></u-code>	
						<!-- 替换掉千禧年按钮 -->
						<!-- <u-button
							@tap="getCode"
							:text="tips"
							type="info"
							size="mini"
							:plain="true" 
							:hairline="true"
							style="background-color: #BA55D3;
							color: white;"
							class="custom-style1"
						></u-button> -->
						<view class="sendCodeBTN" @tap="getCode" style="color: #7948ea;font-size: 30rpx;">
							{{tips}}
						</view>
					</template>
				</u-input>
			</u-form-item>	
			
			<!-- 第三部分:登录和注册的密码区域 -->
			<u-form-item v-if="typeOfLogin === 'password' || type === '注册' "
			prop="form.password"
			>				
				<u-input
					placeholder="请输入密码"
					border="surround"
					
					type="password"
					fontSize="34rpx"
					color="#f1f1f1"
					style="padding:20rpx;"
					v-model="model1.form.password"
				>				  
					<u--text
						text=""
						slot="suffix"
						margin="0 3px 0 0"
						type="tips"
						color="#ff0000"
						size="35rpx"
					></u--text>				
				</u-input>					
			</u-form-item>
			
			<!-- 第四部分:注册的邀请码区域				 -->
			<u-form-item v-if="type === '注册' "
				prop="form.invitationCode"
			>				
				<u-input
					placeholder="邀请码(选填)"
					border="surround"
					
					type="text"
					fontSize="34rpx"
					color="#f1f1f1"
					style="padding:20rpx;"
					v-model="model1.form.invitationCode"
				>				 
					<u--text
						text=""
						slot="suffix"
						margin="0 3px 0 0"
						type="tips"
						color="#ff0000"
						size="35rpx"
					></u--text>				
				</u-input>
			</u-form-item>
		</u--form>
	</view>
						
				
			


		
			<!-- 用户协议和隐私政策区域 -->
			<view class="mt-5 flex justify-center align-center">
					<view class="flex justify-center align-center">
						<label class="">
							<checkbox value="cb" :checked="check" color="#7948ea"/>
						</label>
					</view>
					<view class="flex justify-center align-items ml-1">
						<text class="text-main">
							我已阅读
						</text>
						<!-- <u--text @click="showYHXY()" mode="text" text="《用户协议》" color="#7948ea" ></u--text>-->
						<text class="text-purple font-sm flex justify-center align-center" @click="showYHXY()">《用户协议》</text>
						<text class="text-main">和</text>
						<!-- <u--text @click="showYSZC()" mode="text" text="《隐私政策》" color="#7948ea" ></u--text> -->
						<text class="text-purple font-sm flex justify-center align-center" @click="showYSZC()">《隐私政策》</text>
					</view>
					
			</view>
			
			<!-- 最底下的按钮 -->
			<view style="margin-top: 100rpx;">
				<u-button @click="click" size="large" :text="type" color="linear-gradient(90deg, rgba(172, 50, 228, 1) 0%, rgba(121, 24, 242, 1) 48%, rgba(119, 66, 252, 1) 100%)"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "登录",
				show: false,
				typeOfLogin: 'password',
				check: true,
				customStyle1: {
								marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
								color: 'red'
				},
				list: [{
				    name: '登录'
				}, {
				    name: '注册',
				 }],
				model1:{
					form:{
						phone:"",
						password:"",
						code:"",
						invitationCode:''
					},
				},
				rules:{
					'form.phone': [{
					required: true,
					message: '请输入手机号',
					trigger: ['blur', 'change']
				},
					{
								// 自定义验证函数，见上说明
								validator: (rule, value, callback) => {
									// 上面有说，返回true表示校验通过，返回false表示不通过
									// uni.$u.test.mobile()就是返回true或者false的
									return uni.$u.test.mobile(value);
								},
								message: '手机号码不正确',
								// 触发器可以同时用blur和change
								trigger: ['change','blur'],
					}
				],
				'form.password': {
					min: 6,
					required: true,
					message: '请输入正确的密码',
					trigger: ['blur', 'change']
				},
				'form.code':{
					required:true,
					message:"请输入验证码",
					trigger: ['blur','change']
				},
			},
				 tips:''
			}
		},
		//传参跳转注册功能待测试
		onLoad:function(option){
			
			//原先内容
			this.show = true
			
			//#ifdef H5
			//用方法2获取参数code
			console.log("option", option) // option也可以直接获取到
			console.log("获取浏览器参数1-onload：", this.$route.query)
			// 获取浏览器参数
			const urlRequest = this.$route.query
			 if(JSON.stringify(urlRequest) != '{}'){
				 this.model1.form.invitationCode = urlRequest.code
				 this.type = '注册'
			 }
			//#endif
			
			
			if(uni.getStorageSync('tokenValue')==undefined || uni.getStorageSync('tokenValue')==''){
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				//获取传参

				return this.show = false
			}
			uni.switchTab({
				url:'../index/index'
			})
				
			
		},
		
		methods: {
			showYHXY(){
				
				//跳转至用户协议
				uni.navigateTo({
					url:'../UserAgreementPage/UserAgreementPage'
				})
			},
			showYSZC(){
				
				//跳转至隐私政策
				uni.navigateTo({
					url:"../PrivacyPolicyPage/PrivacyPolicyPage"
				})
				
			},
			// 最底下按钮的点击事件
			click(){
				if(this.check){
					console.log("click");
					//在验证码登录被选中时
					if(this.type === '登录' && this.typeOfLogin === 'code' ){
						let code = ''
						code = uni.getStorageSync('code') 
						if(this.model1.form.code === code) {
							//调用验证码登录请求访问验证码登录接口
							this.$api.loginByCode({code: this.model1.form.code, phone: this.model1.form.phone}).then(
								res => {
									console.log('登录成功');
									console.log(res);
									if(res.hasOwnProperty('code')){
										//对应第一次注册情况，会跳转到完善详情界面
										this.$store.dispatch('login',res.data)
										uni.navigateTo({
											url:'/pages/finishDetail/finishDetail'
										})
									}
									else{
										// console.log('...')
										this.$store.dispatch('login',res)
										uni.switchTab({
												url:'/pages/index/index'
										})
									}
								}
							)
						}
						else{
								if(this.model1.form.code.length != 0){
									uni.showToast({
										title:'验证码不正确',
										icon:"none",
										success: () => {
											this.model1.form.code = ''
										}
									})
								}
								else{
									uni.showToast({
										title:'请输入验证码',
										icon:"none",
										success: () => {
											this.model1.form.code = ''
										}
									})
								}
						}
					}
					//在密码登录被选中时
					if(this.type === '登录' && this.typeOfLogin === 'password'){
						//使用密码登录请求访问密码登录接口
						// this.$api.loginByPassword({phone:this.model1.form.phone, password: this.model1.form.password}).then(
						// 	res => {
						// 		this.$store.dispatch('login',res)
						// 		//登录成功跳转到index主页
						// 		uni.switchTab({
						// 			url:'/pages/index/index'
						// 		})
						// 	}
						// )
						
						//@lyh
						//07.27更换接口
						var that = this;
						uni.request({
							url:"https://www.meta-artwork.com:10584/login/user",
							method:"GET",
							data:{
								password: this.model1.form.password,
								phone: this.model1.form.phone
							},
							success(res){
								console.log("登录请求已经发起")
								console.log(that.model1.form.phone)//正常
								console.log(that.model1.form.password)//正常
								console.log(res.statusCode)//200
								if(res.data.code == 500) {
									uni.showToast({
										title:'账号或密码错误',
										icon:'none'
									})
								}
								if(res.data.data){
									console.log(res.data.data.tokenInfo.tokenValue)
									uni.setStorageSync('tokenValue',res.data.data.tokenInfo.tokenValue)
									uni.setStorageSync('chainWallet',res.data.data.chainWallet)//将区块链钱包存入缓存
									uni.setStorageSync('head',res.data.data.head)
									uni.setStorageSync('username',res.data.data.name)//已经将名字写入缓存
									uni.setStorageSync('accountId',res.data.data.accountId)//已经将名字写入缓存
									// uni.setStorageSync('inviteCount',res.data.data.inviteCount)
									console.log("用户的tokenValue为"+res.data.data.tokenInfo.tokenValue)
									console.log("用户的chainWallet为"+res.data.data.chainWallet)
									console.log("用户的head为"+res.data.data.head)
									console.log("用户的username为"+res.data.data.name)
									console.log("用户的accountId为"+res.data.data.accountId)
									// console.log("用户的inviteCount为"+res.data.data.inviteCount)
									// uni.setStorageSync()
									uni.setStorageSync('isReal',1)
									uni.switchTab({
										url:"../index/index",
										success() {
											uni.reLaunch({
												url:"../index/index",
											})
										}
									})
								}
								
							},
							fail(e) {
								console.log(e.errMsg)
							}
						})
						
					}
					
					//在注册被选中时
					if(this.type === "注册"){
						if(this.model1.form.code.length != 0) {//如果输入的code与缓存中code内容一致，
							if(this.model1.form.password.length != 0){//且不为空字符串
								//发起注册请求
								// this.$api.register({smsCode: this.model1.form.code, phone: this.model1.form.phone, password: this.model1.form.password}).then(
								// 						res => {
								// 							console.log('注册成功');
								// 							console.log(res);
								// 							this.$store.dispatch('login',res)
															
								// 							this.$store.state.invitationCode = this.model1.form.invitationCode
															
								// 							uni.navigateTo({
								// 								url: `/pages/loginSuccess/loginSuccess?password=${this.model1.form.password}`
								// 							})
								// 						}
								// ).catch(err => 
								// 	{
								// 		uni.showToast({
								// 			title: err.message
								// 		})
								// 	}
								// )
								
								//@lyh
								//发起注册请求于7.27 21:45暂时改为
								//@lyh
								//发起注册请求于7.28 10:57修改为
								var that = this;
								uni.request({
									url:"https://www.meta-artwork.com:10584/login/register",
									method:"GET",
									data:{
										smsCode: this.model1.form.code, 
										phone: this.model1.form.phone, 
										password: this.model1.form.password,
										invitationCode: this.model1.form.invitationCode
									},
									success(res) {
										console.log("注册请求已发起");
										//少了这句可以成功
										// that.$store.dispatch('login',res);//原有内容，复制过来
										var user = res.data.data;
										console.log(res.data.data.accountId)
										if(res.data.data.accountId!=undefined){
											uni.setStorageSync('user',JSON.stringify(user))
											
											// 下面报错ReferenceError: state is not defined
											// state.tokenName = user.tokenInfo.tokenName
											// state.tokenValue = user.tokenInfo.tokenValue
											
											uni.setStorageSync('tokenName', user.tokenInfo.tokenName); 
											uni.setStorageSync('tokenValue', user.tokenInfo.tokenValue); 
											//that.$store.state.invitationCode = that.model1.form.invitationCode
											//上面报错ReferenceError: state is not defined
											//解决办法：暂时不使用Store内的invitationCode，先存入缓存
											uni.setStorageSync('invitationCode',that.model1.form.invitationCode)
											uni.navigateTo({
											 	url: `/pages/loginSuccess/loginSuccess?password=${that.model1.form.password}`
											})
										}
									}
								})
							}
							else{
								uni.showToast({
									title:"请输入密码",
									icon:'none'
								})
							}
						}
						else{
								
								
									uni.showToast({
										title:'请输入验证码',
										icon:"none",
										success: () => {
											this.model1.form.code = ''
										}
									})
								
						}
					}
				}
				else{
					uni.showToast({
						title:'请先同意协议'
					})
				}
			},
			changeLoginType(){
				this.typeOfLogin = this.typeOfLogin === "code" ? 'password' : 'code'; 
				this.type = "登录";
				console.log("change");
			},
			codeChange(text) {
			        this.tips = text;
			      },
			getCode() {
			        if (this.$refs.uCode.canGetCode) {
			          // 模拟向后端请求验证码
			          uni.showLoading({
			            title: '正在获取验证码'
			          })
					  
			          // setTimeout(() => {
			          //   uni.hideLoading();
			          //   // 这里此提示会被this.start()方法中的提示覆盖
			          //   uni.$u.toast('验证码已发送');
			          //   // 通知验证码组件内部开始倒计时
			          //   this.$refs.uCode.start();
			          // }, 2000);
					  console.log("获取验证码ing");
					  //向后端发送验证码
					// this.$api.sendSMS({"phone": this.model1.form.phone}).then(
					// 	res => {
					// 		uni.hideLoading();
					// 		uni.$u.toast('验证码已发送');
					// 		console.log(res);
					// 		  // 通知验证码组件内部开始倒计时
					// 		this.$refs.uCode.start();
					// 		uni.setStorageSync('code',res)
					// 	}
					// )
					
					//@lyh
					//发送验证码请求于7.27 21:37暂时修改为
					var that = this;
					uni.request({
						url:"https://www.meta-artwork.com:10584/login/sms/send",
						method:"GET",
						data:{
							"phone": this.model1.form.phone,
						},
						success(res) {
							uni.hideLoading();
							uni.$u.toast('验证码已发送');
							console.log(res);
							// 通知验证码组件内部开始倒计时
							that.$refs.uCode.start();
							uni.setStorageSync('code',res)
						}
					})
					
			        } 
					else {
			          uni.$u.toast('倒计时结束后再发送');
			        }
			},
			changeType(item){
				this.type = item.name;
				
			}
		},
		computed: {
			checkclass() {
			}
		},
	}
</script>

<style>

</style>
