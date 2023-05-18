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


position: absolute">邀新排行榜
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
			<div v-for="(item,index) in items">
				<div :style="{top:com_height(index)+'px'}" style="position: absolute">
					<div style="left: 20px;
top: 163px;
width: 12px;
height: 39px;
color: rgba(255, 255, 255, 1);
font-size: 30px;
font-weight: 400;

position:absolute;">{{index+1}}
					</div>
					<div style="left: 65px;
top: 146px;
width: 358px;
height: 74px;
background: rgba(47, 42, 57, 1);
border-radius: 20px;
position:absolute;">
						<img :src="item.imgsrc" width="49px" height="49px" style="left: 18px;
top: 14px;
width: 49px;
height: 49px;
/*background: rgba(255, 255, 255, 1);*/
box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.22);position: absolute;border-radius: 25px;
">
						<div style="left: 289px;
top: 13px;
width: 51px;
height: 21px;
color: rgba(255, 255, 255, 1);
letter-spacing: 0.14px;
font-size: 14px;
font-weight: 700;
position: absolute">邀新数
						</div>
						<div style="left: 289px;
top: 35px;
width: 61px;
height: 46px;
color: rgba(121, 72, 234, 1);
letter-spacing: 0.14px;
font-size: 18px;
font-weight: 700;
position: absolute">{{ item['inviteCount'] }}人
						</div>
					</div>
				</div>
			</div>


		</div>
		<div id="lower1">

		</div>

	</div>
</template>

<script>
	let space = 111;
	export default {
		name: "newrank",
		data() {
			return {
				num1: 666,
				num2: 99,
				height: 0,
				items: []
			}
		},
		onLoad() {
			this.getrank();
		},
		methods: {
			com_height: function(index) {
				console.log(index);
				return this.height + index * space;
			},
			 getrank() {
				 let temp = [];
				this.$request(this.$api.inviterank).then(function(res){
					// console.log(res);
					 res.forEach((item) => {temp.push(item); })
				})
				this.items = temp;
				console.log(this.items);
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
