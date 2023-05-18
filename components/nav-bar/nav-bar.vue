<template>
		<view class="">
				<view class="fixed-top bg-main pt-2" style="">
					<uni-status-bar></uni-status-bar>
					<view style="height: 110rpx;" class="flex  align-center">
						<view class="flex-1 flex justify-center align-center">
							<slot name="left"></slot>
						</view>
		<!-- 				<view class="flex-1 flex justify-center">
							<slot></slot>
						</view> -->
						<view class="flex-3 flex justify-center align-center">
							<slot name="middle"></slot>
						</view>
						<view class="flex-1 flex justify-end">
							<slot name="right"></slot>
						</view>
					</view>
				</view>
				<!-- 占位 -->
				<view>
					<uni-status-bar></uni-status-bar>
					<view style="height: 110rpx;"></view>
				</view>
			</view>
</template>

<script>
	export default {
		name:"nav-bar",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>