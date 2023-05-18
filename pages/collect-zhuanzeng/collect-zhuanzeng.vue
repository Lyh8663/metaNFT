<template>
	<view>
		<nav-bar>
			<template slot="left">
				<view>
					<image @click="handleBack" src="../../static/back.png" style="width: 60rpx;height: 60rpx;"
						mode="widthFix"></image>
				</view>
			</template>

			<template slot="middle">
				<view style="color: rgba(255, 255, 255, 1);font-size: 48rpx; font-weight: 700;">转赠</view>
			</template>
		</nav-bar>
		<collectCard :image="item.baseNft.url" :tag="item.baseNft.familyName" :nickname="item.baseNft.nickname"
			:bianhao="item.uuTag" :author="item.baseNft.author"></collectCard>

		<view class="bottom-fixed">
			<input @click="showPopup = true" type="text" placeholder="请输入转赠人编号或选择联系人" v-model="tranToId">
			<view class="right-text" @click="zhuanzeng">
				确认转赠
			</view>
		</view>

		<!-- 这是底部的弹出层 -->
		<u-popup :show="showPopup" mode="bottom" bgColor="rgba(33, 32, 32, 1)" @close="handleClose" closeOnClickOverlay>
			<view class="pop-container">
				<view class="top-line" @click="showPopup = false">
					<view class="real-line">

					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 40vh">
					<view class="card" v-for="(item, index) in 10" :key="index">
						<image src="../../static/logo.png" mode="widthFix"></image>
						<text>joy</text>
					</view>
					<view class="space-bottom" style="height: 30rpx;">

					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import collectCard from '../../components/collect-card/collect-card.vue'

	export default {
		components: {
			collectCard
		},
		data() {
			return {
				showPopup: false,
				item: {},
				tranToId: ''
			}
		},
		methods: {
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleClose() {},
			zhuanzeng() {
				console.log(this.tranToId);
				let dto = {}
				dto.guestUserId = this.tranToId;
				dto.hostUserId = this.item.userId;
				dto.metaNftId = this.item.baseNft.id;
				dto.price = 0
				switch (this.item.baseNft.type) {
					case '英雄':
						dto.type = 1
						break;
					case '装备':
						dto.type = 2
						break;
					case '徽章':
						dto.type = 3
						break;
					case '盲盒':
						dto.type = 4
						break;
					default:
						dto.type = 1
						break;
				}
				dto.uuTag = this.item.uuTag
				console.log(dto);
				this.$request('/core/exchangeRecords/reGifted', dto, 'post', 'json').then(res => {
					console.log(res);
				})
			}
		},
		onLoad(query) {
			// console.log(this.$request)
			const item = JSON.parse((query.info))
			this.item = item

		}
	}
</script>

<style lang="scss" scoped>
	.pop-container {
		max-height: 40vh;

		.top-line {
			height: 30rpx;
			margin-top: -10rpx;

			.real-line {
				width: 140rpx;
				// background: rgba(204, 204, 204, 1);
				// border: 6px solid rgba(190, 171, 235, 1);
				height: 6px;
				background-color: rgba(190, 171, 235, 1);
				margin: auto;
				border-radius: 2em;
				margin-top: 30rpx;
			}
		}

		.card {
			height: 10vh;
			display: flex;
			align-items: center;
			margin-left: 30rpx;

			image {
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
			}

			text {
				font-size: 36rpx;
				color: #fff;
				margin-left: 40rpx;
			}
		}
	}

	.bottom-fixed {
		position: fixed;
		height: 160rpx;
		background-color: rgba(56, 56, 56, 1);
		display: flex;
		bottom: 0;
		right: 0;
		width: 100vw;
		justify-content: space-around;
		align-items: center;
		z-index: 99999;

		input {
			height: 80rpx;
			width: 450rpx;
			border: 1.2px solid rgba(229, 229, 229, 1);
			border-radius: 20rpx;
			padding-left: 20rpx;
		}

		.right-text {
			width: 200rpx;
			height: 80rpx;
			background: linear-gradient(180deg, rgba(95, 114, 189, 1) 0%, rgba(155, 35, 234, 1) 100%);
			border-radius: 15px;
			mix-blend-mode: normal;
			color: rgba(239, 239, 239, 1);
			font-size: 35rpx;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
