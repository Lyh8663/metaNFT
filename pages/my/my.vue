<template>
	<view class="container">
		<!-- 市场 -->
		<nav-bar>
			<template slot="middle">
				<view class="px-3 py-1">
					<text class="font-lg font-weight-bold">我的</text>
				</view>
			</template>		
		</nav-bar>
		
		<!-- 用户信息栏 -->
		<view class="userInfoArea">
			<view class="headPicArea">
				<image class="headPic" :src="headurl || 'https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG' " mode=""></image>
			</view>
			<view class="userDetailArea">
				<view class="nameArea">
					{{username}}
				</view>
				<view class="qklaccountArea" @click="tofinishDetail()">
					区块链账户：<span class="qklaccountState">{{chainWallet==''?'未实名':chainWallet}}</span>
				</view>
				<view class="xuanyanArea">
					追求潮流的艺术收藏家
				</view>
			</view>
		</view>
		
		<!-- 功能按钮群 -->
		<view class="btnArea">
			<view class="btnRow">
				<view class="firstBTN btn"  @click="dingdanClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/dingdan.png" mode=""></image>
					</view>
					<view class="btnTitle">
						订单
					</view>
				</view>
				<view class="secondBTN btn" @click="gonggaoClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/gonggao.png" mode=""></image>
					</view>
					<view class="btnTitle">
						公告
					</view>
				</view>
				<view class="thirdBTN btn" @click="huodongClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/huodong.png" mode=""></image>
					</view>
					<view class="btnTitle">
						活动
					</view>
				</view>
				<view class="forthBTN btn" @click="paihangbang()">
					<view class="btnPic">
						<image src="../../static/MineBTN/paihangbang.png" mode=""></image>
					</view>
					<view class="btnTitle">
						排行榜
					</view>
				</view>
			</view>
			<view class="btnRow">
				<view class="firstBTN btn" @click="yaoqingClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/yaoqing.png" mode=""></image>
					</view>
					<view class="btnTitle">
						邀请
					</view>
				</view>
				<view class="secondBTN btn" @click="shezhiClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/shezhi.png" mode=""></image>
					</view>
					<view class="btnTitle">
						设置
					</view>
				</view>
				<view class="thirdBTN btn" @click="choujiangClick()">
					<view class="btnPic" style="margin-right: 8rpx;">
						<image src="../../static/MineBTN/choujiang.png" mode=""></image>
					</view>
					<view class="btnTitle">
						抽奖
					</view>
				</view>
				<view class="forthBTN btn" @click="zhuanzengClick()">
					<view class="btnPic">
						<image src="../../static/MineBTN/zhuanzeng.png" mode=""></image>
					</view>
					<view class="btnTitle">
						转赠
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="quitArea">
			<button class="logoutBTN" @click="logout()">退出登录</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				////////////原页面参数////////////
				imgsrc: 'https://s1.ax1x.com/2022/07/17/jINw2q.jpg',
				headurl: null,
				username: '名字名字',
				state: '未实名',
				declaration: '平平无奇的艺术收藏家',
				/////////////////////////////////
				chainWallet:uni.getStorageSync('chainWallet')
			}
		},
		onTabItemTap(){
			this.chainWallet = uni.getStorageSync('chainWallet');
		},
		onLoad() {
			this.chainWallet = uni.getStorageSync('chainWallet');
		},
		onShow() {
			this.chainWallet = uni.getStorageSync('chainWallet');
			this.username = uni.getStorageSync('username');
			this.headurl = uni.getStorageSync('head');
		},
		methods: {
			tofinishDetail(){
				uni.navigateTo({
					url:'../finishDetail/finishDetail'
				})
			},
			//添加了一个退出登录的按钮
			logout(){
				let temp = {'sa-token':uni.getStorageSync('tokenValue')};
				//这里是实名登记页面留下的缓存，要清除
				// uni.setStorageSync('realName',that.realName);
				// uni.setStorageSync('identity',that.identity);
				// uni.setStorageSync('chainWallet',res.data.data.chainWallet)
				uni.removeStorageSync('realName');
				uni.removeStorageSync('identity');
				uni.removeStorageSync('chainWallet');
				
				
				this.$request(this.$api.logout,temp,'POST').then(function(res){
					console.log(res)
				});
				this.$store.dispatch('logout')
				// uni.navigateTo({
				// 	url:"../login/login"
				// })
			},
			//订单点击事件
			dingdanClick(){
				// uni.showModal({
				// 	title:"注意",
				// 	content:"暂未开放，敬请期待",
				// 	showCancel:false,
				// })
				uni.navigateTo({
					url:"../orderPage/orderPage"
				})
			},
			//公告点击事件
			gonggaoClick(){
				uni.showModal({
					title:"注意",
					content:"暂未开放，敬请期待",
					showCancel:false,
				})
			},
			//活动点击事件
			huodongClick(){
				uni.showModal({
					title:"注意",
					content:"暂未开放，敬请期待",
					showCancel:false,
				})
			},
			//排行榜点击事件
			paihangbang(){
				
				//以前是直接跳转到邀请排行榜
				
				// uni.navigateTo({
				// 	url:"../InviteRankDetail/InviteRankDetail"
				// })
				
				//现在将会跳转到，排行榜选取的页面
				uni.navigateTo({
					url:"../ChartsPage/ChartsPage"
				})
			},
			//邀请点击事件
			yaoqingClick(){
				uni.navigateTo({
					url:"../inviteUserPage/inviteUserPage"
				})
			},
			//设置点击事件
			shezhiClick(){
				// uni.showModal({
				// 	title:"注意",
				// 	content:"暂未开放，敬请期待",
				// 	showCancel:false,
				// })
				uni.navigateTo({
					url:'../settingPage/settingPage'
				})
			},
			//抽奖点击事件
			choujiangClick(){
				uni.navigateTo({
					url:"/pages/my/choujiang/giftListPage/giftListPage"
				})
			},
			//转赠点击事件
			zhuanzengClick(){
				uni.navigateTo({
					url:'../zhuanzengRecordPage/zhuanzengRecordPage'
				})
			}
		}
	}
</script>

<style>
	.container{
		/* background-color: aquamarine; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.userInfoArea{
		/* margin-top: -50rpx; */
		margin-top: 30rpx;
		width: 95%;
		height: 13vh;
		/* background-color: aquamarine; */
		display: flex;
		align-items: center;
		/* background-color: aqua; */
	}
	.headPicArea{
		height: 10vh;
		width: 10vh;
		/* background-color: black; */
		/* margin-left: 30rpx; */
		border-radius: 10000000000000000rpx;
		overflow: hidden;
		border: #9932CC solid 2px;
	}
	.headPic{
		height: 100%;
		width: 100%;
	}
	.userDetailArea{
		width: 50vw;
		height: 10vh;
		/* background-color: aqua; */
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.nameArea{
		font-size: 45rpx;
		font-weight: bold;
	}
	.qklaccountArea{
		font-size: 25rpx;
		color: darkgray;
	}
	.qklaccountState{
		color: #9932CC;
	}
	.btnArea{
		width: 95%;
		margin-top: 7vh;
		/* background-color: #9932CC; */
		border-radius: 30rpx;
		background: linear-gradient(132.01deg, rgba(56, 56, 56, 1) 0%, rgba(97, 97, 97, 1) 50%, rgba(56, 56, 56, 1) 100%);
	}
	.btnRow{
		/* background-color: aquamarine; */
		width: 100%;
		height: 15vh;
		/* margin-top: 10rpx; */
		/* margin-bottom: 20rpx; */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.btn{
		flex:1;
		height: 12vh;
		/* width: 17%; */
		/* background-color: #9932CC; */
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		justify-content: center;
	}
	.btnPic{
		width: 15vw;
		height: 15vw;
		/* background-color: antiquewhite; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btnPic image{
		width: 60%;
		height: 60%;
	}
	.btnTitle{
		font-size: 30rpx;
		font-weight: bold;
	}
	.quitArea{
		margin-top: 20vh;
		width: 40vw;
		/* background-color: #BA55D3; */
	}
	.logoutBTN{
		background-color: #BA55D3;
		color: white;
	}
</style>
