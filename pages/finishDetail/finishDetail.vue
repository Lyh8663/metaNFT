<template>
	<view class="flex flex-column w-90 justify-center align-center mx-auto">
		<image v-if="!imgUrl" src="https://img.js.design/assets/smartFill/img341164da748e08.jpg" class="mt-3" style="width: 220rpx;height: 220rpx;border-radius: 110rpx;" @click="openChooseImg"></image>
				<!-- //用户点击修改的 -->
		<image v-else :src="imgUrl" class="mt-3" style="width: 220rpx;height: 220rpx;border-radius: 110rpx;" @click="openChooseImg"></image>
			<!-- <text class="font-weight-bolder flex justify-center align-center">名字昵称</text>-->
		<view class="flex flex-column justify-center align-center mx-auto text-center mt-3" style="transform: translateX(30%);">
			<u-input
			placeholder="名字昵称"
			border="none"
			placeholderStyle="fontSize: 40rpx;color:#ffffff"
			fontSize="40rpx"
			color="#ffffff"
			class="flex justify-center align-center text-center"
			v-model="userName"
			 ></u-input>
		</view>
		
		<text class="text-muted mt-2 mb-5">点击编辑昵称</text>
		

		<!-- 跳转 -->
		<!-- <navigator url="/pages/realname/realname" class="w-100"> -->
			<view class="bg-main-dark w-100 mt-2 flex align-center justify-between" style="height: 120rpx;" @click="gotorealNamePage()">
				<view class="ml-3 text-main">区块链账户</view>
				<view class=" mr-2" >
					<text class="chainWalletText">{{chainWallet==''?'未实名 ':chainWallet}} </text>
					<!-- <text class="ml-2 font-md"></text> -->
				</view>
			</view>
		<!-- </navigator> -->
		<!-- <navigator url="/pages/realname/realname" class="w-100"> -->
			<view class="bg-main-dark w-100 mt-2 flex align-center justify-between" style="height: 120rpx;"  @click="gotorealNamePage()">
				<view class="ml-3 text-main">姓名</view>
				<view class=" mr-2" >
					<text class="">{{realName==''?'未实名 ':realName}}</text>
					<text class="ml-2 font-md">></text>
				</view>
			</view>
		<!-- </navigator> -->
		<!-- <navigator url="/pages/realname/realname" class="w-100"> -->
			<view class="bg-main-dark w-100 mt-2 flex align-center justify-between" style="height: 120rpx;"  @click="gotorealNamePage()">
				<view class="ml-3 text-main">身份证号</view>
				<view class=" mr-2" >
					<text class="">{{identity==''?'未实名 ':identity}}</text>
					<text class="ml-2 font-md">></text>
				</view>
			</view>
		<!-- </navigator> -->
		
		<!-- <view class="bg-main-dark w-100 mt-2 flex align-center" style="height: 120rpx;">
			<view class="ml-3 text-main">邀请码</view>
			<view class="ml-5">
				<input type="number" v-model="invitationCode" />
			</view>
		</view> -->
		
		<u-button class="rounded  mt-5 enterBTN" @click="enter" size="large" text="进入魅塔" color="linear-gradient(90deg, rgba(172, 50, 228, 1) 0%, rgba(121, 24, 242, 1) 48%, rgba(119, 66, 252, 1) 100%)"> </u-button>
		<!-- {{realName==''?'123':'321'}} -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG',
				// invitationCode:'',
				userName:'魅塔收藏家',
				imgUrlOos:'',
				password:'',
				isReal: 0,
				realName:'',
				identity:'',
				chainWallet:uni.getStorageSync('chainWallet')
			}
		},
		created(){
			this.getList();
		},
		onShow() {
			this.getList();
		},
		methods: {
			getList(){
				this.chainWallet = uni.getStorageSync('chainWallet')
				//判断是否有chainWallet
				if(uni.getStorageSync('chainWallet')!=''){
					if(uni.getStorageSync('realName')==''){
						this.realName = '已实名'
						
					}
					if(uni.getStorageSync('identity')==''){
						this.identity = '已实名'
					}
				}
			},
			gotorealNamePage(){
				let user = null;
				this.$api.userInfo().then(
					res =>{
						user = res;
					}
				)
				
				if(user.chainWallet == null){
					uni.navigateTo({
						url:'../realname/realname',
						events: {
							handleSuccess: data => {
								console.log('details发出的值===>', data);
								if (data) this.getList();
							}
						}
					})
				}
			},
			onLoad(option) {
				this.password = option.password || ''
				this.isReal = option.isReal || 0
				console.log(this.isReal);
				var token = uni.getStorageSync('tokenValue');
				var that = this;
				//获得了token，发起请求获得姓名和身份证号
				uni.request({
					url:"https://www.meta-artwork.com:10584/core/user/info/user/info",
					header:{
						'sa-token':token,
					},
					method:"GET",
					success(res) {
						console.log("发起获得用户信息的请求")
						console.log(token)
						
					   that.realName = res.data.data.realName;
					   that.identity = res.data.data.identify;
					}
				})
			},
			enter(){
				let params={}
				params.userName = this.userName
				// params.invitationCode =this.invitationCode
				
				//@lyh
				//信哥要求用户需要进行实名之后才能进入魅塔
				// if(this.realName=='' || this.identity==''){
				// 	uni.showToast({
				// 		title:'请先实名认证',
				// 		icon:'none'
				// 	})
				// 	return;
				// }
				
				//这是选择图片后存入的缓存
				let imgUrlOos = uni.getStorageSync('imgUrlOos')
				params.head = imgUrlOos
				if(this.password.length != 0){
					params.password = this.password
				}
			
				if(this.userName.length != 0){
					if(!params.head) {
						params.head = 'https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG';
					}
					console.log(params);
					console.log(this.$api.perfectinfo);
					this.$api.perfectinfo(params).then(
						res => {
							console.log(res);
							console.log('完善信息完成');
							if(res){
								console.log(res.head);
								uni.setStorageSync('head',res.head)
								uni.setStorageSync('username',res.name)
								
							};
							uni.switchTab({
								url:'/pages/index/index'
							});
						}
					)
				}
				else{
					uni.showToast({
						title:'输入昵称',
						icon:'none'
					})
				}
			},
			openChooseImg() {
				uni.chooseImage({
					count: 1, //最多可选择的张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择，和摄像头功能，默认二者都有
					success: res => {
						this.imgUrl = res.tempFilePaths[0]
						 //把选择的头像赋值给imgurl
						 let tokenName = this.$store.state.tokenName
						 var token = uni.getStorageSync('tokenValue');
						 uni.uploadFile({
						 			url: this.$api.baseURL + '/core/upload/storage/file/',
						 			filePath: this.imgUrl,
									header: {
											 'sa-token' : token,
									},
						 			name: 'file',
									success(data) {	
										console.log('图片上传');
										
										let data1 = JSON.parse(data.data);
										let imgUrlOos = data1.data;
										uni.setStorageSync('imgUrlOos',imgUrlOos);						
									}
						 		})
					}
				});
			},
		}
	}
</script>

<style>
	.enterBTN{
		border-radius: 1000000000000000rpx;
	}
	.chainWalletText{
		width: 40vw;
		
		-webkit-line-clamp: 1;
		/*! autoprefixer: ignore next */
		
		-webkit-box-orient: vertical;
		
		/* autoprefixer: on */
		display: -webkit-box;
	}
</style>
