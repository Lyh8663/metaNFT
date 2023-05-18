<template>
	<view class="container">
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
					邀请排行榜
				</view>
			</view>
			<view class="inviteArea">
				<view class="inviteText">
					  
				</view>
			</view>
		</view>
		<!-- 接下来是排行榜sc -->
		<scroll-view scroll-y="true" class="sc-inviteRankArea">
			<!-- debug使用 -->
			<!-- <view class="">
				{{inviteList.length}}
			</view> -->
			<!-- 这边的inviteList.length==0,问题找到 -->
			<view class="rankListArea">
				<view class="rankItem" v-for="(item,index) in inviteList" :key="index">
					<view class="rankNumArea">
						<view class="rankNumText">
							{{index+1}}
						</view>
					</view>
					<view class="afterRankNumArea">
						<view class="frontArea">
							<view class="headPicArea">
								<!-- <img :src="item.head==undefined?'https://scpic.chinaz.net/files/pic/pic9/201311/apic2098.jpg':item.head" alt=""> -->
								<img v-if="item.head!=undefined" class="headPic" :src="item.head" alt="">
								<view v-else class="">
									暂无
								</view>
							</view>
							<view class="nameAndTitleArea">
								<view class="nameText">
									{{item.name==undefined?'未命名':item.name}}
								</view>
								<view class="TitleText">
									收藏家
								</view>
							</view>
						</view>
						<view class="inviteAndNumArea">
							<view class="inviteTagText">
								邀新数
							</view>
							<view class="inviteNumText">
								{{item.inviteCount}}人
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="myArea">
			<view class="myRankText">
				我的排名：
			</view>
			<view class="rankItem">
				<view class="rankNumArea">
					<view class="rankNumText">
						{{this.myRank==''?'?':this.myRank}}
					</view>
				</view>
				<view class="afterRankNumArea">
					<view class="frontArea">
						<view class="headPicArea">
							<img :src="this.myHead==''?'https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG':this.myHead" alt="">
						</view>
						<view class="nameAndTitleArea">
							<view class="nameText">
								{{this.myName==''?'魅塔收藏家':this.myName}}
							</view>
							<view class="TitleText">
								收藏家
							</view>
						</view>
					</view>
					<view class="inviteAndNumArea">
						<view class="inviteTagText">
							邀新数
						</view>
						<view class="inviteNumText">
							{{this.myNum==''?'0':this.myNum}}人
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteList:[],
				myRank:'',
				myName:'',
				myNum:'',
				myHead:''
			}
		},
		methods: {
			goback(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		},
		onHide(){
			//担心数据还没加载出来，用户就退出此页
			//这会导致加载框不会消失，全程出现
			uni.hideLoading();
		},
		onLoad() {
			
			//因为前后端采用的数据获取显示方式局限性并受限于网速，此页加载会比较慢，采用loading
			uni.showLoading({
				title:"正在获取"
			})
			
			var that = this;
			//获取用户token
			let token = uni.getStorageSync('tokenValue');
			//页面加载的时候就将排行榜的信息加载出来
			uni.request({
				url:"https://www.meta-artwork.com:10584/core/invite/rank",
				method:"GET",
				header:{
					'sa-token' : token,
				},
				success: (res) => {
					console.log("请求发起")
					console.log(res.statusCode)
					console.log(res.data.data.length)
					
					//请求发起后直接显示用户的名字和头像以及邀新数
					
					//名字
					if(uni.getStorageSync('username')=="魅塔收藏家"){
						var beforeString = uni.getStorageSync('accountId').slice(0,1)
						var afterString = uni.getStorageSync('accountId').slice(uni.getStorageSync('accountId').length-3,uni.getStorageSync('accountId').length)
						var finalString = beforeString + "***" +  afterString;
						that.myName = uni.getStorageSync('username') + finalString;
					}else{
						that.myName = uni.getStorageSync('username');
					}
					
					//头像
					if(uni.getStorageSync('head')!=''){
						that.myHead = uni.getStorageSync('head');
					}else{
						that.myHead = "https://meta-1312685046.cos.ap-nanjing.myqcloud.com/logo001.PNG";
					}
					
					//邀新数
					// if(uni.getStorageSync('inviteCount')!=''){
					// 	that.myNum = uni.getStorageSync('inviteCount')
					// }else{
					// 	that.myNum = 0;
					// }
					
					//邀新数并不会在登陆时返回，需另想办法
					
					//返回的是全部人的排行
					//现在通过isMe字段来获取用户的排名信息(仅排名和邀新数)
					for(var i = 0; i<res.data.data.length;i++){
						if(res.data.data[i].isMe==1){
							that.myRank = i+1;
							that.myNum = res.data.data[i].inviteCount
						}
					}
					
					//如果返回的数组中,元素数量大于等于100
					if(res.data.data.length>=100){
						for(var i = 0;i<100;i++){
							//在把data内容放进去之前，需要在后面加上收藏家的脱敏accountId
							if(res.data.data[i].name=="魅塔收藏家"){//如果用的是默认名字（用户没有自己改名），就用这个方式区别
								var beforeString = res.data.data[i].accountId.slice(0,1)
								var afterString = res.data.data[i].accountId.slice(res.data.data[i].accountId.length-3,res.data.data[i].accountId.length)
								var finalString = beforeString + "***" +  afterString;
								res.data.data[i].name += finalString;
							}
							that.inviteList.push(res.data.data[i]);
						}
					}else{//如果返回的数组中,元素数量小于100
						for(var i = 0;i<res.data.data.length;i++){
							//在把data内容放进去之前，需要在后面加上收藏家的脱敏accountId
							if(res.data.data[i].name=="魅塔收藏家"){//如果用的是默认名字（用户没有自己改名），就用这个方式区别
								var beforeString = res.data.data[i].accountId.slice(0,1)
								var afterString = res.data.data[i].accountId.slice(res.data.data[i].accountId.length-3,res.data.data[i].accountId.length)
								var finalString = beforeString + "***" +  afterString;
								res.data.data[i].name += finalString;
							}
							that.inviteList.push(res.data.data[i]);
						}
					}
					
					//处理完要关闭
					uni.hideLoading();
				}
			})
			/*
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
		}
	}
</script>

<style>
	.container{
		height: 100vh;
		width: 100vw;
	}
	.headArea{
		height: 6vh;
		/* background-color: aqua; */
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 35rpx;
		font-weight: bold;
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
	}
	.inviteArea{
		flex: 1;
		display: flex;
		align-items: center;
		/* justify-content: flex-end; */
		justify-content: center;
		color: #BA55D3;
	}
	.sc-inviteRankArea{
		width: 95vw;
		margin-left: 2.5vw;
		height: calc(100vh - 40px - 6vh - 17vh);
		/* background-color: aquamarine; */
		/* background-color: #BA55D3; */
	}
	.rankListArea{
		width: 100%;
	}
	.rankItem{
		width: 100%;
		/* background-color: black; */
		height: 10vh;
		margin-top: 1.5vh;
		display: flex;
		align-items: center;
		/* align-items: center; */
		/* justify-content: space-between; */
	}
	.frontArea{
		display: flex;
		align-items: center;
		/* background-color: #BA55D3; */
	}
	.rankNumArea{
		height: 8vw;
		width: 8vw;
		/* margin-left: 3vw; */
		/* background-color: aquamarine; */
		/* background-color: aquamarine; */
		display: flex;
		align-items: center;
		justify-content: center;
		font-style: italic;
	}
	.rankNumText{
		font-size: 40rpx;
		font-weight: bold;
	}
	.afterRankNumArea{
		display: flex;
		align-items: center;
		/* background-color: white; */
		background-color: #2f2a39;
		border-radius: 30rpx;
		width: 77vw;
		height: 9vh;
		margin-left: 5vw;
	}
	.headPicArea{
		height: 13vw;
		width:13vw;
		margin-left: 4.5vw;
		/* background-color: aquamarine; */
		background-color: #BA55D3;
		border-radius: 10000000000000000000rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.headPicArea img{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.nameAndTitleArea{
		height: 17vw;
		width: 31vw;
		margin-left: 2vw;
		/* background-color: #fff; */
		/* background-color: aquamarine; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.nameText{
		font-weight: bold;
		font-size: 35rpx;
	}
	.TitleText{
		color: #BA55D3;
		font-size: 30rpx;
	}
	.inviteAndNumArea{
		height: 17vw;
		width: 23vw;
		/* background-color: brown; */
		margin-left: 1vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.inviteTagText{
		font-weight: bold;
		font-size: 35rpx;
	}
	.inviteNumText{
		color: #BA55D3;
		font-size: 30rpx;
	}
	.myArea{
		width: 95vw;
		margin-left: 2.5vw;
		/* height: calc(100vh - 40px - 6vh - 10vh); */
		/* background-color: aquamarine; */
		/* background-color: #BA55D3; */
		/* border-top: #BA55D3 solid 1px; */
	}
	.myRankText{
		margin-top: 20rpx;
		font-size: 35rpx;
		font-weight: bold;
	}
</style>
