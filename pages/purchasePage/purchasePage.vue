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
					购买
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
			<view class="collectionItem">
				<!-- 商品图 -->
				<view class="collectionPic">
					<image :src="this.prouductPictureUrl" mode=""></image>
				</view>
				<!-- 商品信息 -->
				<view class="collectionInfo">
					<view class="InfoTitle">
						<view class="collectionTag">
							<view class="collectionTagText">
								创世
							</view>
						</view>
						<view class="collectionName">
							<view class="collectionNameText">
								{{this.productName}}
							</view>
						</view>
					</view>
					<view class="collectionIdArea">
						<view class="collectionIdTag">
							编号:
						</view>
						<view class="collectionId">
							{{this.productId}}
						</view>
					</view>
					<view class="itemPriceAndNumArea">
						<view class="itemPriceArea">
							<view class="itemPriceTag">
								￥
							</view>
							<view class="itemPrice">
								{{this.productPrice}}
							</view>
						</view>
						<view class="itemNumArea">
							<view class="subBTN" @click="subNum()">
								<view class="subBTNText">
									-
								</view>
							</view>
							<view class="itemNum">
								<view class="itemNumText">
									{{this.productNum}}
								</view>
							</view>
							<view class="addBTN" @click="addNum()">
								<view class="addBTNText">
									+
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部内容 -->
		<view class="bottomArea">
			<!-- 显示价格 -->
			<view class="totalPriceArea">
				<view class="totalPriceText">
					合计
				</view>
				<view class="totalPriceTag">
					：￥
				</view>
				<view class="totalPriceNum">
					{{this.productPrice}}
				</view>
			</view>
			<!-- 购买按钮 -->
			<view class="purchase">
				<button class="purchaseBTN" @click="purchase()">
					<view class="purchaseText">
						购买
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
				//用于接收传入的数据
				type:'',
				marketId:'',
				//商品名
				productName:'',
				//商品总价
				productPrice:'',
				//商品单价
				productSinglePrice:'',
				//商品编号
				productId:'',
				//商品图片
				prouductPictureUrl:'',
				//商品数量
				productNum:1,
			}
		},
		methods: {
			//购买按钮点击事件
			purchase(){
				//将this的指向赋给that
				var that = this;
				
				//调用uniapp API uni.getProvider 获取服务供应商
				uni.getProvider({
					/*
						获取服务类型，可选值如下
						@param share 分享
						@param oauth 授权登录
						@param push 推送
						@param payment 支付类型
					*/
				   service:"payment",
				   success(res){
					   /*
					   * @ res.service 获取服务供应商 ==> 'payment'
					   * @ res.provider 这里选择的是支付类型，所以包含["alipay","wxpay"]
					   * ‘alipay’: 表示支付宝
					   * ‘wxpay’: 表示微信
					   */
					  for(var i = 0;i<res.provider.length;i++){
						  console.log(res.provider[i]);
					  }
					  console.log("检查得到的服务商如上");
					  //检查res.provider中是否有alipay
					  if(res.provider.indexOf('alipay')!=-1){
						  //发起后端支付接口请求
						  
					  }
				   }
				})
			},
			//返回上页
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			//+号被点击时的逻辑
			addNum(){
				//对数量进行操作
				this.productNum++;
				//对总价操作
				this.productPrice = this.productSinglePrice * this.productNum;
			},
			//-号被点击时的逻辑
			subNum(){
				//对数量进行操作,如果数量已经为1，不允许再减少
				if(this.productNum == 1){
					uni.showModal({
						content:"数量无法再减少",
						showCancel:false,
					})
					return;
				}
				
				//数量不唯一时执行
				this.productNum--;
				
				//对总价进行操作
				this.productPrice = this.productSinglePrice * this.productNum;
			}
		},
		onLoad(options){
			console.log('购买页的数据type：' + options.type);
			console.log('购买页的数据marketId：' + options.marketId);
			
			//将数据写入页面
			this.type = options.type;
			this.marketId = options.marketId;
			
			//如果没有传入数据
			if(options.type==undefined&&options.marketId==undefined){
				this.type = 3;
				this.marketId = "1551494462026387458";
			}
			
			//将this的指向付给that
			let that = this;
			
			//发送请求，获得商品数据
			uni.request({
				url:"https://www.meta-artwork.com:10584/core/shop/retrieve/detail",
				data:{
					marketId: this.marketId,
					type: this.type,
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
					that.productSinglePrice = res.data.data.price;//一开始商品的单价和总价都是相同的，因为数量为1
					
					console.log("编号为：" + res.data.data.baseNft.id);
					that.productId = res.data.data.baseNft.id;
										
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
	.collectionItem{
		width: calc( 400/428 * 100vw);
		height: calc(169/428 * 100vw);
		background-color: #fff;
		margin-left: calc(14/428 * 100vw);
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
	.collectionPic image{
		height: 100%;
		width: 100%;
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
	}
	.itemPrice{
		font-weight: bold;
	}
	.itemNumArea{
		display: flex;
		margin-left: calc(35/120 * 120/400 * 400/428 * 100vw);
	}
	.subBTN{
		font-size: 35rpx;
		width: calc(22/120 * 120/400 * 400/428 * 100vw);
		height: calc(22/120 * 120/400 * 400/428 * 100vw);
		display: flex;
		align-items: center;
		justify-content: center;
		border: rgba(70, 154, 250, 1) solid 2px;
		border-radius: 10rpx;
		margin-right: calc(12/120 * 120/400 * 400/428 * 100vw);
	}
	.addBTN{
		font-size: 35rpx;
		width: calc(22/120 * 120/400 * 400/428 * 100vw);
		height: calc(22/120 * 120/400 * 400/428 * 100vw);
		display: flex;
		align-items: center;
		justify-content: center;
		border: rgba(70, 154, 250, 1) solid 2px;
		border-radius: 10rpx;
		margin-left: calc(12/120 * 120/400 * 400/428 * 100vw);
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
	.purchaseBTN{
		height: calc( 17/33 * 9vh);
		width: calc( 112/99 * 9vh);
		background: linear-gradient(180deg, rgba(95, 114, 189, 1) 0%, rgba(155, 35, 234, 1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
	}
</style>
