<template>
	<!-- 注意，本页所有为待支付的内容，现为未完成 -->
	<!-- 所有为已转增的内容，现为已完成 -->
	<!-- 所有为全部的内容，现为待支付 -->
	<view  class="container">
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
					我的订单
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<!-- 选择栏 -->
		<view class="chooseBarArea">
			<view :class="['quanbuArea',this.choosedIndex==0?'textChoosed':'textNormal']" @click="changeIndex(0)">
				<view class="quanbuText">
					<!-- 全部 -->
					待支付
				</view>						
			</view>
			<view :class="['daizhifuArea',this.choosedIndex==1?'textChoosed':'textNormal']" @click="changeIndex(1)">
				<view class="daizhifuText">
					<!-- 待支付 -->
					未完成
				</view>						
			</view>
			<view :class="['yizhuanzengArea',this.choosedIndex==2?'textChoosed':'textNormal']" @click="changeIndex(2)">
				<view class="yizhuanzengText">
					<!-- 已转赠 -->
					已完成
				</view>						
			</view>
		</view>
		<!-- 选择栏高光 -->
		<view class="chooseBarHighlight">
			<view class="quanbuHighlight">
				<view :class="['quanbuHighlightArea',this.choosedIndex==0?'':'highlightNotDisplay']">
					
				</view>
			</view>
			<view class="daizhifuHighlight">
				<view :class="['daizhifuHighlightArea',this.choosedIndex==1?'':'highlightNotDisplay']">
					
				</view>
			</view>
			<view class="yizhuanzengHighlight">
				<view :class="['yizhuanzenghighlightArea',this.choosedIndex==2?'':'highlightNotDisplay']">
					
				</view>
			</view>
		</view>
		<!-- 无栏目内容 -->
		<view class="emptyArea notDisplay">
			<image src="../../static/emptybg.png" mode=""></image>
		</view>
		<!-- 待支付栏目内容 -->
		<scroll-view scroll-y="true" :class="['quanbuContent',this.choosedIndex==0&&haveContent?'':'notDisplay']">
			<view class="dingdanItem" v-for="(item,index) in quanbuList" :key="index">
				<view class="orderPic">
					<image :src="item.baseNft.url" mode=""></image>
				</view>
				<view class="orderInfo">
					<!-- 顶部的标签和商品名 -->
					<view class="orderTitleArea">
						<view class="orderTagArea">
							<view class="orderTagText">
								{{item.baseNft.familyName}}
							</view>
						</view>
						<view class="orderNameArea">
							<view class="orderNameText">
								{{item.baseNft.nickname}}
							</view>
						</view>
					</view>
					<!-- 编号 -->
					<view class="orderIdArea">
						<view class="orderIdTag">
							编号:
						</view>
						<view class="orderIdText">
							{{item.baseNft.id}}
						</view>
					</view>
					<!-- 价格 -->
					<view class="orderPriceArea">
						<view class="orderPriceText">
							￥{{item.price * parseInt(item.count)}}
						</view>
						<view class="orderCount">
							x{{item.count}}
						</view>
					</view>
					<!-- 按钮 -->
					<view class="orderBTNArea">
						<view class="deleteBTN" @click="deleteOrder()">
							<view class="deleteBTNText">
								删除订单
							</view>
						</view>
						<view class="formoreBTN" @click="forMore()">
							<view class="formoreBTNText">
								去支付
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 原待支付栏目内容，现未完成栏目内容 -->
		<scroll-view scroll-y="true" :class="['daizhifuContent',this.choosedIndex==1&&haveContent?'':'notDisplay']">
			<view class="dingdanItem" v-for="(item,index) in daizhifuList" :key="index">
				<view class="orderPic">
					<image :src="item.baseNft.url" mode=""></image>
				</view>
				<view class="orderInfo">
					<!-- 顶部的标签和商品名 -->
					<view class="orderTitleArea">
						<view class="orderTagArea">
							<view class="orderTagText">
								{{item.baseNft.familyName}}
							</view>
						</view>
						<view class="orderNameArea">
							<view class="orderNameText">
								{{item.baseNft.nickname}}
							</view>
						</view>
					</view>
					<!-- 编号 -->
					<view class="orderIdArea">
						<view class="orderIdTag">
							编号:
						</view>
						<view class="orderIdText">
							{{item.baseNft.id}}
						</view>
					</view>
					<!-- 价格 -->
					<view class="orderPriceArea">
						<view class="orderPriceText">
							￥{{item.price * parseInt(item.count)}}
						</view>
						<view class="orderCount">
							x{{item.count}}
						</view>
					</view>
					<!-- 按钮 -->
					<view class="orderBTNArea">
						<view class="deleteBTN" @click="deleteOrder()">
							<view class="deleteBTNText">
								删除订单
							</view>
						</view>
						<view class="formoreBTN" @click="forMore()">
							<view class="formoreBTNText">
								查看更多
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 前已转赠栏目内容，现已完成栏目内容 -->
		<scroll-view scroll-y="true" :class="['yizhuanzengContent',this.choosedIndex==2&&haveContent?'':'notDisplay']">
			<view class="dingdanItem" v-for="(item,index) in yizhuanzengList" :key="index">
				<view class="orderPic">
					<image :src="item.baseNft.url" mode=""></image>
				</view>
				<view class="orderInfo">
					<!-- 顶部的标签和商品名 -->
					<view class="orderTitleArea">
						<view class="orderTagArea">
							<view class="orderTagText">
								{{item.baseNft.familyName}}
							</view>
						</view>
						<view class="orderNameArea">
							<view class="orderNameText">
								{{item.baseNft.nickname}}
							</view>
						</view>
					</view>
					<!-- 编号 -->
					<view class="orderIdArea">
						<view class="orderIdTag">
							编号:
						</view>
						<view class="orderIdText">
							{{item.baseNft.id}}
						</view>
					</view>
					<!-- 价格 -->
					<view class="orderPriceArea">
						<view class="orderPriceText">
							￥{{item.price * parseInt(item.count)}}
						</view>
						<view class="orderCount">
							x{{item.count}}
						</view>
					</view>
					<!-- 按钮 -->
					<view class="orderBTNArea">
						<view class="deleteBTN" @click="deleteOrder()">
							<view class="deleteBTNText">
								删除订单
							</view>
						</view>
						<view class="formoreBTN" @click="forMore()">
							<view class="formoreBTNText">
								查看更多
							</view>
						</view>
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
				//指示被选中的内容,默认是全部订单
				choosedIndex:0,
				//指示当前被选中的分类中是否有内容
				haveContent:false,
				//当"待支付"被选中时,要渲染的数据列表
				quanbuList:[],
				//当"未完成"被选中时,要渲染的数据列表
				daizhifuList:[],
				//当"已完成"被选中时,要渲染的数据列表
				yizhuanzengList:[],
			}
		},
		methods: {
			changeIndex(index){
				this.choosedIndex = index;
				console.log("index:" + index);
				if(index==0){//"全部"被选中时,加载其数据
					if(this.quanbuList==''){//此时无数据
						this.haveContent=false;
						console.log("无数据");
						console.log("haveContent:" + this.haveContent);
					}
					if(this.quanbuList!=''){//此时有数据
						this.haveContent=true;
						console.log("有数据");
						console.log("haveContent:" + this.haveContent);
					}
				}else if(index==1){//"待支付"被选中时,加载其数据
					if(this.daizhifuList==''){//此时无数据
						this.haveContent=false;
						console.log("无数据");
						console.log("haveContent:" + this.haveContent);
					}
					if(this.daizhifuList!=''){//此时有数据
						this.haveContent=true;
						console.log("有数据");
						console.log("haveContent:" + this.haveContent);
					}
				}else if(index==2){//"已转赠"被选中时,加载其数据
					if(this.yizhuanzengList==''){//此时无数据
						this.haveContent=false;
						console.log("无数据");
						console.log("haveContent:" + this.haveContent);
					}
					if(this.yizhuanzengList!=''){//此时有数据
						this.haveContent=true;
						console.log("有数据");
						console.log("haveContent:" + this.haveContent);
					}
				}
			},
			//返回上一级页面
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			//删除订单
			deleteOrder(){
				console.log("删除订单的功能没写");
				uni.showModal({
					content:"功能暂未开放，敬请期待",
					showCancel:false,
					title:"注意"
				})
			},
			forMore(){
				console.log("查看更多的功能没写");
				uni.showModal({
					content:"功能暂未开放，敬请期待",
					showCancel:false,
					title:"注意"
				})
			}
		},
		onLoad(){
			var that = this;
			//发起请求,获取全部订单
			uni.request({
				url:"https://www.meta-artwork.com:10584/core/buyorder/extends/search?createTimeFrom=&createTimeTo=&orderBy=&page=&row=&status=&updateTimeFrom=&updateTimeTo=",
				header:{
					'sa-token':uni.getStorageSync('tokenValue')
				},
				success(res) {
					console.log("发起全部订单查询");
					console.log(uni.getStorageSync('tokenValue'))
					// that.quanbuList = res.data.data;
					var quanbuListtemp = [];
					var weiwanchengListtemp = [];
					var yiwanchengListtemp = [];
					for(var i=0;i<res.data.data.length;i++){
						console.log("订单列表藏品名为：" + res.data.data[i].baseNft.nickname);
						// if(that.quanbuList[i].buyOrderStatus==0){
						// 	weiwanchengListtemp.push(that.quanbuList[i]);
						// }else{
						// 	yiwanchengListtemp.push(that.quanbuList[i]);
						// }
						if(res.data.data[i].buyOrderStatus==1){//待支付
							quanbuListtemp.push(res.data.data[i]);
						}else if(res.data.data[i].buyOrderStatus==2){//已完成
							yiwanchengListtemp.push(res.data.data[i]);
						}else if(res.data.data[i].buyOrderStatus==3){//超时已关闭（未完成）
							weiwanchengListtemp.push(res.data.data[i]);
						}
					}
					that.quanbuList = quanbuListtemp;
					that.daizhifuList = weiwanchengListtemp;
					that.yizhuanzengList = yiwanchengListtemp;
					that.haveContent = true;
					console.log("全部订单数量为：" + res.data.data.length);
					console.log("待支付订单数量：" + that.quanbuList.length);
					console.log("未完成订单数量：" + that.daizhifuList.length);
					console.log("已完成订单数量：" + that.yizhuanzengList.length);
				}
			})
			
		},
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
	.chooseBarArea{
		height: 4.5vh;
		width: 100%;
		margin-left: -18rpx;
		margin-top: 2vh;
		/* background-color: aquamarine; */
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
	}
	.quanbuArea{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.daizhifuArea{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.yizhuanzengArea{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chooseBarHighlight{
		width: 100%;
		height: 1vh;
		margin-left: -18rpx;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
	}
	.quanbuHighlight{
		flex: 1;
		height: 100%;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
	.daizhifuHighlight{
		flex: 1;
		height: 100%;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
	.yizhuanzengHighlight{
		flex: 1;
		height: 100%;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
	.quanbuHighlightArea{
		width: 15vw;
		height: 20%;
		background-color: aliceblue;
	}
	.daizhifuHighlightArea{
		width: 15vw;
		height: 20%;
		background-color: aliceblue;
	}
	.yizhuanzenghighlightArea{
		width: 15vw;
		height: 20%;
		background-color: aliceblue;
	}
	/* 内容为空时 */
	.emptyArea{
		width: 100%;
		margin-left: -18rpx;
		height: calc(100vh - 40px - 6vh - 4.5vh - 2vh - 1vh);
		/* background-color: #BA55D3; */
		background: linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(39, 39, 39, 1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.emptyArea image{
		width: 100%;
		height: 100%;
	}
	.quanbuContent{
		width: 100%;
		height: calc(100vh - 40px - 6vh - 4.5vh - 2vh - 1vh);
		margin-left: -18rpx;
		/* background-color: aquamarine; */
	}
	.dingdanItem{
		width: 95%;
		height: 20vh;
		background-color: aquamarine;
		margin-bottom: 2vh;
		margin-left: 2.5%;
		border-radius: 30rpx;
		background: rgba(41, 41, 41, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.orderPic{
		height: 16vh;
		width: 26vw;
		background-color: #BA55D3;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.orderPic image{
		height: 100%;
		width: 100%;
	}
	.orderInfo{
		height: 16vh;
		width: 55vw;
		margin-left: 5vw;
		/* background-color: bisque; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.orderTitleArea{
		display: flex;
	}
	.orderTagArea{
		height: 3.5vh;
		width: 9vh;
		/* background-color: #BA55D3; */
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(58, 48, 79, 1);
		border-radius: 100000rpx;
	}
	.orderNameArea{
		height: 3.5vh;
		display: flex;
		align-items: center;
		font-weight: bold;
		margin-left: 2vw;
	}
	.orderIdArea{
		display: flex;
		color: #BA55D3;
		font-size: 26rpx;
		margin-left: 2vw;
	}
	.orderPriceArea{
		display: flex;
		font-size: 45rpx;
		font-weight: bold;
		width: 55vw;
		/* background-color: #BA55D3; */
		justify-content: space-between;
	}
	.orderBTNArea{
		display: flex;
		font-size: 27rpx;
	}
	.deleteBTN{
		width: 20vw;
		height: 6vw;
		/* background-color: aquamarine; */
		background: rgba(56, 56, 56, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100000000000000000rpx;
		margin-left: 20vw;
	}
	.formoreBTN{
		width: 20vw;
		height: 6vw;
		/* background-color: aquamarine; */
		background: rgba(56, 56, 56, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100000000000000000rpx;
		margin-left: 2vw;
	}
	.daizhifuContent{
		width: 100%;
		height: calc(100vh - 40px - 6vh - 4.5vh - 2vh - 1vh);
		margin-left: -18rpx;
	}
	.yizhuanzengContent{
		width: 100%;
		height: calc(100vh - 40px - 6vh - 4.5vh - 2vh - 1vh);
		margin-left: -18rpx;
	}
	.yizhuanzengItem{
		width: 95%;
		height: 20vh;
		background-color: aquamarine;
		margin-bottom: 2vh;
		margin-left: 2.5%;
		border-radius: 30rpx;
		background: rgba(41, 41, 41, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.zhuanzengPic{
		height: 16vh;
		width: 26vw;
		background-color: #BA55D3;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.zhuanzengInfo{
		height: 16vh;
		width: 55vw;
		margin-left: 5vw;
		/* background-color: bisque; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.zhuanzengTitleArea{
		display: flex;
	}
	.zhuanzengTagArea{
		height: 3.5vh;
		width: 6vh;
		/* background-color: #BA55D3; */
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(58, 48, 79, 1);
		border-radius: 100000rpx;
	}
	.zhuanzengNameArea{
		height: 3.5vh;
		display: flex;
		align-items: center;
		font-weight: bold;
		margin-left: 2vw;
	}
	.zhuanzengIdArea{
		display: flex;
		color: #BA55D3;
		font-size: 26rpx;
		margin-left: 2vw;
	}
	.zhuanzengPriceArea{
		display: flex;
		font-size: 45rpx;
		font-weight: bold;
	}
	.zhuanzengOwnerArea{
		display: flex;
		align-items: center;
	}
	.zhuanzengOwnerPic{
		width: 10vw;
		height: 10vw;
		border-radius: 100000000000000rpx;
		background-color: #BA55D3;
		overflow: hidden;
	}
	.zhuanzengOwnerText{
		margin-left: 5vw;
	}
	.zhuanzengReceiverText{
		margin-left: 5vw;
	}
	.zhuanzengBTNArea{
		display: flex;
		font-size: 27rpx;
	}
	.deleteBTN{
		width: 20vw;
		height: 6vw;
		/* background-color: aquamarine; */
		background: rgba(56, 56, 56, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100000000000000000rpx;
		margin-left: 20vw;
	}
	.formoreBTN{
		width: 20vw;
		height: 6vw;
		/* background-color: aquamarine; */
		background: rgba(56, 56, 56, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100000000000000000rpx;
		margin-left: 2vw;
	}
	/* 下面的不需要动 */
	.textNormal{
		color: #5f5e5f;
	}
	.textChoosed{
		color: white;
		font-weight: bold;
	}
	.highlightNotDisplay{
		display: none;
	}
	.notDisplay{
		display: none;
	}
</style>
