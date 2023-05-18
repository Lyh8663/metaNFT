<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="space-image">
			<image :src="item.baseNft.url" mode="widthFix"></image>
		</view>
		<view class="title-wrapper">
			<view class="title">
				{{item.baseNft.nickname}}
			</view>
		</view>
		<view class="new-author-wrapper">
			<image :src="item.baseNft.author.head" mode="widthFix"></image>
			<text>{{item.baseNft.author.name}}</text>
		</view>
		
		<view class="new-tag-wrapper">
			<view class="tag">
				{{item.baseNft.familyName}}
			</view>
			<view class="num" v-if="item.uuTag">
				编号：{{item.uuTag}}
			</view>
			
			<!-- <view class="price-wrapper">
				<view class="price">
					￥9999
				</view>
				<view class="infoText">
					购入价格
				</view>
			</view> -->
			
		</view>
		
		<view class="owner-container">
			<view class="left-container">
				<image :src="head" mode="widthFix"></image>
				<view class="owner-info">
					<view class="owner-title">
						拥有者
					</view>
					<view class="owner-name">
						{{username}}
					</view>
				</view>
			</view>
			<view class="date-container">
				<view class="date-title">
						购入日期
				</view>
				<view class="text-white">
					
					<!-- {{item.updateTime.split('')[0]}} -->
					<!-- <uni-dateformat date="2020/10/20 20:20:20" :threshold="[0,0]"></uni-dateformat>
					 -->
					 <u--text mode="date" :text="item.updateTime"  block color='#FFFFFF'></u--text>
				</view>
			</view>
		</view>
		
		<view class="adrress-container">
			<view class="top">
				合约地址：https：//aaa.abcdefg.com
			</view>
			<view class="bottom">
				合约协议：协议协议xieyixieyixieyi
			</view>
		</view>
		
		<view class="fixed-bottom">
			<view class="left" @click="toJishou" v-show="false">
				寄售
			</view>
			<view class="right" @click="toZhuanceng">
				转赠
			</view>
		</view>
		
		<view class="space-bottom">
			
		</view>
		
	</view>
</template>

<script>
import { getUserName, getUserHead } from '../../utils/funs.js'
	
	export default {
		data() {
			return {
				item: {},
				username:'',
				head:''
				// ownerName: getUserName(),
				// ownerHead: getUserHead()
			}
		},
		onLoad(query) {
			this.username = uni.getStorageSync('username');
			this.head = uni.getStorageSync('head');
			console.log(query);
			if(query){
				const item = JSON.parse(query.info)
				this.item = item
			}
			console.log(this.item)
		},
		methods: {
			toJishou() {
				const queryString = JSON.stringify(this.item) 
				uni.navigateTo({
					url: `/pages/collect-sale/collect-sale?info=${queryString}`
				})
			},
			toZhuanceng() {
				const queryString = JSON.stringify(this.item) 
				uni.navigateTo({
					url: `/pages/collect-zhuanzeng/collect-zhuanzeng?info=${queryString}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.space-bottom {
		height: 240rpx;
	}
	
	.fixed-bottom {
		position: fixed;
		height: 180rpx;
		// background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(69, 69, 69, 0) 100%);
		// border-radius: 0px, 0px, 42px, 42px;
		background-color: rgba(0, 0, 0, 1);
		font-size: 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.left {
			color: rgba(255, 255, 255, 1);
			width: 200rpx;
			background: rgba(172, 51, 193, 1);
			border-radius: 30rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.right {
			color: rgba(239, 239, 239, 1);
			width: 200rpx;
			background: rgba(121, 72, 234, 1);
			border-radius: 30rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center
		}
	}
	
	.adrress-container {
		height: 150rpx;
		width: 95vw;
		margin: auto;
		background-color: $uni-bg-color-lightDark;
		margin-top: 50rpx;
		color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 28rpx;
		border-radius: 20rpx;
	}
	
	.owner-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		height: 160rpx;
		width: 95vw;
		margin: auto;
		margin-top: 50rpx;
		background-color: $uni-bg-color-lightDark;
		border-radius: 20rpx;
		.left-container {
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 106rpx;
				height: 106rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
			.owner-info {
				.owner-title {
					color: rgba(131, 71, 255, 1);
					font-size: 28rpx;
				}
				.owner-name {
					font-size: 36rpx;
					color: rgba(229, 229, 229, 1);
					letter-spacing: 0.14px;
					margin-top: 10rpx;
				}
			}
			
			
		}
		
		.date-container {
			color: rgba(229, 229, 229, 1);
			font-size: 28rpx;
			text-align: center;
		}
	}
	
	.price-wrapper {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		.price {
			font-size: 48rpx;
			background: linear-gradient(360deg, rgba(125, 226, 252, 1) 0%, rgba(185, 182, 229, 1) 100% );
			letter-spacing: 0.18px;
			font-weight: 500;
			color: transparent;
			-webkit-background-clip: text;
		}
		.infoText {
			color: rgba(190, 171, 235, 1);
			font-size: 22rpx;
			text-align: center;
		}
	}
	
	.new-tag-wrapper {
		height: 100rpx;
		background-color: $uni-bg-color-lightDark;
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		padding-left: 40rpx;
		position: relative;
		.tag {
			color: rgba(255, 255, 255, 1);
			background: linear-gradient(90deg, rgba(101, 55, 155, 1) 0%, rgba(136, 106, 234, 1) 53%, rgba(100, 87, 198, 1) 100%);
			border-radius: 40rpx;
			font-size: 26rpx;
			padding: 0 10rpx;
		}
		.num {
			margin-left: 40rpx;
			font-size: 28rpx;
			color: rgba(255, 255, 255, 1);
		}
	}
	
	.new-author-wrapper {
		padding-left: 40rpx;
		background-color: $uni-bg-color-lightDark;
		display: flex;
		align-items: center;
		image {
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
		}
		text {
			margin-left: 10px;
			font-size: 28rpx;
			color: rgba(166, 166, 166, 1);
		}
	}
	
	.intro-detail {
		width: 90vw;
		margin: auto;
		background-color: purple;
		height: 500px;
		border-radius: 20px;
		margin-top: 10px;
	}
	
	.author-wrapper {
		font-size: 36rpx;
		color: white;
		padding: 0 50rpx;
		.author-card {
			background-color: $uni-text-bg-purple;
			height: 148rpx;
			border-radius: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 20rpx;
			margin-top: 10px;
			margin-bottom: 20px;
			.card-left {
				flex: 1;
				text-align: center;
				image {
					width: 98rpx;
					height: 98rpx;
					border-radius: 50%;
				}
			}
			
			.card-center {
				flex: 2;
				color: $uni-text-229-grey;
				.center-top {
					font-size: 40rpx
				}
				.center-bottom {
					font-size: 28rpx;
					margin-top: 10rpx;
				}
			}
			.card-right {
				text-align: right;
				flex: 1;
				font-size: 28rpx;
				color: $uni-text-color-purple;
			}
		}
	}
	
	.space-image {
		image {
			width: 100vw;
		}
	}
	
	.title-wrapper {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $uni-bg-color-lightDark;
		.tag-wrapper {
			font-size: 28rpx;
			color: $uni-text-color-purple;
			background-color: $uni-text-bg-purple;
			border-radius: 2em;
			margin-right: 20px;
		}
		.title {
			font-size: 60rpx;
			color: $uni-text-239-grey;
		}
	}
	
	.num-price {
		display: flex;
		align-items: center;
		padding-bottom: 40rpx;
		
		.space-left {
			flex: 1;
		}
		.num {
			flex: 1;
			color: $uni-text-color-yellow;
			font-size: 36rpx;
			padding-left: 40rpx;
		}
		.price {
			flex: 1;
			font-size: 60rpx;
			color: $uni-text-239-grey;
		}
	}
</style>
