<template>
	<view>
		<view class="flex justify-between align-center pt-3 mt-2 mb-1" style="">
			<view class="flex-1" 	>
				<text class="font-lg font-weight-bold">{{ranktype}}</text>
			</view>
				<view class="border-main flex-1 flex justify-end" style="transform: translateX(-15%);">
				<text class="text-purple">更多</text>
			</view>
			<!-- debug使用 -->
			<!-- <view class="">
				{{people.length}}
			</view> -->
		</view>
		
		<view class="py-1 my-2 bg-main-dark rounded-lg mx-auto" style="">
			<view class="flex justify-center align-center m-3" v-for="(item,index) in people" :key="index">
				<view class="headPicArea rounded-circle flex-1 flex justify-center align-center mr-2 mb-3" style="height: 100rpx;width: 100rpx;">
					<img v-if="item.head!=undefined" class="headPic" :src="item.head" alt="">
					<view v-else class="">
						暂无
					</view>
				</view>
				<view class="flex-4 flex flex-column ">
					<text class="font-lg">{{item.name==undefined?'未命名':item.name}}</text>
					<view class="">
						<!-- 截取了传入参数的内容 -->
						<text class="mr-2 font-sm">{{ranktype.slice(0,2)}}数</text>
						<text class="text-purple font-sm">{{item.inviteCount}}人</text>
					</view>
				</view>
				<view class="flex-1">
					<image :src="`../../static/rank${index+1}.png`" alt="" style="width: 60rpx;height: 60rpx;">
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"rank",
		data() {
			return {
				
			};
		},
		// 传入的参数
		props:{
			    ranktype:String,
			    people:Array,
			    default: () => []
		},
		methods:{
			
		}
	}
</script>

<style>
	.headPicArea{
		/* background-color: aqua; */
		background-color: #BA55D3;
	}
	.headPic{
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 10000000000000000rpx;
	}
</style>