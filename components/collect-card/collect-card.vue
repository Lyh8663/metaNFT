<template>
	<view>
		<view class="card-container">
			<view class="top">
				<view class="image-container">
					<image :src="image" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="right-top">
						<view class="right-top-left">
							{{tag}}
						</view>
						<view class="right-top-right overflow">
							{{nickname}}
						</view>
					</view>
					<view class="right-bottom" v-if="bianhao">
						编号：{{bianhao}}
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom-left">
					<image :src="author.head" mode="widthFix"></image>
					<view class="name">
						{{author.name}}
					</view>
				</view>
				<!-- <view class="bottom-right">
					￥99.00
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"collect-card",
		props: ['image', 'tag', 'nickname', 'bianhao', 'author'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.card-container {
	width: 600rpx;
	margin: auto;
	height: 300rpx;
	background: rgba(56, 56, 56, 1);
	margin: 0 40rpx;
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	border-radius: 20rpx;
	.top {
		flex: 3;
		display: flex;
		// justify-content: space-between;	
		align-items: center;
		.image-container {
			width: 180rpx;
			height: 180rpx;
			overflow: hidden;
			border-radius: 40rpx;
			image {
				width: 180rpx;
				height: 180rpx;
				overflow: hidden;
				background: linear-gradient(180deg, rgba(166, 192, 254, 1) 0%, rgba(246, 128, 132, 1) 100%);
			}
		}
		
		.right {
			height: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 30rpx;
			.right-top {
				display: flex;
				.right-top-left {
					// width: 90rpx;
					height: 50rpx;
					background: linear-gradient(90deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%);
					border-radius: 40rpx;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 10rpx;
				}
				.right-top-right {
					// width: 320rpx;
					max-width: 200rpx;
					height: 50rpx;
					color: rgba(255, 255, 255, 1);
					letter-spacing: 0.33px;
					font-size: 40rpx;
					font-weight: 700;
					margin-left: 30rpx;
				}
			}
			.right-bottom {
				color: rgba(166, 166, 166, 1);
				letter-spacing: 0.33px;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
	
	.bottom {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.bottom-left {
			display: flex;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
			
			.name {
				color: rgba(166, 166, 166, 1);
				margin-left: 30rpx;
			}
		}
		
		.bottom-right {
			color: rgba(255, 255, 255, 1);
			font-size: 56rpx;
			font-weight: 700;
		}
	}
}
</style>