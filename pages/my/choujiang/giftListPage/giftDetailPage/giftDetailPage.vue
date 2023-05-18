<template>
	<view>
		<nav-bar>
			<template slot="left">
				<view class="flex justify-center align-center">
					<uni-icons type="back" color="#FFFFFF" size="25" @click="goback()"></uni-icons>
				</view>
			</template>
		
			<template slot="middle">
				<view class="px-3 py-2">
					<text class="topTitleStyle">抽奖标题</text>
				</view>
			</template>
		
			<template slot="right">
				<view style="transform: translateX(-100%);">
				</view>
			</template>
		</nav-bar>
		
		<!-- z-index上叠放, popUpNumber控制显示的弹窗/按钮 -->
		<scroll-view scroll-x="false" scroll-y="true" class="giftScrollView">
			<!-- start: [叠放2]抽奖框：恭喜您 -->
			<view v-show="popUpNumber == 2" class="PopUpView1">
				<view class="PopUpView11">
					<view class="giftPictureBox">
						<image class="giftBoxPicture"
						src="../giftDetailPage/noGift.png"></image>
					</view>
					
					<view class="texts">
						<text class="sorryText">很遗憾...</text>
						<text class="sorryText">什么也没有</text>
						<view class="forDetailButton" style="background-color: rgb(138,138,138);" @click="gotogiftList()">
							<text class="forDetailText">抽奖列表</text>
						</view>
					</view>
				</view>
			</view>
			<!-- end: [叠放2]抽奖框：恭喜您 -->
			
			<!-- start: [叠放2]抽奖框：恭喜您 -->
			<view v-show="popUpNumber == 1" class="PopUpView1">
				<view class="PopUpView11">
					<view class="giftPictureBox">
						<image class="giftBoxPicture"
						src="../giftDetailPage/giftBox.png"></image>
					</view>
					
					<view class="texts">
						<text class="congratulateText">恭喜您！</text>
						<view>
							<text class="gainText">获得</text>
							<text class="giftContentText">{{giftName}}*{{giftNumber}}</text>
						</view>
						<text class="equalCashText">(可折算现金{{giftPrice*giftNumber}}元)</text>
						<view class="forDetailButton" @click="gotoProductDetail()">
							<text class="forDetailText">立即查看</text>
						</view>
					</view>
				</view>
			</view>
			<!-- end: [叠放2]抽奖框：恭喜您 -->
			
			<!-- start: [叠放1]立即参与按钮 -->
			<view class="circleView">
				<view v-show="popUpNumber == 0" class="circleButton" @click="popUpShow1()">
					<text class="ButtonText">立  即</text>
					<text class="ButtonText">参  与</text>
				</view>
			</view>
			<!-- end: [叠放1]立即参与按钮 -->
			
			<!-- start：背景海报 -->
			<image src="https://img.js.design/assets/img/630b7ed843eb61a80e121da0.jpg#9d17a081721ef2c56bd11ce66b7a6308"
			class="bgImage" mode="widthFix">
			</image>
			<!-- end：背景海报 -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popUpNumber: 0,
				giftName: "钢铁加鲁鲁",
				giftPrice: 200,
				giftNumber: 2,
				tempNumber: 0,
				//指示该抽奖的序号
				lotteryId:'',
			}
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta:1 // 返回上1页
				})
			},
			//点击立即参与后执行
			popUpShow1() {
				
				// //目前使用的结果产生逻辑
				// this.tempNumber = uni.$u.random(0, 1)
				// if (this.tempNumber == 0) {
				// 	this.popUpNumber = 1
				// }else{
				// 	this.popUpNumber = 2
				// }
				
				//将this的指向赋给that
				var that = this;
				
				//发起参与活动的请求
				uni.request({
					url:'https://www.meta-artwork.com:10584/core/lottery/extends/join',
					header:{
						'sa-token':uni.getStorageSync('tokenValue')
					},
					data:{
						lotteryId:that.lotteryId,
					},
					success(res) {
						console.log("发起抽奖请求");
						console.log("token:" + uni.getStorageSync('tokenValue'))
						console.log(res.data.code);//500时，参加失败
						if(res.data.code==500&&res.data.message=="不要重复参加"){
							//重复参加提示
							uni.showModal({
								title:"注意",
								content:"您已经参与过此活动啦",
								showCancel:false
							})
						}
						if(res.data.code==200){
							uni.showModal({
								title:"成功",
								content:"请于开奖日期统一开奖",
								showCancel:false
							})
						}
					}
				})
			},
			gotoProductDetail() {
				console.log("立即查看")
			},
			gotogiftList() {
				uni.navigateTo({
					url:'/pages/my/choujiang/giftListPage/giftListPage'
				})
			}
		},
		onLoad(options) {
			console.log("接收到的lotteryId为" + options.lotteryId);
			this.lotteryId = options.lotteryId;
		}
	}
</script>

<style>
.topTitleStyle {
	font-size: 48rpx;font-weight: 700;
	letter-spacing: 0.18px;
	color: rgba(239, 239, 239, 1);
	text-align: left;
	vertical-align: top;
}

.giftScrollView {
	width: 100%;
	display: inline-block;
}

.bgImage {
	width: 100%;
	backdrop-filter: blur(100rpx);
}

.circleView {
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	height: 80%;
	position: absolute;
	z-index: 2;
}

.circleButton {
	width: 232rpx;
	height: 232rpx;
	border-radius: 116rpx;
	background-color: rgba(0, 0, 0, 0.1);
	background: linear-gradient(90deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%);
	border-color: rgba(77, 24, 201, 0.09);
	border-width: 2rpx;
	box-shadow: 2px 10px 25px 0px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(10px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.buttonText {
	font-size: 18px;
	font-weight: 400;
	letter-spacing: 20rpx;
	line-height: 0px;
	color: rgba(255, 255, 255, 0.84);
	text-align: left;
	vertical-align: top;
}

.PopUpView1 {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80%;
	margin-left: 10%;
	height: 60%;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(20rpx);
	border-radius: 20rpx;
	position: absolute;
	top: 20%;
	z-index: 3;
}

.PopUpView11 {
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
	background: linear-gradient(180deg, rgba(161, 140, 209, 0.6) 0%, rgba(251, 194, 235, 0.6) 100%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.giftPictureBox {
	width: 100%;
	height: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.giftBoxPicture {
	width: 65%;
	height: 80%;
}

.texts {
	width: 100%;
	height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.congratulateText {
	font-size: 24px;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(33, 7, 94, 0.89);
	margin-bottom: 80rpx;
}

.gainText {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(33, 7, 94, 0.89);
	margin-bottom: 50rpx;
}

.giftContentText {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(255, 87, 51, 0.89);
	margin-bottom: 50rpx;
}

.equalCashText {
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(255, 87, 51, 0.57);
	margin-bottom: 60rpx;
	margin-top: 50rpx;
}

.forDetailButton {
	width: 180rpx;
	height: 90rpx;
	border-radius: 30rpx;
	background-color: rgba(121, 72, 234, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
}

.forDetailText {
	font-size: 34rpx;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(255, 255, 255, 1);
	text-align: left;
	vertical-align: top;
}

.sorryText {
	font-size: 24px;
	font-weight: 700;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(88, 83, 102, 0.89);
	text-align: center;
	vertical-align: top;
	margin-bottom: 70rpx;
}
</style>
