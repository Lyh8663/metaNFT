<template>
	<view class="flex flex-column align-center">
		<!-- 市场 -->
		<nav-bar>
			<template slot="middle">
				<view class="px-3 py-1">
					<text class="font-lg font-weight-bold">市场</text>
				</view>
			</template>		
		</nav-bar>
		
		<!-- 搜索框 -->
		<view class="w-90 flex justify-center align-center" style="height: 130rpx;" v-if="isFinished">
			<view class="flex-5 ml-3">
				<view class=" ">
				<input style="height: 70rpx;padding-left: 80rpx;" type="text" class="font-md rounded-circle bg-dark" placeholder="搜索商品、系列、盲盒" @input="search"/>
				</view>
			</view>
			<view class="ml-3 flex justify-center align-center flex-1">
				<image src='../../static/search.png' alt="" style="width: 60rpx;height: 60rpx;">
			</view>
		</view>
		
		
		<view class="flex justify-center align-center w-100 " style="height: 100rpx;" v-if="isFinished">
			<view v-for="(index,item) in 4" :key="index" class="flex justify-center align-center" style="height: 130rpx;width: 25%;">
					<view @click="picker(index)" class="flex justify-center align-center text-center font-md">
						价格<text class="ml-1 iconfont uicon-arrow-down"></text>
					</view>
			</view>
		</view>

		<view class="w-90 flex justify-between row" v-if="isFinished">
			
			<view v-for="(index,item) in 10" :key="index" class="py-1 flex flex-column align-center mb-4 rounded-lg bg-main-dark " style="height: 500rpx;width: 48%;">
				<view class="rounded-circle" style="background-color: mediumvioletred;height: 320rpx;width: 320rpx;">
					
				</view>
				<view class="flex flex-0 justify-between align-center my-2">
					<view class="flex justify-center align-center bg-purple font-weight-bold font-lg px-3 py-1 mr-3 rounded-circle" >创世</view>
					<view class="font-lg font-weight-bold">¥99.00</view>
				</view>
				
				<view class="font-lg flex-0 font-weight-bolder flex justify-start  ml-4 mr-auto"> 
					<text>藏品名字</text>
				</view>
				<view class="font-sm flex-0 text-purple mt-1 ml-4 mr-auto">编号：232131</view>
			</view>
		</view>

		<view class="" v-for="(index,item) in 4" :key="index" v-if="isFinished">
			<u-picker :show=" showindex === index ? true : false " :columns="columns" @confirm="confirm" ></u-picker>
		</view>
		
		<!-- 这里放暂时未开通 -->
		<view class="weikaitongArea">
			<image class="weikaitongPic" src="../../static/bg11.png">
		</view>
		<view class="weikaitongText">
			----暂未开通，敬请期待----
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:"",
				showindex: 5,
				columns: [
				    ['中国', '美国', '日本']
				],
				//表示此页面是否开发完成
				//发布时，此页面未开发完成，设置为false
				isFinished:false,
			}
		},
		methods: {
			search(){
				
			},
			confirm(item){
				console.log(item);
				this.showindex = 0;
				// console.log(idnex);
			},
			picker(index){
				console.log(index);
				this.showindex = index;
			}
		}
	}
</script>

<style>
	.weikaitongArea{
		width: 100%;
		/* background-color: aquamarine; */
		height: 70vh;
		margin-top: 5vh;
	}
	.weikaitongPic{
		height: 100%;
		width: 100%;
	}
	.weikaitongText{
		color: #BA55D3;
		font-weight: bold;
	}
</style>
