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
					我参与的
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<!-- 选择栏 -->
		<view class="chooseMenu">
			<view :class="['weikaijiangBTN',this.choosedIndex==0?'choosed':'']" @click="changeIndex(0)">
				未开奖
			</view>
			<view :class="['yikaijiangBTN',this.choosedIndex==1?'choosed':'']" @click="changeIndex(1)">
				已开奖
			</view>
		</view>
		<!-- 放活动内容 -->
		<view class="lotteryListArea">
			<view v-for="(item,index) in showList"
				:key="index" id="demo1"
				class="giftCellStyle">
				<view class="cellTop">
					<view class="lotteryIdArea">
						抽奖编号：{{item.lotteryId}}
					</view>
					<view class="lotteryNameArea">
						{{item.title}}
					</view>
				</view>
				<view class="cellBottom">
					<view v-if="item.isRunned == 1" class="statusButton" @click="viewResult(item.lotteryId)">
						<text class="cellStatusText">查看结果</text>
					</view>
					
					<view v-else-if="item.giftStatus == '已结束'" class="statusButton1" @click="weikaijiang()">
						<text class="cellStatusText">开奖时间:{{item.runTime}}</text>
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
				choosedIndex:0,
				//指示目前正在展示的列表内容
				showList:[],
				//未开奖列表内容
				weikaijiangList:[],
				//已开奖列表内容
				yikaijiangList:[],
			}
		},
		methods: {
			//返回上页
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			//更改选定的内容
			changeIndex(index){
				console.log("选中index：" + index);
				this.choosedIndex = index;
				if(index==0){
					console.log("未开奖列表长度为:" + this.weikaijiangList.length);
					this.showList = this.weikaijiangList;
				}else{
					console.log("已开奖列表长度为:" + this.yikaijiangList.length);
					this.showList = this.yikaijiangList;
				}
			},
			//转化毫秒数
			changeSeconds(seconds){
				var date = new Date(seconds).toLocaleString();
				console.log(date);
				return date;
			},
			//查看结果
			viewResult(lotteryId){
				console.log("要查看的抽奖活动id:" + lotteryId);
				
				//发起查看开奖信息的请求
				var that = this;
				uni.request({
					url:'https://www.meta-artwork.com:10584/core/lottery/extends/joined/result',
					header:{
						'sa-token':uni.getStorageSync('tokenValue')
					},
					data:{
						lotteryId:lotteryId
					},
					success(res) {
						console.log("发起查看开奖信息的请求");
					}
				})
			},
			//未开奖
			weikaijiang(){
				uni.showModal({
					title:"注意",
					content:"尚未开奖,敬请期待",
					showCancel:false
				})
			}
		},
		onLoad(){
			//把this的指向赋给this
			var that = this;
			
			//发起获得用户所有抽奖信息的请求
			uni.request({
				url:'https://www.meta-artwork.com:10584/core/lottery/extends/joined',
				header:{
					'sa-token':uni.getStorageSync('tokenValue')
				},
				success(res) {
					console.log("发起获得用户所有抽奖信息的请求");
					console.log("返回数组的长度:" + res.data.data.length);
					for(var i=0; i<res.data.data.length;i++){
						console.log("第"+i+"个抽奖活动的isRunned:" + res.data.data[i].isRunned);
						console.log("第"+i+"个抽奖活动的开奖日期:" + res.data.data[i].runTime);
						res.data.data[i].runTime = that.changeSeconds(res.data.data[i].runTime);
						console.log("第"+i+"个抽奖活动的开奖日期转换:" + res.data.data[i].runTime);
						if(res.data.data[i].isRunned==1){//此时已经过了开奖时间,已开奖
							that.yikaijiangList.push(res.data.data[i]);
						}else if(res.data.data[i].isRunned==0){//此时还未到开奖时间.未开奖
							that.weikaijiangList.push(res.data.data[i]);
						}
					}
				}
			})
		}
	}
</script>

<style>
	.container{
		height: 100vh;
		width: 100vw;
	}
	.status_bar{
		/* background-color: aqua; */
	}
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
	.chooseMenu{
		width: 100%;
		height: 4vh;
		/* background-color: aquamarine; */
		margin-top: 1vh;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		justify-content: space-around;
		margin-left: -18rpx;
	}
	.lotteryListArea{
		width: 100%;
		height: calc(100vh - 6vh - 5vh - 40px);
		/* background-color: aqua; */
		margin-left: -18rpx;
		display: flex;
		justify-content: flex-start;
		/* align-items: center; */
	}
	.giftCellStyle {
		margin-top: 50rpx;
		margin-left: 5%;
		margin-right: 5%;
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
		color: #BA55D3;
		font-weight: bold;
	}
	
	/*下面的不用管，在上面写*/
	.choosed{
		font-size: 35rpx;
		color: #BA55D3;
		font-weight: bold;
	}
</style>
