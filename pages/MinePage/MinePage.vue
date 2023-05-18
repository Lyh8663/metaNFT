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
				<image class="headPic" src="https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG" mode=""></image>
			</view>
			<view class="userDetailArea">
				<view class="nameArea">
					魅塔收藏家
				</view>
				<view class="qklaccountArea">
					区块链账户：<span class="qklaccountState">未实名</span>
				</view>
				<view class="xuanyanArea">
					追求潮流的艺术收藏家
				</view>
			</view>
		</view>
		
		<!-- 功能按钮群 -->
		<view class="btnArea">
			<view class="btnRow">
				<view class="firstBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/17/jIrhDI.png" mode=""></image>
					</view>
					<view class="btnTitle">
						订单
					</view>
				</view>
				<view class="secondBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/17/jIsSaV.png" mode=""></image>
					</view>
					<view class="btnTitle">
						公告
					</view>
				</view>
				<view class="thirdBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/17/jIsFxJ.png" mode=""></image>
					</view>
					<view class="btnTitle">
						活动
					</view>
				</view>
				<view class="forthBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/17/jIsErR.png" mode=""></image>
					</view>
					<view class="btnTitle">
						排行榜
					</view>
				</view>
			</view>
			<view class="btnRow">
				<view class="firstBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/17/jIsma6.png" mode=""></image>
					</view>
					<view class="btnTitle">
						邀请
					</view>
				</view>
				<view class="secondBTN btn">
					<view class="btnPic">
						<image src="https://s1.ax1x.com/2022/07/18/jIstdP.png" mode=""></image>
					</view>
					<view class="btnTitle">
						设置
					</view>
				</view>
				<view class="thirdBTN btn">
					<view class="btnPic">
						
					</view>
					<view class="btnTitle">
						
					</view>
				</view>
				<view class="forthBTN btn">
					<view class="btnPic">
						
					</view>
					<view class="btnTitle">
						
					</view>
				</view>
			</view>
		</view>
		<view class="quitArea">
			<button class="logoutBTN" @click="logout()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				////////////原页面参数////////////
				imgsrc: 'https://s1.ax1x.com/2022/07/17/jINw2q.jpg',
				username: '名字名字',
				state: '未实名',
				declaration: '平平无奇的艺术收藏家',
				/////////////////////////////////
			}
		},
		methods: {
			//添加了一个退出登录的按钮
			logout(){
				uni.removeStorageSync('tokenValue');
				//这里是实名登记页面留下的缓存，要清除
				// uni.setStorageSync('realName',that.realName);
				// uni.setStorageSync('identity',that.identity);
				// uni.setStorageSync('chainWallet',res.data.data.chainWallet)
				uni.removeStorageSync('realName');
				uni.removeStorageSync('identity');
				uni.removeStorageSync('chainWallet');
				let temp = {'sa-token':uni.getStorageSync('tokenValue')};
				this.$request(this.$api.logout,temp,'POST').then(function(res){
					console.log(res)
				});
				uni.navigateTo({
					url:"../login/login"
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
		margin-top: -50rpx;
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
