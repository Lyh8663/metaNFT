<template>
	<view class="flex flex-column justify-center w-100 align-center">
		<uni-status-bar></uni-status-bar>
		<view class="w-90 flex flex-column ">
			<!-- 轮播 -->
			<view class="mt-5" style="width: 100%;">
				<u-swiper :list="list3" indicator indicatorMode="line" circular radius="20rpx" height="300rpx"
					@click="swiperClicked(current)" @change="e => current = e.current"></u-swiper>
			</view>

			<text class="font-lg font-weight-bolder my-4">我的藏品</text>

			<view class="flex flex-row justify-between">
				<view @click.prevent="triggleCkeckType('1')"
					class="flex justify-center align-center rounded-circle py-2" style="width: 130rpx"
					:class="checkType == '1' ? 'bg-purple' : 'bg-main-dark'">
					英雄
				</view>

				<view @click.prevent="triggleCkeckType('2')"
					class="flex justify-center align-center rounded-circle py-2" style="width: 130rpx"
					:class="checkType == '2' ? 'bg-purple' : 'bg-main-dark'">
					徽章
				</view>

				<view @click.prevent="triggleCkeckType('3')"
					class="flex justify-center align-center rounded-circle py-2" style="width: 130rpx"
					:class="checkType == '3' ? 'bg-purple' : 'bg-main-dark'">
					装备
				</view>

				<view @click.prevent="triggleCkeckType('4')"
					class="flex justify-center align-center rounded-circle py-2" style="width: 130rpx"
					:class="checkType == '4' ? 'bg-purple' : 'bg-main-dark'">
					盲盒
				</view>
			</view>


		</view>

		<!-- <view class="flex py-3 align-center justify-between text-center">
					<text class="flex-1">已拥有</text>
					<text class="flex-1">待拆</text>
					<text class="flex-1">已转赠</text>
			</view> -->
		<view class="items-container">
			<view v-for="(item, index) in showList" :key="index" class="item-wrap bg-main-dark" @click="toDetail(item)">
				<view class="image-wrap">
					<!--<image :src="item.baseNft.url" mode="aspectFill"></image>-->
					<image class="item-image" :src="item.img" />
				</view>
				<view class="tag">{{item.tag}}</view>
				<!--<view class="tag"><text>{{item.baseNft.familyName}}</text></view>-->
				<!-- <view class="font-lg font-weight-bold">¥99.00</view> -->
				<view class="title overflow">
					<!--<text>{{item.baseNft.nickname}}</text>-->
					<text>{{item.name}}</text>
				</view>
				<view class="bianhao">{{item.uuTag ? '编号：' + item.uuTag : ''}}</view>
			</view>
		</view>


	</view>
	</view>
</template>

<script>
	import {
		getUserId
	} from '../../utils/funs.js'

	export default {
		data() {
			return {
				list3: [
					'../../static/swiper/pic1.png',
					'../../static/swiper/pic2.jpg',
					'../../static/swiper/pic3.jpg',
				],
				checkType: '1',
				hero: [],
				equip: [],
				box: [],
				badge: [],
				showList: [{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
					{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
					{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
					{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
					{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
					{
						img: "../../static/QQddddddddddddddddddd.png",
						tag: "类型",
						uuTag: "2020302111",
						name: "藏品名"
					},
				]
			}
		},
		onLoad() {
			// 首先向后端请求数据
			console.log('藏品页面被打开');
			this.getCollectInfo()
		},
		methods: {
			toItemDetail() {
				uni.navigateTo({
					url: "../collectDetail/collectDetail"
				})
			},
			//轮播图被点击了
			swiperClicked(current) {
				console.log(current)
				if (current == 0) {
					window.location.href = 'https://mp.weixin.qq.com/s/FbL1KePrO3T_PyMZTeLuEQ'
				}
				if (current == 1) {
					window.location.href = 'https://mp.weixin.qq.com/s/_RAFGvlXzeUSHniJd1vfeQ'
				}
				if (current == 2) {
					window.location.href = 'https://mp.weixin.qq.com/s/dON-lzs-umWGh-Uag78A1g'
				}

			},
			triggleCkeckType(e) {
				this.checkType = e
				switch (e) {
					case '1':
						this.showList = this.hero
						break;
					case '2':
						this.showList = this.badge
						break;
					case '3':
						this.showList = this.equip
						break;
					case '4':
						this.showList = this.box
						break;
					default:
						break;

				}
			},

			// 跳转详情
			toDetail(item) {
				const queryString = JSON.stringify(item)
				uni.navigateTo({
					// 这个地方需要传递几个参数
					url: `/pages/collectDetail/collectDetail?info=${queryString}`,

				})
			},

			async getCollectInfo() {
				// 获取英雄
				const hero = await this.$request(this.$api.postOwnHero, {}, 'POST')
				this.hero = hero

				// 获取装备
				const equip = await this.$request(this.$api.postOwnEqip, {}, 'POST')
				this.equip = equip

				// 获取徽章
				const badge = await this.$request(this.$api.postBadge, {}, 'POST', 'query')
				// console.log(badge)
				this.badge = badge

				// 获取盲盒
				const box = await this.$request(this.$api.postBox, {
					userId: getUserId()
				}, 'POST', 'query')
				// console.log(box)
				this.box = box
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bianhao {
		color: rgba(121, 72, 234, 1);
		letter-spacing: 0.34px;
		font-size: 24rpx;
		font-weight: 700;
		margin-top: 15rpx;
		text-align: center;
	}

	.title {
		max-width: 100%;
		font-size: 36rpx;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 0.34px;
		font-weight: 700;
		margin-top: 10rpx;
		margin-left: 35rpx;

	}

	.items-container {
		position: relative;
		top: 40rpx;
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 700rpx;
		margin: auto;

		// padding: 0 20rpx;
		.item-wrap {
			padding: 20rpx;
			padding-top: 30rpx;
			width: 300rpx;
			border-radius: 42px;
			//height: 570rpx;
			height: 530rpx;
			margin-bottom: 20rpx;

			// margin-left: 20rpx;
			.image-wrap {
				height: 350rpx;
				overflow: hidden;
				border-radius: 60rpx;
				width: 270rpx;
				margin-left: 15rpx;

				image {
					width: 100%;
					// overflow: hidden;
					// border-radius: 60rpx;
				}
			}

			.tag {
				font-size: 28rpx;
				border-radius: 30rpx;
				text-align: center;
				width: 80rpx;
				font-weight: 700;
				background-color: rgba(121, 72, 234, 1);
				color: rgba(239, 239, 239, 1);
				padding: 10rpx 15rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;
			}

			// .tag {
			// 	font-size: 28rpx;
			// 	width: 80rpx;
			// 	border-radius: 20rpx;
			// 	background-color: rgba(121, 72, 234, 1);
			// 	color: rgba(239, 239, 239, 1);
			// 	letter-spacing: 0.18px;
			// 	font-weight: 700;
			// 	display: flex;
			// 	margin-top: 20rpx;
			// 	text {
			// 		//background: rgba(121, 72, 234, 1);
			// 		height: 50rpx;
			// 		display: block;
			// 		border-radius: 2em;
			// 		display: flex;
			// 		justify-content: center;
			// 		align-items: center;
			// 		padding: 10rpx 20rpx;
			// 		margin-top: 10rpx;
			// 	}
			// }
		}
	}
</style>
