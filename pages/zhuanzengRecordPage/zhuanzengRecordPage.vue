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
					转赠记录
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
					全部
				</view>						
			</view>
			<view :class="['daizhifuArea',this.choosedIndex==1?'textChoosed':'textNormal']" @click="changeIndex(1)">
				<view class="daizhifuText">
					接收
				</view>						
			</view>
			<view :class="['yizhuanzengArea',this.choosedIndex==2?'textChoosed':'textNormal']" @click="changeIndex(2)">
				<view class="yizhuanzengText">
					送出
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
		<!-- 用于调试检查 -->
		<!-- <view class="">
			{{haveContent}}
		</view> -->
		<scroll-view scroll-y="true" :class="['quanbuContent',haveContent?'':'notDisplay']">
			<view class="yizhuanzengItem" v-for="(item,index) in showList" :key="index">
				<view class="zhuanzengPic">
					<image :src="item.url" mode=""></image>
				</view>
				<view class="zhuanzengInfo">
					<!-- 顶部的标签和商品名 -->
					<view class="zhuanzengTitleArea">
						<view class="zhuanzengTagArea">
							<view class="zhuanzengTagText">
								{{item.familyName}}
							</view>
						</view>
						<view class="zhuanzengNameArea">
							<view class="zhuanzengNameText">
								{{item.nftName}}
							</view>
						</view>
					</view>
					<!-- 编号 -->
					<view class="zhuanzengIdArea">
						<view class="zhuanzengIdTag">
							编号:
						</view>
						<view class="zhuanzengIdText">
							{{item.metaNftId}}
						</view>
					</view>
					<!-- 价格 -->
					<view class="zhuanzengOwnerArea">
						<!-- <view class="zhuanzengOwnerPic">
							
						</view> -->
						<view class="zhuanzengOwnerText">
							转给
						</view>
						<view class="zhuanzengOwnerPic">
							<image :src="item.guestUserHead" mode=""></image>
						</view>
					</view>
					<!-- 按钮 -->
					<view class="zhuanzengBTNArea">
						<view class="deleteBTN" @click="deleteRecord()">
							<view class="deleteBTNText">
								删除记录
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
		// var that = this;
		data() {
			return {
				//指示被选中的内容,默认是全部订单
				choosedIndex:0,
				haveContent:false,
				//表示正在展示的列表
				showList:[],
				//表示全部列表
				quanbuList:[],
				//表示接收列表
				jieshouList:[],
				//表示送出列表
				songchuList:[]
			}
		},
		methods: {
			//点击分栏时，执行本函数
			changeIndex(index){
				this.choosedIndex = index;
				console.log("index:" + index);
				if(index==0){
					this.showList = this.quanbuList;
					console.log("此时showList长度为：" + this.showList.length);
				}else if(index==1){
					this.showList = this.jieshouList;
					console.log("此时showList长度为：" + this.showList.length);
				}else if(index==2){
					this.showList = this.songchuList;
					console.log("此时showList长度为：" + this.showList.length);
				}
			},
			//返回上一级页面
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			//获取接收记录
			getjieshou:()=>{
				return uni.request({
					url:'https://www.meta-artwork.com:10584/core/user/records/transfer',
					header:{
						'sa-token':uni.getStorageSync('tokenValue')
					},
					success(res) {
						// console.log("此用户的token为：" + uni.getStorageSync('tokenValue'))
						console.log("正在发起获取接受记录的请求");
						// this.jieshouList = res.data.data;
						uni.setStorageSync('zhuanzeng_jieshou',res.data.data)
					}
				})	
			},
			//获取送出记录
			getsongchu(){
				return uni.request({
					url:'https://www.meta-artwork.com:10584/core/user/records/transfer/out',
					header:{
						'sa-token':uni.getStorageSync('tokenValue')
					},
					success(res) {
						// console.log("此用户的token为：" + uni.getStorageSync('tokenValue'))
						console.log("正在发起获取送出记录的请求");
						// this.songchuList = res.data.data;
						uni.setStorageSync('zhuanzeng_songchu',res.data.data)
					}
				})
			},
			//初始化页面的函数,将异步请求同步化
			initPage: async function(){
				await this.getjieshou();
				await this.getsongchu();
				
				var jieshouListtemp = uni.getStorageSync('zhuanzeng_jieshou');
				var songchuListtemp = uni.getStorageSync('zhuanzeng_songchu');
				
				this.jieshouList = jieshouListtemp;
				this.songchuList = songchuListtemp;
				
				//用接收和送出记录拼凑成全部记录
				console.log("正在合成全部列表");
				for(var i = 0;i<jieshouListtemp.length;i++){
					this.quanbuList.push(jieshouListtemp[i]);
					console.log("temp中藏品名：" + jieshouListtemp[i].nftName)
					console.log("list中藏品名：" + this.jieshouList[i].nftName);
				}
				for(var i = 0;i<songchuListtemp.length;i++){
					this.quanbuList.push(songchuListtemp[i]);
					console.log("temp中藏品名：" + songchuListtemp[i].nftName);
					console.log("list中藏品名：" + this.songchuList[i].nftName);
				}
				
				//检查各列表的长度
				console.log("全部列表的长度为：" + this.quanbuList.length);
				console.log("接收列表的长度为：" + this.jieshouList.length);
				console.log("送出列表的长度为：" + this.songchuList.length);
				
				//让页面加载好时，渲染全部列表的数据
				this.showList = this.quanbuList;
				this.haveContent = true;
			},
			//删除订单
			deleteRecord(){
				console.log("删除记录的功能没写");
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
			this.initPage();
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
	.quanbuContent{
		width: 100%;
		height: calc(100vh - 40px - 6vh - 4.5vh - 2vh - 1vh);
		margin-left: -18rpx;
		/* background-color: aquamarine; */
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
	.zhuanzengPic image{
		width: 100%;
		height: 100%;
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
		width: 9vh;
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
	.zhuanzengOwnerPic image{
		height: 100%;
		width: 100%;
	}
	.zhuanzengOwnerText{
		margin-left: 5vw;
		margin-right: 5vw;
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
