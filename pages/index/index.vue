<template>
	<view class="content" style="">
		<nav-bar>
			<template slot="left">
				<view class="flex justify-center align-center" v-if="headurl">
					<image :src="headurl || 'https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG' " mode="aspectFill" class="rounded-circle" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</template>

			<template slot="middle">
				<view class="px-3 py-2">
					<view class="position-relative" @click="toSearchPage()">
						<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;right: 0;"
							class="flex align-center justify-center text-light-muted">
							<text class="iconfont uicon-search font-lg"></text>
						</view>
						<input style="height: 70rpx;padding-left: 100rpx;" type="text" class="font-md rounded-circle bg-dark"
							placeholder="搜索推荐词" @input="search" />
					</view>
				</view>
			</template>

			<template slot="right">
				<view style="transform: translateX(-50%);">
					<image src='../../static/tongzhi.png' alt="" style="width: 60rpx;height: 60rpx;">
				</view>
			</template>

		</nav-bar>

		<!-- 轮播 -->
		<view class="mt-3" style="width: 90%;">
			<u-swiper :list="list3" indicator indicatorMode="line" circular radius="20rpx" height="300rpx" 
			@click="swiperClicked(current)"
			@change="e => current = e.current"></u-swiper>
		</view>
		<!-- {{swiperItemID}} -->
		<!-- 排行7.25使用的是组件,内置浏览器显示有问题,但是安卓基座是正常的,打包app将是正常的 -->
		<view class="" style="width: 90%;" @click="gotoInvateRankPage()">
			<rank ranktype="邀请排行" :people="inviteListOnlyThree"></rank>
		</view>
		
		<view class="flex justify-between align-center pt-3 mt-2 mb-1" style="width: 90%;">
			<view class="flex-1">
				<text class="font-lg font-weight-bold">官方热销</text>
			</view>
			<view class="border-main flex-1 flex justify-end" style="transform: translateX(-15%);" @click="toOfficialMarketPage()">
				<text class="text-purple">全部</text>
			</view>
		</view>

		<!-- tab栏 -->
		<u-tabs :list="list1" @change="click" lineWidth="50" lineColor="#7948ea" :activeStyle="{
			color: '#7948ea',
			fontWeight: 'bold',
			fontSize: '35rpx',
			transform: 'scale(1.05)'
		}" :inactiveStyle="{
	color: '#a6a6a6',
	fontSize: '35rpx',
	transform: 'scale(1)'
}" lineHeight="4" itemStyle="padding-left: 40rpx; padding-right: 40rpx; height: 90rpx" :current="currentProduct">
		
		</u-tabs>
	<!-- 悬浮按钮 -->
	<view>
		
	</view>
	
		<!-- tab栏下 -->
		<view class="w-100 mt-4">
			<scroll-view :class="['scroll-view_H',this.currentProduct==0?'':'notDisplay']" scroll-x="true" v-if="this.huizhangList!=''">
				<view v-for="(item,index) in huizhangList" :key="index" id="demo1"
					class="bg-main-dark flex-column flex scroll-view-item_H mr-5 py-3 px-5 "
					@click="gotoHuiZhangDetailPage(item.nftType,item.marketId)">
					<view class="mt-2 rounded-circle picArea" style="height: 80%;">
						<image class="pic" :src="item.baseNft.url" mode=""></image>
					</view>
					<view class="text-center mt-2 rounded-circle">
						<text>{{item.baseNft.nickname}}</text>
					</view>
				</view>
			</scroll-view>
			<view :class="['rexiaoMissing',this.currentProduct==0?'':'notDisplay']" v-else>
				暂无内容，敬请期待
			</view>
			<scroll-view :class="['scroll-view_H',this.currentProduct==1?'':'notDisplay']" scroll-x="true" v-if="this.yingxiongList!=''">
				<view v-for="(item,index) in yingxiongList" :key="index" id="demo1"
					class="bg-main-dark flex-column flex scroll-view-item_H mr-5 py-3 px-5 "
					@click="gotoHuiZhangDetailPage(item.nftType,item.marketId)">
					<view class="mt-2 rounded-circle picArea" style="height: 80%;">
						<image class="pic" :src="item.baseNft.url" mode=""></image>
					</view>
					<view class="text-center mt-2 rounded-circle">
						<text>{{item.baseNft.nickname}}</text>
					</view>
				</view>
			</scroll-view>
			<view :class="['rexiaoMissing',this.currentProduct==1?'':'notDisplay']" v-else>
				暂无内容，敬请期待
			</view>
			<scroll-view :class="['scroll-view_H',this.currentProduct==2?'':'notDisplay']" scroll-x="true" v-if="this.zhuangbeiList!=''">
				<view v-for="(item,index) in zhuangbeiList" :key="index" id="demo1"
					class="bg-main-dark flex-column flex scroll-view-item_H mr-5 py-3 px-5 "
					@click="gotoHuiZhangDetailPage(item.nftType,item.marketId)">
					<view class="mt-2 rounded-circle picArea" style="height: 80%;">
						<image class="pic" :src="item.baseNft.url" mode=""></image>
					</view>
					<view class="text-center mt-2 rounded-circle">
						<text>{{item.baseNft.nickname}}</text>
					</view>
				</view>
			</scroll-view>
			<view :class="['rexiaoMissing',this.currentProduct==2?'':'notDisplay']" v-else>
				暂无内容，敬请期待
			</view>
			<scroll-view :class="['scroll-view_H',this.currentProduct==3?'':'notDisplay']" scroll-x="true" v-if="this.daojuList!=''">
				<view v-for="(item,index) in daojuList" :key="index" id="demo1"
					class="bg-main-dark flex-column flex scroll-view-item_H mr-5 py-3 px-5 "
					@click="gotoHuiZhangDetailPage(item.nftType,item.marketId)">
					<view class="mt-2 rounded-circle picArea" style="height: 80%;">
						<image class="pic" :src="item.baseNft.url" mode=""></image>
					</view>
					<view class="text-center mt-2 rounded-circle">
						<text>{{item.baseNft.nickname}}</text>
					</view>
				</view>
			</scroll-view>
			<view :class="['rexiaoMissing',this.currentProduct==3?'':'notDisplay']" v-else>
				暂无内容，敬请期待
			</view>
		</view>
		
		<uni-fab  ref="fab" :pattern="pattern" :content="content"
			 @trigger="trigger" horizontal="right" />
	</view>
</template>

<script>
export default {
	// import 
	data() {
		return {
			//指示徽章卡栏目 7.28设置两个徽章
			huizhangList:'',
			//指示英雄栏目
			yingxiongList:'',
			//指示装备栏目
			zhuangbeiList:'',
			//指示道具栏目
			daojuList:'',
			list3: [
				'../../static/swiper/pic1.png',
				'../../static/swiper/pic2.jpg',
				'../../static/swiper/pic3.jpg',
			],
			list1: [{
				name: '徽章',
			}, {
				name: '英雄',
			}, {
				name: '装备'
			}, {
				name: '道具'
			}],
			//指示官方热销下的栏目序号，默认为0，即徽章
			currentProduct: 0,
			current: 0,
			//排行仅显示前三名,所以这个数组最多只有三个
			inviteListOnlyThree:[],
			headurl:null,
			//悬浮按钮的参数
			pattern: {
				color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#7A7E83',
					buttonColor: '#BA55D3',
					iconColor: '#fff'
				},
			//以后还能扩容
			content: [{
				iconPath: "http://139.155.70.187:8081/AppImg/dongtai.png",
				selectedIconPath:"http://139.155.70.187:8081/AppImg/dongtai.png",
				text: '邀请',
				active: false
				},	
			],
			
		}
	},
	onShow() {
		// this.requestExm()
		//@林宇豪lyh
		console.log("首页加载")
		var that = this;
		//获取用户token
		let token = uni.getStorageSync('tokenValue');
		this.headurl = uni.getStorageSync('head');
		//页面加载的时候就将排行榜的信息加载出来
		uni.request({
			url:"https://www.meta-artwork.com:10584/core/invite/rank",
			method:"GET",
			header:{
				'sa-token' : token,
			},
			success: (res) => {
				console.log("请求发起")
				that.inviteListOnlyThree.splice(0)
				//如果返回的数组中,元素数量大于等于3
				if(res.data.data.length>=3){
					for(var i = 0;i<3;i++){
						
						//在把data内容放进去之前，需要在后面加上收藏家的脱敏accountId
						if(res.data.data[i].name=="魅塔收藏家"){//如果用的是默认名字（用户没有自己改名），就用这个方式区别
							var beforeString = res.data.data[i].accountId.slice(0,1)
							var afterString = res.data.data[i].accountId.slice(res.data.data[i].accountId.length-3,res.data.data[i].accountId.length)
							var finalString = beforeString + "***" +  afterString;
							res.data.data[i].name += finalString;
						}
						
						that.inviteListOnlyThree.push(res.data.data[i]);
						console.log('这个人的头像:'+res.data.data[i].head)
					}
				}else{//如果返回的数组中,元素数量小于3
					// that.inviteListOnlyThree = res.data.data;
					for(var i = 0;i<res.data.data.length;i++){
						
						//在把data内容放进去之前，需要在后面加上收藏家的脱敏accountId
						if(res.data.data[i].name=="魅塔收藏家"){//如果用的是默认名字（用户没有自己改名），就用这个方式区别
							var beforeString = res.data.data[i].accountId.slice(0,1)
							var afterString = res.data.data[i].accountId.slice(res.data.data[i].accountId.length-3,res.data.data[i].accountId.length)
							var finalString = beforeString + "***" +  afterString;
							res.data.data[i].name += finalString;
						}
						
						that.inviteListOnlyThree.push(res.data.data[i]);
						// console.log('这个人的头像:'+res.data.data[i].head)
					}
				}
			}
		})
		/*
			请求到的数组元素格式:
			{
			            "head": null,
			            "timeStamp": 1658437208000,
			            "accountId": "71d05ef90f",
			            "phone": "15231956382",
			            "inviteCount": 8,
			            "chainWallet": "0x62de0ba25528df07db5193e462de0ba25528df07db5193e5",
			            "name": null,
			            "userId": "1549429050434490369"
			}
		*/
		
		//加载官方热销的内容
		
		//徽章
		uni.request({
			url:"https://www.meta-artwork.com:10584/core/shop/retrieve/badge",
			header:{
				'sa-token':uni.getStorageSync('tokenValue')
			},
			success(res){
				console.log("正在获取官方热销内容-徽章")
				console.log(res.statusCode)
				console.log("返回数组长度：" + res.data.data.length)
				if(res.data.data.length<=4){//首页展示4个即可
					that.huizhangList = res.data.data;
				}else{
					var temp = [];
					for(var i = 0;i<4;i++){
						temp.push(res.data.data[i])
					}
					that.huizhangList = temp;
				}
				/*
					返回数组中，对象的结构
					{
					            "familyId": "1550849310354149377",
					            "nftType": 3,
					            "nowCount": 5,
					            "limitPurchase": 10,
					            "isForSell": 0,
					            "createTime": 1658740080000,
					            "price": 99.9,
					            "baseNft": {
					                "professionType": null,
					                "introduce": "老八秘制小汉堡",
					                "author": {
					                    "head": null,
					                    "introduce": null,
					                    "name": null,
					                    "authorId": null
					                },
					                "contractAddress": "asdw****************************dasd",
					                "contractAgreement": "ESC-711",
					                "type": null,
					                "url": "https://meta-1312685046.cos.ap-nanjing.myqcloud.com/ikun.jpg",
					                "familyId": "1550849310354149377",
					                "rankId": null,
					                "familyName": "怨种",
					                "nickname": "小黑子给ikun爬",
					                "id": "1550851212034805761",
					                "stock": "1550851211992862722"
					            },
					            "sellTime": 1974359000,
					            "marketId": "1551494462026387458"
					        }
				*/
			}
		})
		
		//英雄
		uni.request({
			url:"https://www.meta-artwork.com:10584/core/shop/retrieve/hero",
			header:{
				'sa-token':uni.getStorageSync('tokenValue')
			},
			success(res){
				console.log("正在获取官方热销内容-英雄")
				console.log(res.statusCode)
				console.log("返回数组长度：" + res.data.data.length)
				if(res.data.data.length<=4){//首页展示4个即可
					that.yingxiongList = res.data.data;
				}else{
					var temp = [];
					for(var i = 0;i<4;i++){
						temp.push(res.data.data[i])
					}
					that.yingxiongList = temp;
				}
			}
		})
		
		//装备
		uni.request({
			url:"https://www.meta-artwork.com:10584/core/shop/retrieve/equip",
			header:{
				'sa-token':uni.getStorageSync('tokenValue')
			},
			success(res){
				console.log("正在获取官方热销内容-装备")
				console.log(res.statusCode)
				console.log("返回数组长度：" + res.data.data.length)
				if(res.data.data.length<=4){//首页展示4个即可
					that.zhuangbeiList = res.data.data;
				}else{
					var temp = [];
					for(var i = 0;i<4;i++){
						temp.push(res.data.data[i])
					}
					that.zhuangbeiList = temp;
				}
			}
		})
	},
	methods: {
		toOfficialMarketPage(){
			//跳转到官方商城
			uni.navigateTo({
				url:"../officialMarketPage/officialMarketPage"
			})
		},
		//点击搜索栏跳转到搜索页面
		toSearchPage(){
			uni.navigateTo({
				url:"/pages/searchPage/searchPage"
			})
		},
		//轮播图被点击了
		swiperClicked(current){
			console.log(current)
			if(current==0){
				window.location.href = 'https://mp.weixin.qq.com/s/FbL1KePrO3T_PyMZTeLuEQ'
			}
			if(current==1){
				window.location.href = 'https://mp.weixin.qq.com/s/_RAFGvlXzeUSHniJd1vfeQ'
			}
			if(current==2){
				window.location.href = 'https://mp.weixin.qq.com/s/dON-lzs-umWGh-Uag78A1g'
			}
			
		},
		//去邀请排行页
		gotoInvateRankPage(){
			uni.navigateTo({
				url:"../InviteRankDetail/InviteRankDetail"
			})
		},
		//去主页-商品详情
		gotoHuiZhangDetailPage(type,marketId){
			//type表示商品类型
			//marketId表示商品的编码
			uni.navigateTo({
				url:"/pages/index/index-huizhangDetail/index-huizhangDetail?type=" + type + "&marketId=" + marketId,
			})
			console.log("类型为:" + type)
			console.log("商品编号为:" + marketId)
		},
		//悬浮按钮需要的方法
		trigger(e) {//展开菜单点击事件，返回点击信息
			// uni.showModal({
			// 	title: '提示',
			// 	content:`激活状态：${e.item.active};选中项：${e.item.text}`,
			// 	success(res) {
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}	
			// });
			if(e.item.text=='邀请'){
				//跳转到邀请页
				uni.navigateTo({
					url:"../inviteUserPage/inviteUserPage"
				})
			}
		},		
		fabClick() {//悬浮按钮点击事件
			uni.showToast({
				title: '点击了悬浮按钮',
				icon: 'none'
			});
		},	
		click(item) {
			console.log(this.currentProduct);
			console.log(item.index);//具体的内容
			//由于人物卡，武器，道具暂时不能显示，故提示
			// if(item.index==0){
			// 	this.currentProduct = item.index;
			// 	return;
			// }else{
			// 	uni.showModal({
			// 		title:"注意",
			// 		content:"此版本暂未开放此功能",
			// 		showCancel:false,
			// 	})
			// }
			
			//现在可以显示了
			this.currentProduct = item.index;
			
		},
		search(){
			
		}
		/*
		 *requestExm() {
		 * http请求调用示例
		 * this.$request(this.$api.login, {
		 *	a: 1
		 * }, 'POST')
		 * }
		*/
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

.scroll-view-item {
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}

.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}



.scroll-view-item_H {
	border-radius: 80rpx;
	display: inline-block;
	width: 40%;
	height: 450rpx;
	font-size: 36rpx;
}
.picArea{
	overflow: hidden;
}
.pic{
	height: 100%;
	width: 100%;
}
.rexiaoMissing{
	width: 100%;
	height: 6vh;
	/* background-color: rgb(255,255,255) */
	display:flex;
	align-items:center;
	justify-content:center;
}
/* 下面的无需改动,请在上面续写 */
	.notDisplay{
		display:none;
	}
</style>
