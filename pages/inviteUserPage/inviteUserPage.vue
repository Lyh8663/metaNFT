<template>
	<view class="container">
		<!-- 为状态栏预留位置 -->
		<view class="status_bar" style="height:40px;width: 100%;">
		</view>
		<!-- 顶部栏 -->
		<view class="headArea">
			<view class="backArea">
				<image @click="goback()" class="backIMG" src="../../static/back.png" alt="">
			</view>
			<view class="titleArea">
				<view class="titleText">
					全部邀请({{this.listArray.length}})
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText" @click="inviteUser()">
					邀请用户
				</view>
			</view>
		</view>
		<!-- 排行榜sc -->
		<scroll-view  class="sc-inviteListArea" scroll-y="true" >
			<view class="listArea">
				<view class="listItem" v-for="(item,index) in listArray" :key="index">
					<view class="indexArea">
						<view class="indexText">
							{{index+1}}
						</view>
					</view>
					<view class="usernameArea">
						<view class="usernameText">
							{{item.invited.name}}
						</view>
					</view>
					<view class="phoneArea">
						<view class="phoneText">
							{{item.invited.phone}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- ***************点击邀请用户后的弹窗**************** -->
		<uni-popup ref="QR" type="center" :mask-click="true" class="kefu">
			<view class="popup">
				<view class="">
					{{this.imgData==''?'无效':'111'}}
				</view>
				<image :src="'data:image/png;base64,' + imgData" mode=""></image>
				
			</view>
		</uni-popup>
		<!-- ************************************************** -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全部邀请数
				count:50,
				//用于填充排行的数据
				listArray:[
					// {
					// 	invited:{
					// 		name:'张奥',
					// 		phone:18123456789
					// 	}
					// },{
					// 	invited:{
					// 		name:'杨信',
					// 		phone:18123456789
					// 	}
					// },{
					// 	invited:{
					// 		name:'猪猡',
					// 		phone:18123456789
					// 	}
					// }
				],
				//这是海报的地址
				imgData:'',
			}
		},
		methods: {
			//返回首页
			goback(){
				uni.hideLoading()
				uni.switchTab({
					url:"../index/index"
				})
			},
			//打开邀请海报页面
			inviteUser(){
				uni.navigateTo({
					url:"../haibaoPage/haibaoPage"
				})
			},
		},
		//页面加载的时候执行
		onLoad() {
			var that = this;
			//获取用户token
			let token = uni.getStorageSync('tokenValue');
			
			//获得用户的邀请记录
			uni.request({
				url:'https://www.meta-artwork.com:10584/core/user/records/invitation',
				method:"POST",
				header:{
					'sa-token' : token,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					console.log("正在获取排行信息")
					let temp = [];
					console.log("邀请记录请求返回状态码：" + res.statusCode);
					console.log(res.data.code);
					temp = res.data.data;
					that.listArray = temp
				}
			})
			
			//获得海报信息
			// uni.request({
			// 	url:'https://www.meta-artwork.com:10584/core/poster/test/share',
			// 	method:"GET",
			// 	header:{
			// 		'sa-token' : token,
			// 		'Content-Type': 'application/json'
			// 	},
			// 	responseType:'arraybuffer',
			// 	success: (res) => {
			// 		console.log("正在获取海报信息")
			// 		console.log("海报信息请求返回状态码：" + res.statusCode);
			// 		console.log(res.data)
			// 		// console.log("res.data.data:"+res.data.data)
			// 		// console.log("res.data.code:"+res.data.code)
			// 		// console.log("res.data.message:"+res.data.message)
			// 		// console.log("res.code:"+res.code)
			// 		// that.codeUrl = res.data.data;
			// 		// if(res.data.data==null){
			// 		// 	console.log("海报信息获取失败")
			// 		// }else{
			// 		// 	console.log(that.codeUrl.slice(0,5))
			// 		// 	that.codeUrl = that.codeUrl.replace("data:image/png;base64,","");
			// 		// 	that.codeUrl = that.codeUrl.replace("/\/","");
			// 		// }
			// 		const arrayBuffer = new Uint8Array(res.data)
			// 		const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer)
			// 		that.imgData = base64; //将imgData与image标签的src属性绑定
			// 	}
			// })
			
		},
		onHide() {
			uni.hideLoading()
		},
		onUnload() {
			uni.hideLoading()
		}
	}
</script>

<style>
	.container{
		height: 100vh;
		width: 100vw;
	}
	.headArea{
		height: 6vh;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 35rpx;
	}
	.backArea{
		flex:1
	}
	.backIMG{
		width: 3.5vh;
		height: 3.5vh;
	}
	.titleArea{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}
	.inviteArea{
		flex: 1;
		display: flex;
		align-items: center;
		/* justify-content: flex-end; */
		justify-content: center;
		color: #BA55D3;
	}
	.sc-inviteListArea{
		width: 100%;
		height: calc(100vh - 6vh - 40px);
		/* background-color: aquamarine; */
	}
	.listArea{
		width: 95vw;
		/* margin-left: 2.5vw; */
		margin-left: 2.5vw;
		/* background-color: antiquewhite; */
	}
	.listItem{
		width: 100%;
		height: 6vh;
		margin-top: 1vh;
		/* background-color: #BA55D3; */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.indexArea{
		flex: 0.7;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.usernameArea{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.phoneArea{
		flex:2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* ************************************************* */
	/deep/.uni-popup__wrapper.uni-custom.center  .uni-popup__wrapper-box{
		background-color: transparent;
		position: relative;
		max-width: 80%;
		max-height: 80%;
		overflow-y: visible;
		.popup{
			width: 100%;
			.icon-close{
				display: block;
				text-align: right;
				margin-right: -60rpx;
			}
			.QRcode{
				width: 450rpx;
				display: block;
			}
			.btn-savecode{
				margin: 20rpx 100rpx;
				border-radius: 50rpx;
				font-size: 30rpx;
			}
		}
	}
	/* *************************************************** */
	.btn-savecode{
		width: 50vw;
		border-radius: 10000000000000rpx;
		background-color: #BA55D3;
		color: white;
	}
	.popup{
		display: flex;
		flex-direction: column;
		align-items: center;
		/* margin-bottom: 5vh; */
	}
	.popup-img{
		margin-bottom: 5vh;
		height: 50vw;
		width: 50vw;
	}
</style>
<!-- //  getHaibao(){
// 	var that = this;
			// 	//获取用户token
			// 	let token = uni.getStorageSync('tokenValue');
			// 	//获得用户的邀请记录
			// 	uni.request({
			// 		url:'https://www.meta-artwork.com:10584/core/poster/test/share',
			// 		method:"GET",
			// 		header:{
			// 			'sa-token' : token,
			// 			// 'Content-Type': 'application/x-www-form-urlencoded',
			// 			// 'Content-Type': 'Content-Type: image/jpeg',
			// 		},
			// 		// responseType:'blob',  //这里最重要,不要去掉
			// 		// responseType:'arraybuffer',
			// 		success: (res) => {
			// 			console.log("正在获取海报信息")
			// 			console.log("请求返回状态码：" + res.statusCode);
			// 			// console.log("res.data.data:"+res.data.data)
			// 			// console.log("res.data.code:"+res.data.code)
			// 			// console.log("res.data.message:"+res.data.message)
			// 			// console.log("res.code:"+res.code)
			// 			that.codeUrl = res.data.data;
			// 			console.log(that.codeUrl.slice(0,5))
			// 			that.codeUrl = that.codeUrl.replace("data:image/png;base64,","");
			// 			that.codeUrl = that.codeUrl.replace("/\/","");
			// 		}
			// 	})
			// } -->