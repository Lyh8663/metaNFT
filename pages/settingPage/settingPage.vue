<template>
	<view>
		<view class="view-container">
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
						设置
					</view>
				</view>
				<view class="inviteArea">
					<view class="inviteText">
						  
					</view>
				</view>
			</view>
			
			<view class="view-item">
				<view class="item-text">头像</view>
				<view >
					<image :src="touxiang" class="item-image"/>
					<image src="../../static/goto.png" class="item-image"/>
				</view>
			</view>
			<view class="view-item">
				<view class="item-text">用户名</view>
				<view class="item-right">
					<view class="item-username">{{username}}</view>
					<image src="../../static/goto.png" class="item-image"/>
				</view>
			</view>
			<view class="view-item-tb">
				<view class="item-text">支付密码</view>
				<image src="../../static/goto.png" class="item-image"/>
			</view>
			<view class="view-item">
				<view class="item-text">使用条款</view>
				<image src="../../static/goto.png" class="item-image"/>
			</view>
			<view class="view-item">
				<view class="item-text">隐私协议</view>
				<image src="../../static/goto.png" class="item-image"/>
			</view>
			<view class="view-item">
				<view class="item-text">帮助与反馈</view>
				<image src="../../static/goto.png" class="item-image"/>
			</view>
			<view class="view-item-tb">
				<view class="item-text">注销账号</view>
				<image src="../../static/goto.png" class="item-image"/>
			</view>
		</view>
		<view class="logoutBTN" @click="logout()">退出账号</view>
		<view class="version-text">当前版本{{version}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				touxiang:"../../static/tabbar/my-select.png",
				username:"张三李四",
				version:"1.1",
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
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
		}
	}
</script>

<style>
	.view-container{
		margin-top: 3vw;
	}
	.container{
		height: 100vh;
		width: 100vw;
	}
	.status_bar{
		/* background-color: aqua; */
	}
	.headArea{
		margin-left: 18rpx;
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
	.view-item{
		height: 8vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 2vw 20rpx 4vw;
		background-color: #2e2a38;
		border-bottom: 2rpx solid #1e1e1e;	
	}
	.view-item-tb{
		height: 8vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 2vw 20rpx 4vw;
		background-color: #2e2a38;
		border-bottom: 35rpx solid #1e1e1e;
		border-top: 35rpx solid #1e1e1e;
	}
	.item-text{
		color: #f1f1f1;
	}
	.item-image{
		width: 6vw;
		height: 6vw; 
		border-radius: 50%;
		position: relative;
		top: 5rpx;
	}
	.item-right{
		display: flex;
	}
	.item-username{
		color: #b3b3b3;
	}
	.logoutBTN{
		background-color: #2e2a38;
		color: red;
		text-align: center;
		padding-top: 5vw;
		padding-bottom: 5vw;
	}
	.version-text{
		color: #8b8b8b;
		font-size: 28rpx;
		text-align: center;
		margin-top: 5vw;
	}
</style>
