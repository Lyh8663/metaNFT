<template>
	<div style="left: -10px;
top: 0px;
width: 428px;
height: 926px;
background: linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(39, 39, 39, 1) 100%);
border-radius: 42px;

position: absolute">

<!-- 全部邀请的box -->
<div style='left: 141px;
top: 57px;
width: 147px;
height: 36px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 20px;
font-weight: 500;
position: absolute;'>全部邀请 ({{items.length}})</div>


<!-- 邀请用户的box -->
		<div style='left: 328px;
top: 62px;
width: 72px;
height: 27px;
color: rgba(121, 72, 234, 1);
font-size: 18px;
font-weight: 400;
position: absolute;' @click='invitation'>邀请用户</div>

<!-- 用户列表 -->
<div v-if="invite" v-for="(item,index) in items">
	<div :style="{top:com_height(index)+'px'}" style='left: 0px;
width: 428px;
height: 50px;position: absolute;
'>
<div style='left: 48px;
top: 12px;
width: 11px;
height: 27px;
color: rgba(255, 255, 255, 1);
font-size: 18px;
font-weight: 500;
position: absolute;'>	{{index+1}}
</div>
<div style='left: 134px;
top: 12px;
width: 30px;
height: 27px;
color: rgba(255, 255, 255, 1);
font-size: 18px;
font-weight: 400;
position: absolute;'>{{item.invited.name}}</div>
<div></div>
<div style='left: 272px;
top: 12px;
width: 110px;
height: 27px;
color: rgba(255, 255, 255, 1);
font-size: 18px;
font-weight: 400;
position: absolute;'>{{item.invited.phone}}</div>
</div>
</div>

<!-- 渐变色背景 -->
		<div style="left: 57px;
top: 208px;
width: 315px;
height: 380px;
background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
border-radius: 10px 10px 0px 0px;
position: absolute;">
		</div>

<!-- 二维码展示,现在写死了是这个this.$api.baseURL + '/login/login' -->
		<img :src="QRImgUrl" width="80px" height="80px" style="left: 177px;
top: 334px;
width: 80px;
height: 80px;
background: transparent;
position: absolute">
{{QRImgUrl}}
<!-- 底部信息栏 -->
		<div style="left: 57px;
top: 511px;
width: 315px;
height: 109px;
background: rgba(48, 48, 48, 1);
border-radius: 0 0 10px 10px;
position:absolute;">

<!-- logo区域 -->
			<div style="left: 18px;
top: 20px;
width: 25px;
height: 25px;font-size: 10px;
background: linear-gradient(180deg, rgba(161, 140, 209, 1) 0%, rgba(251, 194, 235, 1) 100%);
position: absolute">logo
			</div>
		</div>
		
<!-- 魅塔名字展示区域 -->
		<div style="left: 112px;
top: 531px;
width: 40px;
height: 25px;
color: rgba(255, 255, 255, 1);
font-size: 20px;
font-weight: 400;
position: absolute">魅塔
		</div>
		<div style="left: 75px;
top: 569px;
width: 102px;
height: 24px;
color: rgba(255, 255, 255, 1);
font-size: 16px;
font-weight: 500;
position: absolute">sloganslogan
		</div>
		<img src="https://s1.ax1x.com/2022/07/18/jolrgU.png" style="left: 339px;
top: 569px;
width: 24px;
height: 24px;
position: absolute;" width="24px" height="24px" @click='down()'>
	</div>
</template>

<script>
	//引入二维码
	import QRCode from '@/pages/my/qrcode'
	export default {
		name: "share",
		data() {
			return {
				QRImgUrl: '',
				QRlink: this.$api.baseURL + '/login/login',
				items:[],
				invite:false,
			}
		},
		created() {
			this.getQRcode();
			this.getrank();
		},
		methods: {
			invitation(){
				this.invite=this.invite?false:true;
			},
			async getrank() {
				 let temp = [];
				await this.$request(this.$api.invitation,{},'POST').then(function(res){
					// console.log(res);
					 res.forEach((item) => {temp.push(item); })
				})
				this.items = temp;
				console.log(this.items);
			},
			async getQRcode() {
				let temp = '';
				await this.$request(this.$api.invite).then(function(res){
					temp = res;
					// console.log(temp)
				});
				this.QRlink += temp;
				console.log(this.QRlink)
				QRCode.toDataURL(
					// 注意：请赋值该变量，这里的QRlink已经是将后端返回的生成二维码的字符串赋值过的
					this.QRlink, {
						errorCorrectionLevel: 'L',
						margin: 2,
						width: 128
					},
					(err, url) => {
						if (err) throw err
						this.QRImgUrl = url
					}
				)
			},
			back: function() {
				/*uni.navigateBack({
					delta: 1
				})*/
				//@zxyuns 处理兼容，如果没有上一级界面则返回首页
				const pages = getCurrentPages();
				if (pages.length === 2) {
					uni.navigateBack({
						delta: 1
					});
				} else if (pages.length === 1) {
					uni.switchTab({
						url: '/pages/my/my',
					})
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			com_height: function(index) {
				// console.log(index);
				return 108 + index * 50;
			},
			down() {
			        let pages = getCurrentPages();
			        let page = pages[pages.length - 1];
			        let ws = page.$getAppWebview();
			        let bitmap = new plus.nativeObj.Bitmap('drawScreen');
			        // 将webview内容绘制到Bitmap对象中  
			        ws.draw(bitmap, () => {
			            // 保存图片到本地  
			            bitmap.save("_doc/drawScreen.jpg", {
			                overwrite: true
			            }, res => {
			                console.log(res.target); // 图片地址  
			
			                uni.saveImageToPhotosAlbum({ //保存图片到系统相册。
			                    filePath: res.target, //图片文件路径
			                    success: () => {
			                        uni.showModal({
			                            title: '温馨提示',
			                            content: '保存图片成功，赶紧去转发给好友吧~',
			                            showCancel: false,
			                            confirmColor: "#34CE98",
			                            confirmText: '知道了',
			                            success: () => {
			                                this.canSave = false;
			                            }
			                        })
			                        uni.hideLoading()
			                    },
			                    fail: function(e) {
			                        uni.showModal({
			                            title: '温馨提示',
			                            content: '保存图片失败，重新再试试~',
			                            showCancel: false,
			                            confirmColor: "#34CE98",
			                            confirmText: '知道了',
			                            success: () => {
			                                this.canSave = false;
			                            }
			                        })
			                        uni.hideLoading()
			                    }
			                });
			
			                bitmap.clear(); // 清除Bitmap对象  
			            }, error => {
			                console.log(JSON.stringify(error)); // 保存失败信息  
			                uni.showModal({
			                    title: '温馨提示',
			                    content: '保存图片失败，重新再试试~',
			                    showCancel: false,
			                    confirmColor: "#34CE98",
			                    confirmText: '知道了',
			                    success: () => {
			                        this.canSave = false;
			                    }
			                })
			                uni.hideLoading()
			                bitmap.clear(); // 清除Bitmap对象  
			            });
			            // bitmap.clear(); // 清除Bitmap对象  
			        }, error => {
			            uni.showModal({
			                title: '温馨提示',
			                content: '保存图片失败，重新再试试~',
			                showCancel: false,
			                confirmColor: "#34CE98",
			                confirmText: '知道了',
			                success: () => {
			                    this.canSave = false;
			                }
			            })
			            uni.hideLoading()
			            console.log(JSON.stringify(error)); // 绘制失败  
			        }, {
			            check: true, // 设置为检测白屏  
			        });
			    }
			}
			
		
	};

	// var settings = {
	//    "url": "https://www.apifox.cn/core/invite/code",
	//    "method": "GET",
	//    "timeout": 0,
	//    "headers": {
	//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
	//    },
	// };

	// $.ajax(settings).done(function (response) {
	//    console.log(response);
	// });
</script>

<style scoped>

</style>
