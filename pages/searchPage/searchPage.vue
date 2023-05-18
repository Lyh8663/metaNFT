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
				<!-- <view class="titleText">
					邀请排行榜
				</view> -->
				<view class="inputArea">
					<input type="text" class="searchContent" placeholder="搜索商品、系列、盲盒">
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					<view class="searchBTN">
						<!-- <button class="searchBTN"> -->
							<image src="../../static/sousuo.png" alt="">
						<!-- </button> -->
					</view>
				</view>
			</view>
		</view>
		<view class="bodyArea">
			<view class="HistoryArea">
				<view class="historyHead">
					<view class="historyTitle">
						历史记录
					</view>
					<view class="BTNArea">
						<view class="historyDeleteBTN">
							<image src="../../static/shanchu.png" alt="">
						</view>
						<view class="unfoldBTN">
							<view class="unfoldText">
								展开
							</view>
						</view>
					</view>
				</view>
				<view class="historyTags">
					<view class="historyTag" v-for="(item,index) in searchHistoryList">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="FoundArea">
				<view class="foundHead">
					<view class="historyTitle">
						搜索发现
					</view>
					<view class="BTNArea">
						<view class="changeBTN">
							<image src="../../static/huanyihuan.png" alt="">
						</view>
						<view class="unfoldBTN">
							<view class="changeText">
								换一换
							</view>
						</view>
					</view>
				</view>
				<view class="foundTags">
					<view class="leftTagArea">
						<view class="foundTag-left" v-for="(item,index) in foundList1">
							{{item.text}}
						</view>
					</view>
					<view class="rightTagArea">
						<view class="foundTag-right" v-for="(item,index) in foundList2">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchHistoryList:[
					{text:'唱'},
					{text:'跳'},
					{text:'rap'},
					{text:'篮球'},
					{text:'藏品1号'},
					{text:'藏品2号'},
					{text:'藏品3号'},
					{text:'图画'},
					{text:'徽章'},
					{text:'空投'},
					{text:'114514'}
				],
				foundList1:[
					{text:'唱跳rap篮球'},
					{text:'小黑子'},
					{text:'只因你太美'},
					{text:'ikun'},
				],
				foundList2:[
					{text:'ctrl'},
					{text:'铁山靠'},
					{text:'你干嘛啊哈啊'},
					{text:'美国校队'},
				],
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			
		}
	}
</script>

<style>
	.container{
		width: 100%;
		height: 100%;
		/* background-color: aqua; */
	}
	.headArea{
		height: 6vh;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 35rpx;
		font-weight: bold;
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
	.inputArea{
		background-color: #292929;
		width: 45vw;
		height: 4.5vh;
		margin-top: -10rpx;
		border-radius: 1000000000rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.searchContent{
		/* margin-left: 4vw; */
		text-align: center;
		font-size: 27rpx;
	}
	.searchBTN{
		background-color: #7948ea;
		width: 10vw;
		height: 10vw;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -10rpx;
		border-radius: 20rpx;
	}
	.searchBTN image{
		width: 75%;
		height: 75%;
	}
	.HistoryArea{
		margin-top: 10rpx;
	}
	.historyHead{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.historyTitle{
		margin-top: 10rpx;
		margin-left: 5rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
	.BTNArea{
		display: flex;
		/* background-color: #BA55D3; */
		align-items: center;
		justify-content: center;
		/* margin-left: -20rpx; */
		margin-right: 20rpx;
	}
	.historyDeleteBTN{
		height: 5vh;
		width: 5vh;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 50rpx;
		/* background-color: aqua; */
		margin-right: 0rpx;
	}
	.historyDeleteBTN image{
		height: 60%;
		width: 60%;
		margin-top: 5rpx;
	}
	.unfoldBTN{
		height: 5vh;
		width: 5vh;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 50rpx;
		/* background-color: aqua; */
	}
	.unfoldText{
		font-size: 30rpx;
	}
	.historyTags{
		width: 95%;
		/* height: 20vh; */
		/* background-color: #7948ea; */
		/* padding-right: -24rpx; */
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		/* justify-content: space-around; */
	}
	/* .historyTag{
		width: ;
	} */
	.historyTag{
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		/* background-color: #BA55D3; */
		background-color: #292929;
		border-radius: 1000000000rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		margin-right: 50rpx;
		color: #747373;
		font-size: 27rpx;
	}
	.FoundArea{
		margin-top: 10rpx;
	}
	.foundHead{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.changeText{
		font-size: 27rpx;
	}
	.changeBTN{
		height: 5vh;
		width: 5vh;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 50rpx;
		/* background-color: aqua; */
		margin-right: 0rpx;
		/* margin-left: -20rpx; */
	}
	.changeBTN image{
		height: 60%;
		width: 60%;
		margin-top: 5rpx;
	}
	.foundTags{
		width: 95%;
		/* height: 20vh; */
		/* background-color: #7948ea; */
		/* padding-right: -24rpx; */
		display: flex;
		/* flex-wrap: wrap; */
		/* align-content: flex-start; */
		/* justify-content: space-around; */
	}
	/* .historyTag{
		width: ;
	} */
	.leftTagArea{
		flex: 1;
		color: #747373;
	}
	.foundTag-left{
		font-size: 30rpx;
		margin-bottom: 15rpx;
	}
	.rightTagArea{
		flex: 1;
		color: #747373;
	}
	.foundTag-right{
		font-size: 30rpx;
		margin-bottom: 15rpx;
	}
</style>
