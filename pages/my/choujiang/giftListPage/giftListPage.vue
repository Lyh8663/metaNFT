<template>
	<view>
		<!-- 为状态栏预留位置 -->
		<view class="status_bar" style="height:40px;width: 100%;">
		</view>
		<!-- 顶部栏 -->
		<view class="headArea">
			<view class="backArea">
				<image @click="goback()" class="backIMG" src="../../../../static/back.png" alt="">
			</view>
			<view class="titleArea">
				<view class="titleText">
					抽奖活动
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText" @click="toMyLottery()">
					  我的
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="false" scroll-y="true" class="giftScrollView">
			<view v-for="(item,index) in giftList" 
				:key="index" id="demo1"
				class="giftCellStyle"
				@click="gotoGiftDetailPage(item.lotteryId)">
				<view class="cellTop">
					<view class="lotteryIdArea">
						抽奖编号：{{item.lotteryId}}
					</view>
					<view class="lotteryNameArea">
						{{item.title}}
					</view>
				</view>
				<view class="cellBottom">
					<view v-if="item.isRunned == 1" class="statusButton">
						<text class="cellStatusText">已开奖</text>
					</view>
					<view v-else class="statusButton1">
						<text class="cellStatusText">未开奖</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftList : []
			}
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta:1 // 返回上1页
				})
			},
			gotoGiftDetailPage(index) {
				//console.log(index)
				console.log("选择的抽奖编号为：" + index)
				uni.navigateTo({
					url:'/pages/my/choujiang/giftListPage/giftDetailPage/giftDetailPage?lotteryId=' + index
				})
			},
			//查看我的抽奖
			toMyLottery(){
				uni.navigateTo({
					url:'../../../myLotteryPage/myLotteryPage'
				})
			}
		},
		onLoad(){
			
			//开发时
			console.log("用户token：" + uni.getStorageSync('tokenValue'));
			
			//将this的指向赋给that
			var that = this;
			
			//发起获取抽奖信息的请求
			uni.request({
				url:'https://www.meta-artwork.com:10584/core/lottery/extends/all',
				header:{
					'sa-token':uni.getStorageSync('tokenValue')
				},
				success(res){
					console.log("获取抽奖信息的请求");
					that.giftList = res.data.data;
				}
			})
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

/**/
	.headArea{
		/* background-color: navajowhite; */
		height: 6vh;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 35rpx;
		font-weight: bold;
		/* margin-bottom: 30rpx; */
		margin-left: 18rpx;
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
		margin-left: -30rpx;
	}
	.inviteArea{
		flex: 1;
		display: flex;
		align-items: center;
		/* justify-content: flex-end; */
		justify-content: center;
		color: #BA55D3;
	}
	.inviteText{
		font-size: 35rpx;
		color: white;
	}
/**/
.giftScrollView {
	width: 80%;
	margin-left: 10%;
	margin-right: 10%;
	margin-top: 80rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.giftCellStyle {
	width: 100%;
	height: 300rpx;
	opacity: 1;
	background: linear-gradient(rgba(151, 217, 225, 1),rgba(217, 175, 217, 1));
	border-radius: 68.4rpx;
	margin-bottom: 30rpx;
	display: flex;
	flex-direction: column;
}

.cellTop{
	width: 100%;
	height: 80%;
	/* background-color: aqua; */
	display: flex;
	flex-direction: column;
	/* align-items: space-between; */
	justify-content: space-evenly;
}

.lotteryIdArea{
	margin-left: 30rpx;
	color: white;
	font-weight: bold;
	/* margin-top: 20rpx; */
}

.lotteryNameArea{
	/* background-color: aquamarine; */
	font-size: 50rpx;
	font-weight: bold;
	text-align: center;
	letter-spacing: 0.5em;
}

.cellBottom{
	width: 92%;
	height: 20%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 20rpx;
}

.statusButton {
	width: 120rpx;
	height: 60rpx;
	background: rgba(118, 79, 175, 1);
	border-radius: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.statusButton1 {
	width: 120rpx;
	height: 60rpx;
	background: rgba(138, 138, 138, 1);
	border-radius: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.cellStatusText {
	font-size: 28rpx;
	fint-weight:700;
}

</style>
