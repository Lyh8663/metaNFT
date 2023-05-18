<template>
	<view class="flex flex-column align-center w-100">
		<nav-bar>
			<template slot="left">
				<view >
					<text class="iconfont uicon-arrow-left font-lg font-weight-bold"></text>
				</view>
			</template>
			
			<template slot="middle">
				<view class="px-3 py-2">
					<text class="font-lg font-weight-bold">邀请排行榜</text>
				</view>
			</template>
				
			<template slot="right">
				<view style="transform: translateX(-50%);">
					<text class="text-purple font-sm ">排行榜列表</text>
				</view>
			</template>
			
		</nav-bar>
		
		<view class="flex align-center w-90 mb-4" v-for="(index,item) in 5" :key="index" >
			<view class="flex-1 flex justify-center align-center font-lg font-weight-bolder">{{index}}</view>
			<view class="flex-5 flex justify-center align-center rounded-lg bg-main-dark p-2">
				<view class="rounded-circle flex-1 flex justify-center align-center mr-2" style="height: 100rpx;width: 100rpx;">
					头像
				</view>
				<view class="flex-4 flex flex-column">
					<text>Angel</text>
					<text>专属称号</text>
				</view>
				<view class="flex-1">
					<text class="font-sm">邀请数</text>
					<text class="text-purple">666人</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
