<template>
	<div>

		<div id="container2">
			<div style="left: 154px;
top: 55px;
width: 121px;
height: 36px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 24px;
font-weight: 700;


position: absolute">藏品排行榜
			</div>
			<svg xmlns="http://www.w3.org/2000/svg"
				class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 iKfgJk svg-icon-path-icon fill"
				viewBox="0 0 32 32" width="24" height="24" style="left: 26px;
top: 57px;
width: 32px;
height: 32px;
fill:white;
position: absolute;" @click='back'>
				<defs data-reactroot=""></defs>
				<g>
					<path
						d="M9.476 16.257c-0.103-0.435 0.015-0.912 0.355-1.251l10.685-10.685c0.521-0.521 1.365-0.521 1.886 0s0.521 1.365 0 1.886l-9.745 9.745 9.746 9.746c0.521 0.521 0.521 1.365 0 1.886s-1.365 0.521-1.886 0l-10.685-10.685c-0.171-0.171-0.296-0.388-0.354-0.632l-0.002-0.009z">
					</path>
				</g>
			</svg>
			<div v-for="(item,index) in collectionitems">
				<div :style="{top:com_height(index)+'px'}" style="position: absolute;width: 428px;height: 100px;">
					<div style="left: 34px;
top: 29px;
width: 12px;
height: 39px;
color: rgba(255, 255, 255, 1);
font-size: 30px;
font-weight: 400;
position:absolute;">{{ index + 1 }}
					</div>
					<img :src="item.imgsrc" width="49px" height="49px" style="left: 62px;
top: 15px;
width: 70px;
height: 70px;
background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
border-radius: 10px;
position: absolute;
">
					<div style="left: 157px;
top: 27px;
width: 39px;
height: 20px;
background: linear-gradient(90deg, rgba(61, 78, 129, 1) 0%, rgba(87, 83, 201, 1) 48%, rgba(110, 127, 243, 1) 100%);
border-radius: 20px;

position: absolute">
						<div style="left: 8px;
top: 1px;
width: 39px;
height: 20px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 11px;
font-weight: 500;
position: absolute">创世
						</div>
					</div>
					<div style="left: 205px;
top: 22px;
width: 130px;
height: 24px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 16px;
font-weight: 700;
position: absolute">{{item.name}}</div>
					<div style="left: 353px;
top: 26px;
width: 32px;
height: 21px;
color: rgba(224, 195, 252, 1);
letter-spacing: 0.14px;
font-size: 12.6px;
font-weight: 700;
position:absolute;">已购</div>
					<div style="left: 343px;
top: 47px;
width: 80px;
height: 27px;
color: rgba(224, 195, 252, 1);
letter-spacing: 0.14px;
font-size: 18px;
font-weight: 700;position: absolute;
">{{item.num}}份</div>
					<div style="left: 29px;
top: 100px;
width: 367px;
height: 0px;
background: rgba(204, 204, 204, 1);
border: 0.8px solid rgba(56, 56, 56, 1);
position: absolute"></div>
				</div>
			</div>


		</div>
		<div id="lower1">

		</div>
		<div style="left: 121px;
top: 799px;
width: 134px;
height: 5px;
line-height: 20px;
border-radius: 3px;
background-color: rgba(0, 0, 0, 1);
text-align: center;position:absolute;">
		</div>
	</div>
</template>

<script>
	let space = 100;
	export default {
		name: "collectionrank",
		data() {
			return {
				height: 110,
				collectionitems: [{
						imgsrc: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名',
						num: 666,
					},
					{
						imgsrc: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名',
						num: 666,
					}
				],
			}
		},
		methods: {
			com_height: function(index) {
				return this.height + index * space;
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
		}
	}
</script>

<style scoped>
	#container2 {
		left: -10px;
		top: 0px;
		width: 428px;
		height: 926px;
		background: linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(39, 39, 39, 1) 100%);
		border-radius: 42px;
		position: absolute;
	}
</style>
