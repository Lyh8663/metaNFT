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
				</view>
			</template>
		
			<template slot="right">
				<view style="transform: translateX(-100%);">
					<image src="../collectionDetail/分享/分享小.png"
					 style="width: 50rpx; height:50rpx;"></image>
				</view>
			</template>
		
		</nav-bar>
		
		<scroll-view scroll-x="false" scroll-y="true" style="width: 100%; height: 1360rpx;">
			<!-- start：蓝色展示台 + 产品图片 -->
			<view class="gradient-bg">
				<image :src="prouductPictureUrl"
					class="productPictureStyle"
					mode=""></image>
				<image src="../collectionDetail/台子/台子@3x.png"
					mode=""
					class="taiziStyle"></image>
				<image src="../collectionDetail/gradient-bg/gradient-bg-3x.png"
					mode=""
					class="gradientBgStyle"
					></image>
			</view>
			<!-- end：蓝色展示台 + 产品图片 -->
			
			<!-- start: 商品详情 -->
			<view class="detail-content">
				
				<view class="productInfoBigStyle">
					<!-- start: 产品名 -->
					<view class="flex-center productNameStyle">
						<text class="productNameLabelStyle">{{productName}}</text>
					</view>
					<!-- end: 产品名 -->
					
					<!-- start: 作者信息 -->
					<view class="authorInfoBigStyle">
						<!-- start: 头像 + 紫V -->
						<view style="width: 50rpx; height:50rpx;">
							<image src="../collectionDetail/紫V认证/紫V@3x.png"
							class="purpleVStyle"></image>
							<image :src="authorInfo.authorPhotoUrl"
							mode="aspectFill" 
							class="authorPhotoStyle"></image>				
						</view>
						<!-- end: 头像 + 紫V -->
						<text class="authorNameStyle">{{authorInfo.authorName}}</text>
					</view>
					<!-- end: 作者信息 -->
					
					<!-- start: 编号价格信息 -->
					<view class="NumPriceInfoStyle">
						<!-- start：category + ID -->
						<view class="ProductCategoryAndIDStyle">
							<!-- start: category -->
							<view class="flex-center productCategoryStyle">
								<text>{{productCategory}}</text>
							</view>
							<!-- end: category -->
							<text>编号：{{productID}}</text>
						</view>
						<!-- end：category + ID -->
						
						<!-- start: price + label -->
						<view class="PriceAndLabel">
							<text class="buyInPrice">￥{{productPrice}}</text>
							<text class="buyInPriceLabel">购入价格</text>
						</view>
						<!-- end: price + label -->
					</view>
					<!-- end: 编号价格信息 -->
				</view>
				
				<view class="flex-center ownerAndContractStyle">
					<!-- start：拥有者框框 -->
					<view class="flex-center ownerBoxStyle">
						<!-- start：拥有者头像 + 信息 -->
						<view class="ownerNameAndLabel">
							
							<view style="width: 100rpx; height:100rpx;">
								<image :src="ownerInfo.ownerPhotoUrl"
								mode="aspectFill" 
								class="ownerPhoto"></image>				
							</view>
			
							<view style="display: flex; flex-direction:column; margin-left: 20rpx;">
								<text class="ownerLabel">拥有者</text>
								<text class="ownerName">{{ownerInfo.ownerName}}</text>
							</view>
						</view>
						<!-- end：拥有者头像 + 信息 -->
						
						<!-- start：购入日期框 -->
						<view class="buyInTimeBox">
							<text style="margin-bottom: 4rpx;">购入日期</text>
							<text>{{dealInfo.buyInDate}}</text>
						</view>
						<!-- end：购入日期框 -->
					</view>
					<!-- end：拥有者框框 -->
					
					<!-- start：合约框框 -->
					<view class="flex-center contractBoxStyle">
						<text style="margin-bottom: 8rpx;">合约地址：{{dealInfo.contractUrl}}</text>
						<text>合约协议：{{dealInfo.contractContent}}</text>
					</view>
					<!-- end：合约框框 -->
				</view>
			</view>
			<!-- end: 商品详情 -->
		</scroll-view>

		<view class="flex-center" style="width: 100%; height: 140rpx; ">
			<view class="bottomButtonStyle">
				<view class="flex-center leftButtonView" @click="toJishou()">
					<text class="leftButtonText">寄售</text>
				</view>
				
				<view class="flex-center rightButtonView" @click="toZhuanZeng()">
					<text class="leftButtonText">转赠</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productName: "创世日曜",
				prouductPictureUrl: "/static/csry.png",
				productCategory: "创世",
				productID: 1223334445,
				productLimitAmount: 999,
				productPrice: "99.00",
				authorInfo: {
					authorName: "一二三四",
					authorDescription: "平平无奇的青年艺术家",
					authorPhotoUrl: "https://img.js.design/assets/smartFill/img321164da746310.jpg"
				},
				productIntroduction : "平平无奇的产品罢了",
				ownerInfo: {
					ownerName : "Elsa Green",
					ownerPhotoUrl: "https://img.js.design/assets/publicImg/CEC8583C6064819.png"
				},
				dealInfo: {
					buyInDate : "2022.06.14",
					contractUrl : "https://aaa.abcefg.com",
					contractContent: "合约内容。"
				}
			}
		},
		onLoad(query) {
			// const item = JSON.parse(query.info)
			// this.item = item
			// console.log(this.item)
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta:1 // 返回上1页
				})
			},
			toggleError() {
				print("error")
			},
			toJishou() {
				// const queryString = JSON.stringify(this.item) 
				uni.navigateTo({
					// url: `/pages/collect-sale/collect-sale?info=${queryString}`
					url: `/pages/collect-sale/collect-sale`
				})
			},
			toZhuanZeng() {
				// const queryString = JSON.stringify(this.item) 
				uni.navigateTo({
					// url: `/pages/collect-zhuanzeng/collect-zhuanzeng?info=${queryString}`
					// url: `/pages/collect-zhuanzeng/collect-zhuanzeng`
					url:'../../transferPage/transferPage'
				})
			}
		}
	}
</script>

<style>
.gradient-bg {
	width: 100%;
	height: 728rpx;
}
.gradientBgStyle {
	z-index: 2; width: 100%; height:50%; position: absolute;
}

.taizi {
	width: 200rpx; 
	height: 100rpx;
	position: relative;
}

.taiziStyle {
	z-index: 3; 
	width: 66%; 
	height: 18%;
	margin-top: 60%;
	margin-left: 17%;
	position: absolute;
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.detail-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 3%;
}

.productPictureStyle {
	z-index: 4; 
	width:50%; 
	height:35%;
	margin-top: 8%;
	margin-left: 25%;
	border-radius: 42rpx;
	position: absolute;
}

.productInfoBigStyle {
	width: 100%; height: 320rpx;
	background: #2F2A39FF;
}

.productNameStyle {
	flex-dirextion: row; width:100%; margin-top: 30rpx;
}

.productNameLabelStyle {
	font-size: 60rpx; font-weight:700;
	letter-spacing: 0.2px; 
	color: rgba(239, 239, 239, 1)
}

.authorInfoBigStyle {
	display: flex;flex-direction: row;
	width: 90%;
	margin-top: 20rpx;
	margin-left: 30rpx;
	justify-content: flex-start;
	align-items: center;
}

.NumPriceInfoStyle {
	display: flex; 
	flex-direction:row;
	width:90%;
	justify-content: space-between;
	align-items: center;
	margin-left: 30rpx;
}

.ProductCategoryAndIDStyle {
	display: flex; 
	flex-direction:row;
	align-items:center;
	margin-top: 40rpx;
}

.productCategoryStyle {
	width: 108rpx; height:52rpx;
	border-radius: 26rpx;
	margin-right: 40rpx;
	background: linear-gradient(90deg,rgba(101, 55, 155, 1), 
	rgba(136, 106, 234, 1), rgba(100, 87, 198, 1));
	
}

.purpleVStyle {
	z-index:2;
	width: 16rpx;height:16rpx;
	position: absolute;
	margin-top: 34rpx;
	margin-left: 34rpx;
}

.authorPhotoStyle {
	z-index: 1;
	width: 50rpx;height:50rpx;
	border-radius:25rpx;
	position: absolute;
}

.authorNameStyle {
	font-size: 28rpx;
	color:rgb(166,166,166); 
	margin-left: 30rpx;
	margin-bottom:10rpx;
}

.PriceAndLabel {
	display: flex; 
	flex-direction:column;
	width:20%;
	justify-content: space-between;
	align-items: center;
	margin-right: 30rpx;
}

.buyInPrice {
	font-size: 48rpx;
	font-weight: 700;
	margin-bottom: 8rpx;
	display: inline-block;
	-webkit-background-clip: text;
	color: transparent;
	background-image: linear-gradient(to right, rgba(125, 226, 252, 1), rgba(185, 182, 229, 1));
}

.buyInPriceLabel {
	font-size: 22rpx;
	font-weight: 500;
	color: rgba(190, 171, 235, 1);
	margin-left: 16rpx;
}

.ownerAndContractStyle {
	width: 90%; margin-top: 40rpx; 
	flex-direction:column;
	align-items:flex-start;
}

.ownerBoxStyle {
	width: 100%; height: 148rpx;
	margin-bottom: 40rpx; 
	background:#2F2A39FF; 
	border-radius:40rpx;
	justify-content:space-between;
}

.contractBoxStyle {
	width: 95%; height: 148rpx;
	display: flex;
	flex-direction: column;
	margin-bottom: 40rpx; 
	background:#2F2A39FF; 
	border-radius:40rpx;
	justify-content: center;
	align-items: flex-start;
	padding-left: 40rpx;
}

.ownerNameAndLabel {
	display: flex;
	flex-direction:row; 
	margin-left:5%; 
	align-items:center;
	width:70%;
}
.ownerPhoto {
	z-index: 1;
	width: 98rpx;height:98rpx;
	border-radius:49rpx;
	position: absolute;
}
	 
.ownerLabel {
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 0.18px;
	line-height: 0px;
	color: rgba(131, 71, 255, 1);
	margin-bottom: 50rpx;
}

.ownerName {
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 0.14px;
	line-height: 0px;
	color: rgba(229, 229, 229, 1);
}

.buyInTimeBox {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 20rpx;
}

.bottomButtonStyle {
	width: 80%; height: 100%;
	display:flex;
	flex-direction:row;
	justify-content: space-between;
	align-items: center;
}

.leftButtonView {
	width: 224rpx; 
	height:102rpx;
	border-radius:30rpx;
	background:#AC33C1FF;
}

.rightButtonView {
	width: 224rpx; 
	height:102rpx; 
	border-radius:30rpx;
	background:#7948EAFF;
}

.leftButtonText {
	font-size: 40rpx; 
	font-weight: 700; 
	letter-spacing:2px; 
	color:rgb(239,239,239)
}
</style>
