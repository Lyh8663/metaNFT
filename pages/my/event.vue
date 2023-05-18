<template>
	<div>

		<div id="container1">
			<div style="left: 193px;
top: 57px;
width: 49px;
height: 36px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 24px;
font-weight: 700;
position: absolute">活动
			</div>
			<svg xmlns="http://www.w3.org/2000/svg"
				class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 iKfgJk svg-icon-path-icon fill"
				viewBox="0 0 32 32" width="24" height="24" style="left: 26px;
top: 57px;
width: 32px;
height: 32px;
fill:white;
position: absolute;" @click='back()'>
				<defs data-reactroot=""></defs>
				<g>
					<path
						d="M9.476 16.257c-0.103-0.435 0.015-0.912 0.355-1.251l10.685-10.685c0.521-0.521 1.365-0.521 1.886 0s0.521 1.365 0 1.886l-9.745 9.745 9.746 9.746c0.521 0.521 0.521 1.365 0 1.886s-1.365 0.521-1.886 0l-10.685-10.685c-0.171-0.171-0.296-0.388-0.354-0.632l-0.002-0.009z">
					</path>
				</g>
			</svg>
			<div id="fragment_fusion"></div>
			<div id="monthly_equity"></div>
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
	export default {
		name: "event",
		data() {
			return {}
		},
		methods:{
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
	#lower1 {
		left: 0px;
		top: 778px;
		width: 375px;
		height: 34px;
		line-height: 20px;
		background-color: rgba(248, 248, 248, 100);
		text-align: center;
		border: 1px solid rgba(255, 0, 0, 0);
		position: absolute;
	}

	#monthly_equity {
		left: 38px;
		top: 363px;
		width: 358px;
		height: 174px;
		background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
		border-radius: 34.2px;

		position: absolute;
	}

	#fragment_fusion {
		left: 38px;
		top: 144px;
		width: 358px;
		height: 174px;
		background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
		border-radius: 34.2px;

		position: absolute;
	}

	#container1 {
		left: -10px;
		top: 0px;
		width: 428px;
		height: 926px;
		background: linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(39, 39, 39, 1) 100%);
		border-radius: 42px;

		position: absolute;
	}
</style>
