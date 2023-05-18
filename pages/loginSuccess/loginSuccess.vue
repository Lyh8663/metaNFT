<template>
	<view class="flex-column flex align-center justify-center" style="">
		<view class="" style="height: 300rpx;"></view>
		<view class="flex flex-1 flex-column justify-center align-center" style="">
			<image src="../../static/loginSuccess.png" mode="aspectFit" style="width: 260rpx;height: 260rpx;"></image>
			<text class="text-main-hover pt-2 font-lg font-weight-bold" style="font-size: 60rpx;">注册成功</text>
		</view>
		<view class="text-main-hover flex-1 mt-5">
			<u-button class="rounded"  @click="info" style="box-shadow: 0px 50px 50px rgba(0, 0, 0, 0.16);" size="large" text="完善个人信息" color="rgba(56, 56, 56, 1)"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:''
				
			}
		},
		methods: {
			onLoad(option) {
				this.password = option.password
			},
			info(){
				uni.navigateTo({
					url:`/pages/finishDetail/finishDetail?password=${this.password}`
				})
			},
			
		}
	}
</script>

<style>

</style>
