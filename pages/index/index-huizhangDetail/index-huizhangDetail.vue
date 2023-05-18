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
				<view style="transform: translateX(-50%);">
				</view>
			</template>
		
		</nav-bar>
		
		<!-- start：弹窗 -->
		<view class="popUpStyle" v-show="isPopVisible">
			<view class="popUpTitleLine">
				<view style="width:30rpx; height:10rpx"></view>
				<text class="authorDesTitlePop">作者简介</text>
				<uni-icons type="closeempty" color="#c4c4c4" size="15" @click="closePop()"></uni-icons>
			</view>
			
			<!-- start：创作者框框 -->
			<view class="authorBigBoxPop" style="margin-top: 0rpx;margin-bottom: 0rpx;" @click="toggleAllProducts()">
				<!-- start：创作者头像 + 信息 -->
				<view class="authorPhotoAndInfo">
					<view style="height:100rpx;width: 100rpx;">
						<image src="../index-huizhangDetail/紫V认证/紫V@3x.png"
						class="purpleVStyle"></image>
						<image :src="authorInfo.authorPhotoUrl!=null?authorInfo.authorPhotoUrl:'https://img.js.design/assets/smartFill/img321164da746310.jpg'"
						mode="aspectFill" 
						class="authorPhotoStyle"></image>				
					</view>
					
					<view class="authorNameAndDescription1" style="justify-content: center;">
						<text class="authorNameStyle">{{authorInfo.authorName}}</text>
					</view>
				</view>
				<!-- end：创作者头像 + 信息 -->
				
				<!-- start：查看全部商品按钮 -->
				<text class="detailButton">查看全部商品</text>
				<!-- end：查看全部商品按钮 -->
			</view>
			<!-- end：创作者框框 -->
			
			<view v-html="authorInfo.authorLongDescription" style="width: 80%; height: 70%; white-space: prewrap; display:block;">
				
			</view>
		</view>
		<!-- end：弹窗 -->
		
		<scroll-view scroll-x="false" scroll-y="true" style="width: 100%; height: 1360rpx;">
			<view class="gradient-bg">
				<image :src="prouductPictureUrl"
					mode=""
					class="ProductPicture">
				</image>
				<image src="../index-huizhangDetail/台子/台子@3x.png"
					mode=""
					class="taiziPicture"
				></image>
				
				<image src="../index-huizhangDetail/gradient-bg/gradient-bg-3x.png"
					mode=""
					style="z-index: 2; width: 100%; height:50%; position: absolute;"
					></image>
					
				
			</view>
			<!-- start: 商品详情 -->
			<view class="detail-content">
				<!-- start: 产品类别 + 产品名 -->
				<view class="flex-center" style="flex-dirextion: row; width:100%;">
					<!-- start: 产品类别 -->
					<view class="flex-center" style="width: 30%;">
						<view class="flex-center productCategory1">
							<text class="productCategoryText1">{{productCategory}}</text>
						</view>
					</view>
					<!-- end: 产品类别 -->
					<text class="productName1">{{productName}}</text>
					<view style="width: 30%;"></view>
				</view>
				<!-- end: 产品类别 + 产品名 -->
				
				<!-- start: 产品限量 + 产品价格 -->
				<text class="productLimitAmount1">限量 · {{productLimitAmount}}份</text>
				<view class="productPriceView">
					<text class="productPriceText1">￥{{productPrice}}</text>
				</view>
				<!-- end: 产品限量 + 产品价格 -->
				
				<!-- start: 创作者 + 产品介绍 -->
				<view class="authorAndProductDescriptionBigView">
					<text class="authorLabel">创作者</text>
					<!-- 这里创作者头像不为空 -->
					<!-- 这里的作者头像为undefined -->
					<!-- <view class="">
						{{authorInfo.authorPhotoUrl==undefined?'123':'321'}}
					</view> -->
					<!-- start：创作者框框 -->
					<view class="authorBigBox" @click="toggleAuthorDetail1()">
						<!-- start：创作者头像 + 信息 -->
						<view class="authorPhotoAndInfo">
							<view style="width: 100rpx; height:100rpx;">
								<image src="../index-huizhangDetail/紫V认证/紫V@3x.png"
								class="purpleVStyle"></image>
								<image :src="authorInfo.authorPhotoUrl==undefined?'https://img.js.design/assets/smartFill/img321164da746310.jpg':authorInfo.authorPhotoUrl"
								mode="aspectFill" 
								class="authorPhotoStyle"></image>				
							</view>
							
							<view class="authorNameAndDescription1">
								<text class="authorNameStyle">{{authorInfo.authorName==undefined?'一二三四':authorInfo.authorName}}</text>
								<text class="authorDescriptionStyle">{{authorInfo.authorDescription==undefined?'平平无奇的青年艺术家':authorInfo.authorDescription}}</text>
							</view>
						</view>
						<!-- end：创作者头像 + 信息 -->
						
						<!-- start：详情按钮 -->
						<text class="detailButton">详情</text>
						<!-- end：详情按钮 -->
					</view>
					<!-- end：创作者框框 -->
					
					<text class="productDescriptionLabel">产品介绍</text>
					<view class="productDescriptionView">
					</view>
				</view>
				<!-- end: 创作者 + 产品介绍 -->
			</view>
			<!-- end: 商品详情 -->
		</scroll-view>

		<view class="flex-center" style="width: 100%; height: 140rpx; ">
			<view class="bottom1">
				<view class="flex-center leftButtonView">
					<text class="leftButtonText">优先购</text>
				</view>
				
				<view class="flex-center rightButtonView" @click="toPurchasePage()">
					<text class="rightButtonText">购买</text>
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
				productLimitAmount: 999,
				productPrice: "99.00",
				authorInfo: {
					authorName: "一二三四",
					authorDescription: "平平无奇的青年艺术家",
					authorPhotoUrl: '',
					authorLongDescription: "&nbsp&nbsp&nbsp&nbsp&nbsp 作为用户和产品之间的桥梁，社交分享在产品的发展过程中扮演了重要的角色。</br>&nbsp&nbsp&nbsp&nbsp&nbsp 在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台，而其中微信凭借高达9.38亿的月活跃用户以及高达29%的日均手机应用使用率，成为各款APP选择最多、排位最靠前的分享途径。即便同样是腾讯系下的QQ，也在QQ空间中加入了分享到微信好友和朋友圈的功能。"
				},
				productIntroduction : "平平无奇的产品罢了",
				isPopVisible: false,
				//以下两个字段用于唯一标识商品
				type:'',
				marketId:'',
			}
		},
		methods: {
			toPurchasePage(){
				uni.navigateTo({
					url:'../../purchasePage/purchasePage?type=' + this.type + '&marketId=' + this.marketId
				})
			},
			goback() {
				uni.navigateBack({
					delta:1 // 返回上1页
				})
			},
			toggleError() {
				console.log("error")
			},
			toggleAuthorDetail1() {
				// console.log("点击作者详情")
				this.isPopVisible = !this.isPopVisible
			},
			toggleAllProducts() {
				console.log("点击查看全部商品")
			},
			closePop() {
				this.isPopVisible = !this.isPopVisible
			}
		},
		onLoad(options){
			console.log("详情页加载");
			console.log("接收到的类型为：" + options.type);
			console.log("接收到的编号为：" + options.marketId);
			var type = options.type;
			var marketId = options.marketId;
			//将获取到的数据写入页面
			this.type = options.type;
			this.marketId = options.marketId
			
			//输出一下缓存中的token
			console.log("缓存中的token值为：" + uni.getStorageSync('tokenValue'))
			
			if(options.type == undefined && options.marketId==undefined){//开发时使用，如果为空则赋一个初始值
				type = 3;
				marketId = "1551494462026387458";
				
				this.type = 3;
				this.marketId = "1551494462026387458";
				console.log("两个参数为undefined,已赋予初值");
			}
			
			let that = this;
			console.log("此时this指向" + this);
			console.log("此时that指向" + that);
			
			uni.request({
				url:"https://www.meta-artwork.com:10584/core/shop/retrieve/detail",
				data:{
					marketId: marketId,
					type: type,
				},
				header:{
					'sa-token': uni.getStorageSync('tokenValue')
				},
				success(res){
					// console.log(res.statusCode);
					console.log("请求返回状态码为：" + res.data.code);
					console.log("请求返回信息为：" + res.data.message);
					console.log("名称为：" + res.data.data.baseNft.nickname);
					that.productName = res.data.data.baseNft.nickname + "";
					
					console.log("价格为：" + res.data.data.price);
					that.productPrice = res.data.data.price;
					
					console.log("创作者头像：" + res.data.data.baseNft.author.head);
					that.authorInfo.authorPhotoUrl = res.data.data.baseNft.author.head;
					
					console.log("创作者介绍：" + res.data.data.baseNft.author.introduce);
					that.authorInfo.authorDescription = res.data.data.baseNft.author.introduce;
					
					console.log("创作者名称：" + res.data.data.baseNft.author.name);
					that.authorInfo.authorName = res.data.data.baseNft.author.name;
					
					console.log("创作者id：" + res.data.data.baseNft.author.authorId);
					
					console.log("大图为：" + res.data.data.baseNft.url);
					that.prouductPictureUrl = res.data.data.baseNft.url;
					/*
						返回值类型
						"data": {
						        "familyId": "1550849310354149377",
						        "nftType": 3,
						        "nowCount": 5,
						        "limitPurchase": 10,
						        "isForSell": 0,
						        "createTime": 1658740080000,
						        "price": 99.9,
						        "baseNft": {
						            "professionType": null,
						            "introduce": "老八秘制小汉堡",
						            "author": {
						                "head": null,
						                "introduce": null,
						                "name": null,
						                "authorId": null
						            },
						            "contractAddress": "asdw****************************dasd",
						            "contractAgreement": "ESC-711",
						            "type": null,
						            "url": "https://meta-1312685046.cos.ap-nanjing.myqcloud.com/ikun.jpg",
						            "familyId": "1550849310354149377",
						            "rankId": null,
						            "familyName": "怨种",
						            "nickname": "小黑子给ikun爬",
						            "id": "1550851212034805761",
						            "stock": {
						                "nowCount": 50,
						                "reserveCount": 38,
						                "stockId": "1550851211992862722",
						                "preCount": 100
						            }
						        },
						        "sellTime": 1974359000,
						        "marketId": "1551494462026387458"
						    },
					*/
				}
			})
		}
	}
</script>

<style>
.gradient-bg {
	width: 100%;
	height: 728rpx;
}

.popUpStyle {
	z-index: 100; width: 80%; height:58%; background: #2b2b2b;
	border-radius: 40rpx;
	margin-top: 22.5%; margin-left: 10%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.authorDesTitlePop {
	font-size: 48rpx;
	font-weight: 700;
	color: rgb(255,255,255);
}

.popUpTitleLine {
	width: 90%;
	height: 8%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.ProductPicture {
	z-index: 4; width:50%; height:35%;
	margin-top: 8%;
	margin-left: 25%;
	border-radius: 42rpx;
	position: absolute;
}

.taizi {
	width: 200rpx; 
	height: 100rpx;
	position: relative;
}

.taiziPicture {
	z-index: 3; width: 66%; height: 18%;
	margin-top: 60%;
	margin-left: 17%;
	position: absolute;
}

.productCategory1 {
	width: 140rpx; 
	height:56rpx; 
	background: #2f2a39FF; 
	border-radius: 28rpx;
}

.productCategoryText1 {
	font-size: 28rpx;
	font-weight:700;
	letter-spacing: 0.2px;
	color: rgba(121, 72, 234, 1);
}

.authorBigBox {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%; 
	height: 148rpx;
	margin-top: 30rpx; 
	background:#2F2A39FF; 
	border-radius:40rpx;
	justify-content:space-between;
	margin-bottom: 30rpx;
}

.authorBigBoxPop {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 95%; 
	height: 148rpx;
	margin-top: 30rpx; 
	border-radius:40rpx;
	justify-content:space-between;
	margin-bottom: 30rpx;
}

.authorPhotoAndInfo {
	display: flex; 
	flex-direction:row; 
	margin-left:5%; 
	align-items:space-between;
}
.authorNameStyle {
	font-size: 40rpx; 
	font-weight:700; 
	color:rgb(229,229,229); 
	margin-bottom:10rpx;
}

.detailButton {
	font-size: 14px; 
	font-weight:500; 
	color:rgb(131,71,255);
	margin-right:5%;
}

.productDescriptionLabel {
	font-size: 36rpx; 
	font-weight:700; 
	color:rgb(255,255,255);
}
.productDescriptionView {
	width:112.5%;
	margin-left: -5%;
	height: 800rpx;
	margin-top:30rpx;
	background: linear-gradient(rgba(151, 217, 225, 1), rgba(217, 175, 217, 1));
	border-radius:40rpx; 
	margin-bottom: 5%;
}

.purpleVStyle {
	z-index:2;
	width: 30rpx;height:30rpx;
	position: absolute;
	margin-top: 68rpx;
	margin-left: 68rpx;
}
.authorPhotoStyle {
	z-index: 1;
	width: 98rpx;height:98rpx;
	border-radius:49rpx;
	position: absolute;
}

.authorNameAndDescription1 {
	display: flex; 
	flex-direction:column; 
	margin-left: 20rpx;
}

.productName1 {
	/* background-color: #AC33C1FF; */
	/* width: 60vw; */
	/* background-color: #7948EAFF; */
	font-size: 60rpx; 
	font-weight: bold; 
	letter-spacing: 0.2px; 
	color: rgba(239, 239, 239, 1);
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow:ellipsis;
}
/*
.overflow{

                width:220px;

                overflow:hidden;

                white-space: nowrap;

                text-overflow: ellipsis;

                -o-text-overflow:ellipsis;

            }
*/
.productLimitAmount1 {
	margin-top: 10rpx; 
	font-size:36rpx;
	font-weight: 700; 
	color:rgba(255, 195, 0, 1)
}

.productPriceView {
	width: 90%; 
	display:flex; 
	justify-content: flex-end; 
	align=items: center;
}

.productPriceText1 {
	font-size: 60rpx; 
	font-weight: 700; 
	color:rgb(239, 239, 239)
}

.authorAndProductDescriptionBigView {
	width: 80%; 
	margin-top: 40rpx; 
	flex-direction:column;
	align-items:flex-start;
}

.authorLabel {
	font-size: 36rpx; 
	font-weight:700; 
	color:rgb(255,255,255)
}

.authorDescriptionStyle {
	font-size: 28rpx; 
	font-weight:500; 
	color:rgb(229, 229, 229)
}

.bottom1 {
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

.leftButtonText {
	font-size: 40rpx; 
	font-weight: 700; 
	letter-spacing:2px; 
	color:rgb(239,239,239)
}

.rightButtonView {
	width: 224rpx; 
	height:102rpx; 
	border-radius:30rpx;
	background:#7948EAFF;
}

.rightButtonText {
	font-size: 40rpx; 
	font-weight: 700; 
	letter-spacing:2px; 
	color:rgb(239,239,239)
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
</style>
