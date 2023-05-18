<template>
	<view>
		<!-- <uni-status-bar></uni-status-bar> -->
		<!-- 为状态栏预留位置 -->
		<view class="status_bar" style="height:40px;width: 100%;">
		</view>
		<!-- 顶部栏 -->
		<view class="headArea">
			<view class="backArea">
				<image @click="goback()" class="backIMG" src="../../static/back.png" alt="">
			</view>
			<view class="titleArea">
				<view class="titleText">
					官方商城
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<!--轮播图-->
		<view>
			<swiper class="swiper"  circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="white" indicator-active-color="rgba(121, 72, 234, 1)">
				<swiper-item v-for="(sw,index) in swiperList" :key="index">
					<view class="flex swiper-area">
						<image :src="sw.img" class="swiper-img"></image>
						<view class="right-area">
							<view class="item-title overflow">
								<text>{{sw.name}}</text>
							</view>
							<view class="item-tag">{{sw.tag}}</view>
							<view class="item-price">¥{{sw.price}}</view>
							<view class="right-bottom">
								<view class="intro">{{sw.tempContent}}</view>
								<template v-if="sw.tempContent != null&& sw.tempContent.length > 28" >
									<text v-if="sw.isShowAll" @click="toggleDescription()" class="intro-button">更多</text>
									<text v-else @click="toggleDescription()" class="intro-button">收起</text>
								</template>
								<view class="item-time">{{sw.time}}</view>
							</view>
							
						</view>						
					</view>					
				</swiper-item>
			</swiper>
		</view>
		<!--价格系列发布时间-组合框-->
		<view class="select-area">
			
			<view class="price-body">
				<uni-combox :border="false" :candidates="price" placeholder="价格" labelWidth="400px"></uni-combox>
			</view>
			<view class="series-body">
				<uni-combox :border="false" :candidates="series" placeholder="系列"></uni-combox>
			</view>
			<view class="postTime-body">
				<uni-combox :border="false" :candidates="postTime" placeholder="发布时间"></uni-combox>
			</view>
			
		</view>
		 <!--全部徽章英雄装备-->
		<view class="flex flex-row justify-between four-tag">
			
			<view @click.prevent="triggleCkeckType('1')" class="flex justify-center align-center rounded-circle py-1 px"
				style="width: 130rpx" :class="checkType == '1' ? 'bg-purple' : 'bg-main-dark'">
				全部
			</view>
			<view @click.prevent="triggleCkeckType('2')" class="flex justify-center align-center rounded-circle py-1 px"
				style="width: 130rpx" :class="checkType == '2' ? 'bg-purple' : 'bg-main-dark'">
				徽章
			</view>
			<view @click.prevent="triggleCkeckType('3')" class="flex justify-center align-center rounded-circle py-1 px"
				style="width: 130rpx" :class="checkType == '3' ? 'bg-purple' : 'bg-main-dark'">
				英雄
			</view>
			<view @click.prevent="triggleCkeckType('4')" class="flex justify-center align-center rounded-circle py-1 px"
				style="width: 130rpx" :class="checkType == '4' ? 'bg-purple' : 'bg-main-dark'">
				装备
			</view>
			
		</view>
		<!--产品区域-->
		<view  class="items-container">
			<!-- 这里显示产品内容 -->
			<view v-for="(item, index) in showList" :key="index" class="item-wrap bg-main-dark" @click="toDetail(item.nftType,item.marketId)">
				<view class="image-wrap">
					<!--<image :src="item.baseNft.url" mode="aspectFill"></image>-->
					<image class="item-image" :src="item.baseNft.url"/>
				</view>	
				<view class="tag">{{item.baseNft.familyName}}</view>
				<!--<view class="tag"><text>{{item.baseNft.familyName}}</text></view>-->
				<view class="price">¥{{item.price}}</view>	
				<view class="title overflow">
					<!--<text>{{item.baseNft.nickname}}</text>-->
					<text>{{item.baseNft.nickname}}</text>
				</view>
				<view class="bianhao">{{item.marketId ? '编号：' + item.marketId : ''}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	// var that = this;
	import { getUserId } from '../../utils/funs.js'
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				checkType: '1',			
				all:[],
				badge:[],
				hero:[],
				equip:[],
				swiperList:[
					{img:"../../static/QQddddddddddddddddddd.png",name:"藏品名",tag:"类型二",price:"34.32",
					tempContent:"",isShowAll:"false",time:"8月12日12:00开售",
					intro:"这是一款即将上线的产品这是一款即将上线的产品这是一款即将上线的产品的产品"},
					{img:"../../static/QQddddddddddddddddddd.png",name:"藏品名",tag:"类型二",price:"34.32",
					tempContent:"",isShowAll:"false",time:"8月12日12:00开售",
					intro:"这是一款即将上线的产品这是一款即将上线的产品这是一款即将上线的产品的产品"},
					{img:"../../static/QQddddddddddddddddddd.png",name:"藏品名",tag:"类型二",price:"34.32",
					tempContent:"",isShowAll:"false",time:"8月12日12:00开售",
					intro:"这是一款即将上线的产品这是一款即将上线的产品这是一款即将上线的产品的产品"},
				],
				showList: [
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
					{img:"../../static/QQddddddddddddddddddd.png",tag:"类型",uuTag:"2020302111",name:"藏品名",price:"99.99"},
				],
				price:['0-50','50-100','100-150','150-200','200以上','2000-2000'],
				series: ['系列一', '系列二', '系列三','测试字数七个字'],
				postTime:['2019','2020','2021','2022'],
				//徽章列表
				huizhangList:[],
				//英雄列表
				yingxiongList:[],
				//装备列表
				zhuangbeiList:[],
				//全部列表
				quanbuList:[],
			}
		},
		onLoad() {
			var _this=this
			for(var i=0;i<this.swiperList.length;i++){
				var txtCntIndex = _this.swiperList[i].intro.length
				if (txtCntIndex > 30){
					_this.swiperList[i].isShowAll=true
					_this.swiperList[i].tempContent=_this.swiperList[i].intro.substr(0,29)+"..."
				}else{
					_this.isShowAllContent=false
					_this.swiperList[i].tempContent=_this.swiperList[i].intro
				}
			}
			//调用初始化页面的函数
			this.initPage();
		},
		methods: {
			//返回上页
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击商城中物品卡片跳转到详情
			toDetail(type,marketId){
				uni.navigateTo({
					url:"/pages/index/index-huizhangDetail/index-huizhangDetail?type=" + type + "&marketId=" + marketId,
				})
			},
			//控制是否显示全部内容
			toggleDescription(){
				var _this = this;
				//控制swiper
				for(var i=0;i<this.swiperList.length;i++){
					if (_this.swiperList[i].isShowAll) {
						_this.swiperList[i].isShowAll = false;
					    _this.swiperList[i].tempContent = _this.swiperList[i].intro
					} else {
					    _this.swiperList[i].isShowAll = true;
					    _this.swiperList[i].tempContent = _this.swiperList[i].intro.substring(0, 29) + "..."
					}
				}
			},
			//选择类型如果为X时，显示X对应的列表内容
			triggleCkeckType(e) {
				this.checkType = e
				switch (e) {
					case '1' :
						this.showList = this.quanbuList
						break;
					case '2' :
						this.showList = this.huizhangList
						break;
					case '3' :
						this.showList = this.yingxiongList
						break;
					case '4' :
						this.showList = this.zhuangbeiList
						break;
					default:
						break;
					
				}
			},
			//全部数组乱序算法
			shuffle(arr){
				console.log('正在执行shuffle算法');
			    var l = arr.length
			    var index, temp
			    while(l>0){
			        index = Math.floor(Math.random()*l)
			        temp = arr[l-1]
			        arr[l-1] = arr[index]
			        arr[index] = temp
			        l--
			    }
				this.quanbuList = arr;
			},
			//获得徽章的方法
			getHuizhang: () => {
			    return new Promise((resolve, reject) => {
					var that = this;
			        uni.request({
			            url:"https://www.meta-artwork.com:10584/core/shop/retrieve/badge",
			            header:{
			            	'sa-token':uni.getStorageSync('tokenValue')
			            },
						success: (res) => {
			                resolve('suc');
							console.log("正在获取官方热销内容-徽章")
							console.log(res.statusCode)
							console.log("返回徽章数组长度：" + res.data.data.length)
							// that.huizhangList = res.data.data;
							uni.setStorageSync('huizhangList',res.data.data);
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
			            },
			            fail: (err) => {
			                reject('err')
			            }
			        });
			    })
			},
			//获得英雄的方法
			getYingxiong: () => {
			    return new Promise((resolve, reject) => {
					var that = this;
			        uni.request({
			            url:"https://www.meta-artwork.com:10584/core/shop/retrieve/hero",
			            header:{
			            	'sa-token':uni.getStorageSync('tokenValue')
			            },
						success: (res) => {
			                resolve('suc');
							console.log("正在获取官方热销内容-英雄")
							console.log(res.statusCode)
							console.log("返回英雄数组长度：" + res.data.data.length)
							// that.yingxiongList = res.data.data;
							uni.setStorageSync('yingxiongList',res.data.data)
			            },
			            fail: (err) => {
			                reject('err')
			            }
			        });
			    })
			},
			//获得装备的方法
			getZhuangbei: () => {
			    return new Promise((resolve, reject) => {
					var that = this;
			        uni.request({
			            url:"https://www.meta-artwork.com:10584/core/shop/retrieve/equip",
			            header:{
			            	'sa-token':uni.getStorageSync('tokenValue')
			            },
						success: (res) => {
			                resolve('suc');
							console.log("正在获取官方热销内容-装备")
							console.log(res.statusCode)
							console.log("返回装备数组长度：" + res.data.data.length)
							// that.zhuangbeiList = res.data.data;
							uni.setStorageSync('zhuangbeiList',res.data.data);
			            },
			            fail: (err) => {
			                reject('err')
			            }
			        });
			    })
			},
			//将所有网络请求获取到之后执行
			initPage: async function () {
			    await this.getHuizhang();
				await this.getYingxiong();
				await this.getZhuangbei();
				
				var huizhangListtemp = uni.getStorageSync('huizhangList');
				var yingxiongListtemp = uni.getStorageSync('yingxiongList');
				var zhuangbeiListtemp = uni.getStorageSync('zhuangbeiList');
				
				this.huizhangList = huizhangListtemp;
				this.yingxiongList = yingxiongListtemp;
				this.zhuangbeiList = zhuangbeiListtemp;
				
				//拼接成quanbuList
				for(var i = 0;i<huizhangListtemp.length;i++){
					this.quanbuList.push(huizhangListtemp[i]);
				}
				for(var i = 0;i<yingxiongListtemp.length;i++){
					this.quanbuList.push(yingxiongListtemp[i]);
				}
				for(var i = 0;i<zhuangbeiListtemp.length;i++){
					this.quanbuList.push(zhuangbeiListtemp[i]);
				}
				
				//检查各列表长度
				console.log("徽章列表长度为：" + uni.getStorageSync('huizhangList').length);
				console.log("英雄列表长度为：" + uni.getStorageSync('yingxiongList').length);
				console.log("装备列表长度为：" + uni.getStorageSync('zhuangbeiList').length);
				console.log("全部列表长度为：" + this.quanbuList.length)
				
				//让现在正在显示的内容为全部List中内容
				this.showList = this.quanbuList;
				
				//将徽章，英雄，装备三者的第一个内容，挂到swiper上
				if(this.huizhangList==''){return;}//判断该列表是否有内容
				this.swiperList[0].img = this.huizhangList[0].baseNft.url;
				this.swiperList[0].name = this.huizhangList[0].baseNft.nickname;
				this.swiperList[0].tag = this.huizhangList[0].baseNft.familyName;
				this.swiperList[0].price = this.huizhangList[0].price;
				this.swiperList[0].intro = this.huizhangList[0].baseNft.introduce;
				console.log("已将swiper1内容填充好");
				
				if(this.yingxiongList==''){return;}//判断该列表是否有内容
				this.swiperList[1].img = this.yingxiongList[0].baseNft.url;
				this.swiperList[1].name = this.yingxiongList[0].baseNft.nickname;
				this.swiperList[1].tag = this.yingxiongList[0].baseNft.familyName;
				this.swiperList[1].price = this.yingxiongList[0].price;
				this.swiperList[1].intro = this.yingxiongList[0].baseNft.introduce;
				console.log("已将swiper2内容填充好");
				
				if(this.zhuangbeiList==''){return;}//判断该列表是否有内容
				this.swiperList[2].img = this.zhuangbeiList[0].baseNft.url;
				this.swiperList[2].name = this.zhuangbeiList[0].baseNft.nickname;
				this.swiperList[2].tag = this.zhuangbeiList[0].baseNft.familyName;
				this.swiperList[2].price = this.zhuangbeiList[0].price;
				this.swiperList[2].intro = this.zhuangbeiList[0].baseNft.introduce;
				console.log("已将swiper3内容填充好");
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.headArea{
		margin-left:18rpx;
		/* background-color: navajowhite; */
		height: 6vh;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 35rpx;
		font-weight: bold;
		/* margin-bottom: 30rpx; */
	}
	.backArea{
		flex:1
	}
	.backIMG{
		width: 3.5vh;
		height: 3.5vh;
	}
	.titleArea{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: -30rpx;
	}
	.inviteArea{
		flex: 1;
		display: flex;
		align-items: center;
		/* justify-content: flex-end; */
		justify-content: center;
		color: #BA55D3;
	}
	.swiper-img{
		width: 40vw;
		height: 40vw;
		border-radius: 40rpx;
		position: relative;		
		left: 2vw;
		top: 1vw;
	}
	.right-area{
		margin-left: 5vw;
		width: 40vw;
		height: 43vw;
	}
	.right-bottom{
		display: flex;
		flex-direction: column;
	}
	.item-title{
		max-width: 100%;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 0.34px;
		font-weight: 700;
		font-size: 36rpx;
		text-align: center;
		position: relative;
	}
	.item-tag{
		font-size: 28rpx;
		border-radius: 30rpx;
		text-align: center;
		width: 115rpx;
		font-weight: 700;
		background-color: #3e3a47;
		color: rgba(239, 239, 239, 1);
		padding: 10rpx 15rpx;
		margin-left: 15rpx;
		margin-top: 10rpx;
	}
	.item-price{
		padding: 10rpx 15rpx;
		position: relative;
		font-weight: bold;
		font-size: 34rpx;
		text-align: end;
		position: relative;
		top: -60rpx;
	}
	.item-time{
		color: #13ca84;
		font-size: 20rpx;
		font-weight: bold;
		text-align: end;
		position: relative;
		top: -9vw;
	}
	.intro{
		height: 20vw;
		width: 40vw;
		position: relative;
		top: -40rpx;
		font-size: 26rpx;
		font-weight: 100;
		color: lightgray;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 4; /** 显示的行数 **/
	}
	.intro-button{
		font-size: 26rpx;
		color: rgba(121, 72, 234, 1);
		position: relative;
		left: 33vw;
		top: -10vw;
	}
	.swiper-area{
		background-color: #2e2a38;
		width: 86vw;
		padding: 20rpx;
		//height: 350rpx; 
		position: relative;
		left: 4vw;
		border-radius: 30rpx;
	}
	.swiper{
		height: 56vw;
	}
	.select-area{
		display: flex;
		justify-content: space-around;
		width: 94vw;
		position: relative;
		left: 3vw;
	}
	.price-body {
		background-color: #1e1e1e;
		color: gray;
	} 
	 .series-body{
		 background-color: #1e1e1e;
		 color: gray;
		 
	 }
	 .postTime-body{
		 background-color: #1e1e1e;
		 color: gray;
	 }
	.bianhao {
		color: rgba(121, 72, 234, 1);
		letter-spacing: 0.34px;
		font-size: 24rpx;
		font-weight: 700;
		text-align: center;
		position: relative;
		top: -20rpx;
	}
	.title {
		max-width: 100%;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 0.34px;
		font-weight: 700;
		text-align: center;
		position: relative;
		top: -30rpx;
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
		.item-wrap {
			padding: 20rpx;
			padding-top: 30rpx;
			width: 300rpx;
			border-radius: 42px;			
			height: 440rpx;
			margin-bottom: 20rpx;
			
			.image-wrap {
				height: 270rpx;
				overflow: hidden;
				border-radius: 60rpx;
				width: 270rpx;
				margin-left: 15rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.tag{
				font-size: 28rpx;
				border-radius: 30rpx;
				text-align: center;
				width: 115rpx;
				font-weight: 700;
				background-color: #3e3a47;
				color: rgba(239, 239, 239, 1);
				padding: 10rpx 15rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;
				// margin-right: 10rpx;
			}
		}
	}
	.price{
		position: relative;
		left: 160rpx;
		font-weight: bold;
		font-size: 34rpx;
		top: -50rpx;
	}
	.text {
	    font-size: 12px;
	    color: #666;
	    margin-top: 5px;
	  }
	.four-tag{
		font-size: 30rpx;
		width: 80vw;
		position: relative;
		left: 10vw;
		margin-top: 3vw;
	}
</style>

