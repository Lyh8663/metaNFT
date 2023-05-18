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
					排行榜
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<view class="chartsArea">
			<view class="chart-item-left" @click="toYaoxinRank()">
				<view class="picArea">
					
				</view>
				<view class="textArea">
					邀新排行
				</view>
			</view>
			<view class="chart-item-right" @click="toCangpinRank()">
				<view class="picArea">
					
				</view>
				<view class="textArea">
					藏品排行
				</view>
			</view>
		</view>
		<view class="chartsArea">
			<view class="chart-item-left" @click="toMonthYaoxinRank()">
				<view class="picArea">
					
				</view>
				<view class="textArea">
					月度邀新排行
				</view>
			</view>
			<view class="chart-item-right" @click="toActivityRank()">
				<view class="picArea">
					
				</view>
				<view class="textArea">
					8月活动排行
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			toYaoxinRank(){
				uni.navigateTo({
					url:"../InviteRankDetail/InviteRankDetail"
				})
			},
			toCangpinRank(){
				uni.showModal({
					title:"注意",
					content:"此版本暂未开放此功能",
					showCancel:false,
				})
			},
			toMonthYaoxinRank(){
				uni.showModal({
					title:"注意",
					content:"此版本暂未开放此功能",
					showCancel:false,
				})
			},
			toActivityRank(){
				uni.showModal({
					title:"注意",
					content:"此版本暂未开放此功能",
					showCancel:false,
				})
			}
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
		font-weight: bold;
		margin-bottom: 30rpx;
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
	.chartsArea{
		width: 95vw;
		/* background-color: #BA55D3; */
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 50rpx;
	}
	.chart-item-left{
		width: 30vw;
		height: 40vw;
		/* background-color: aquamarine; */
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		justify-content: space-around;
	}
	.chart-item-right{
		width: 30vw;
		height: 40vw;
		/* background-color: aquamarine; */
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		justify-content: space-around;
	}
	.picArea{
		width: 25vw;
		height: 25vw;
		background-color: #fff;
		border-radius: 30rpx;
	}
	.textArea{
		font-size: 35rpx;
		font-weight: bold;
	}
</style>
