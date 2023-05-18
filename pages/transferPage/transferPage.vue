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
					转赠
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<!-- 接下来放scrollview -->
		<scroll-view scroll-y="true" class="collectionItemArea">
			<!-- 商品卡片 -->
			<view class="card">
				<view class="collectionItem">
					<!-- 商品图 -->
					<view class="collectionPic">
						
					</view>
					<!-- 藏品信息 -->
					<view class="collectionInfo">
						<view class="InfoTitle">
							<view class="collectionTag">
								<view class="collectionTagText">
									创世
								</view>
							</view>
							<view class="collectionName">
								<view class="collectionNameText">
									商品名商品名
								</view>
							</view>
						</view>
						<view class="collectionIdArea">
							<view class="collectionIdTag">
								编号:
							</view>
							<view class="collectionId">
								114514114514
							</view>
						</view>
						<view class="itemPriceAndNumArea">
							<view class="itemPriceArea">
								<view class="itemPriceTag">
									￥
								</view>
								<view class="itemPrice">
									99.00
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ownerInfo">
					<view class="headPic">
						
					</view>
					<view class="nameArea">
						<view class="nameText">
							收藏家收藏家
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部内容 -->
		<view class="bottomArea">
			<!-- 显示价格 -->
			<view class="receiverArea">
				<input type="text" placeholder="请输入受转赠者的编号">
			</view>
			<!-- 转赠按钮 -->
			<view class="purchase">
				<button class="purchaseBTN">
					<view class="purchaseText">
						转赠
					</view>
				</button>
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
			}
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
	.collectionItemArea{
		/* background-color: #BA55D3; */
		height: calc( 100vh - 40px - 9vh - 6vh);
		width: 100%;
		margin-left: -18rpx;
	}
	.card{
		width: calc( 400/428 * 100vw);
		height: calc(220/428 * 100vw);
		margin-left: calc(14/428 * 100vw);
		border-radius: 30rpx;
		background: rgba(56, 56, 56, 1);
		margin-top: 20rpx;
	}
	.collectionItem{
		width: calc( 400/428 * 100vw);
		height: calc(169/428 * 100vw);
		/* background-color: #fff; */
		/* margin-left: calc(14/428 * 100vw); */
		border-radius: 30rpx;
		background: rgba(56, 56, 56, 1);
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.collectionPic{
		width: calc(120/400 * 400/428 * 100vw);
		height: calc(120/400 * 400/428 * 100vw);
		background-color: aquamarine;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.collectionInfo{
		height: calc(131/400 * 400/428 * 100vw);
		width: calc(211/120 * 120/400 * 400/428 * 100vw);
		/* background-color: blueviolet; */
		/* background-color: chocolate; */
	}
	.InfoTitle{
		display: flex;
		align-items: center;
	}
	.collectionTag{
		width: calc(56/120 * 120/400 * 400/428 * 100vw);
		height: calc(28/120 * 120/400 * 400/428 * 100vw);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10000000000000000rpx;
		background: linear-gradient(90deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%);
	}
	.collectionName{
		font-weight: bold;
		margin-left: calc(10/120 * 120/400 * 400/428 * 100vw);
	}
	.collectionIdArea{
		font-size: 21rpx;
		display: flex;
		color: rgba(116, 142, 237, 1);
		margin-top: calc(10/120 * 120/400 * 400/428 * 100vw);
	}
	.itemPriceAndNumArea{
		display: flex;
		margin-top: calc(40/120 * 120/400 * 400/428 * 100vw);
		align-items: flex-end;
	}
	.itemPriceArea{
		display: flex;
		font-size: 45rpx;
		margin-left: calc(85/120 * 120/400 * 400/428 * 100vw);
	}
	.itemPrice{
		font-weight: bold;
	}
	.itemNumArea{
		display: flex;
		margin-left: calc(35/120 * 120/400 * 400/428 * 100vw);
	}
	.ownerInfo{
		margin-left: calc(25/120 * 120/400 * 400/428 * 100vw);
		margin-top: calc(10/120 * 120/400 * 400/428 * -100vw);
		display: flex;
		align-items: center;
	}
	.headPic{
		height: calc(45/120 * 120/400 * 400/428 * 100vw);
		width: calc(45/120 * 120/400 * 400/428 * 100vw);
		background-color: #BA55D3;
		border-radius: 10000000rpx;
		overflow: hidden;
	}
	.nameArea{
		font-size: 25rpx;
		/* font-weight: bold; */
		margin-left: calc(20/120 * 120/400 * 400/428 * 100vw);
	}
	.bottomArea{
		width: 100%;
		margin-left: -18rpx;
		background-color: #383838;
		height: 9vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.totalPriceArea{
		display: flex;
		align-items: flex-end;
	}
	.totalPriceNum{
		font-weight: bold;
		font-size: 45rpx;
		/* align-items: center; */
	}
	.totalPriceText{
		font-weight: bold;
	}
	.receiverArea{
		border: 1.2px solid rgba(229, 229, 229, 1);
		height: 70rpx;
		width: 58vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100000rpx;
	}
	.purchaseBTN{
		height: calc( 17/33 * 9vh);
		width: calc( 112/99 * 9vh);
		background: linear-gradient(180deg, rgba(95, 114, 189, 1) 0%, rgba(155, 35, 234, 1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
		border-radius: 30rpx;
	}
</style>
