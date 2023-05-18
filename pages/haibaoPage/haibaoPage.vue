<template>
	<view class="container">
		<!-- 为状态栏预留位置 -->
		<view class="status_bar" style="height:40px;width: 100%;">
		</view>
		<view class="contentArea">
			<view class="greeting" v-show="isShow">
				已为您生成专属海报
			</view>
			<image class="haibao" :src="imgData" alt="">
			<view class="btnArea">
				
				<button class="goback" v-show="isShow" @click="goback()">返回上页</button>
				<button class="btn-savecode" v-show="isShow" @click="savePic(imgPath)">保存图片</button>
				
			</view>
			
			<view class="failMSG" v-show="isShow">
				--------若保存失败请您手动截图--------
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//带前缀的图片base64
				imgData:'',
				isShow:false,
				//不带前缀的图片base64
				imgPath:'',
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			savePic(base64){
				console.log("保存被点击了")
				uni.showModal({
					title:"注意！",
					content:"图片已保存至相册中，若出现保存失败的情况，可能与应用权限未开启有关" 
				})
				// 创建一个Bitmap是原生图片对象
					const bitmap = new plus.nativeObj.Bitmap("test");
					return new Promise((resolve,reject)=>{
						// 使用loadBase64Data将base64字符串转换为bitmap文件对象
						bitmap.loadBase64Data(base64,()=>{
							const url = "_doc/" + new Date().getTime() + ".png";  // url为时间戳命名方式
							// 再调用bimap.save方法，将图片文件存入手机存储
							bitmap.save(url,{
								overwrite: true,  // 是否覆盖
							},(i)=>{
								//在这里使用文档说的保存到手机相册的方法
								uni.saveImageToPhotosAlbum({
									filePath: url,
									success: function() {
											resolve({
													code: 0,
													msg: '图片保存成功',
													filePath: url
											});
											bitmap.clear()
									},
									fail: function (err) {
									   resolve({
									   		code: 1,
									   		msg: '图片保存失败',
									   		filePath: ''
									   });
									}
								})
							},(e)=>{
								resolve({
										code: 1,
										msg: '图片保存失败',
										filePath: ''
								});
								bitmap.clear()
							})
						})
					})
			}
		},
		onLoad() {
			uni.showLoading({
				title:"正在为您生成专属海报"
			})
			this.isShow = false;
			var that = this;
			//获取用户token
			let token = uni.getStorageSync('tokenValue');
			//获取海报
			uni.request({
				url:'https://www.meta-artwork.com:10584/core/poster/test/share',
				method:"GET",
				header:{
					'sa-token' : token,
					'Content-Type': 'application/json'
				},
				responseType:'arraybuffer',
				success: (res) => {
					console.log("正在获取海报信息")
					console.log("海报信息请求返回状态码：" + res.statusCode);
					console.log(res.data)
					const arrayBuffer = new Uint8Array(res.data)
					const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer)
					that.imgData = base64; //将imgData与image标签的src属性绑定
					that.imgPath = uni.arrayBufferToBase64(arrayBuffer)
					uni.hideLoading();
					that.isShow = true;
				}
			})
		}
	}
	

</script>

<style>
	.container{
		width: 100vw;
		height: 100vh;
	}
	.status_bar{
		/* background-color: #fff; */
	}
	.contentArea{
		width: 100%;
		height: calc(100vh - 40px);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* background-color: aquamarine; */
		margin-left: -20rpx;
	}
	.greeting{
		margin-top: 30rpx;
		font-size: 35rpx;
		font-weight: bold;
		color: #BA55D3;
		margin-bottom: 50rpx;
	}
	.haibao{
		width: 84vw;
		/* margin-left: 15vw; */
		height: 144vw;
	}
	.btn-savecode{
		width: 40vw;
		border-radius: 10000000000000rpx;
		background-color: #BA55D3;
		color: white;
		margin-top: 100rpx;
		margin-left: 15rpx;
	}
	.btnArea{
		display: flex;
	}
	.goback{
		width: 40vw;
		border-radius: 10000000000000rpx;
		background-color: #BA55D3;
		color: white;
		margin-top: 100rpx;
		margin-right: 15rpx;
	}
	.failMSG{
		font-weight: bold;
		color: #BA55D3;
		margin-top: 40rpx;
		font-size: 20rpx;
	}
</style>
