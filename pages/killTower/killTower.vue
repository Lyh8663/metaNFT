<template>
	<view>
		<!-- 杀戮塔 -->
		<nav-bar>
			<template slot="middle">
				<view class="px-3 py-1">
					<text class="font-lg font-weight-bold">杀戮塔</text>
				</view>
			</template>		
		</nav-bar>
		
		<!-- 这里放暂时未开通 -->
		<view class="weikaitongArea">
			<!-- <image class="weikaitongPic" src="../../static/bg22.png" alt=""> -->
			<image src="../../static/bg22.png" mode="" class="weikaitongPic"></image>
		</view>
		<view class="weikaitongTextArea">
			<view class="weikaitongText">
				----暂未开通，敬请期待----
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
	.weikaitongTextArea{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.weikaitongText{
		color: #BA55D3;
		font-weight: bold;
	}
</style>
