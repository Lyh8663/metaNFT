<template>
	<div>

		<div id="container2">
			<div style="left: 154px;
top: 57px;
width: 121px;
height: 36px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 24px;
font-weight: 700;

position: absolute">更改用户名
			</div>
				<svg xmlns="http://www.w3.org/2000/svg"
					class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 iKfgJk svg-icon-path-icon fill"
					viewBox="0 0 32 32" width="24" height="24" style="left: 26px;
top: 57px;
width: 32px;
height: 32px;
fill:white;
position: absolute;"  v-on:click='back'>
					<defs data-reactroot=""></defs>
					<g>
						<path
							d="M9.476 16.257c-0.103-0.435 0.015-0.912 0.355-1.251l10.685-10.685c0.521-0.521 1.365-0.521 1.886 0s0.521 1.365 0 1.886l-9.745 9.745 9.746 9.746c0.521 0.521 0.521 1.365 0 1.886s-1.365 0.521-1.886 0l-10.685-10.685c-0.171-0.171-0.296-0.388-0.354-0.632l-0.002-0.009z">
						</path>
					</g>
				</svg>
			<input style="left: 64px;
top: 260px;
width: 300px;
height: 27px;
color: rgba(255, 255, 255, 1);
font-size: 18px;
text-align: center;
font-weight: 500;background: none;border: none;
position: absolute" value="啊啊啊">
			<div style="left: 64px;
top: 292px;
width: 300px;
height: 0px;
background: rgba(204, 204, 204, 1);
border: 0.5px solid rgba(83, 84, 84, 1);
position: absolute"></div>

			<button style="left: 166px;
top: 366px;
width: 96px;
height: 40px;
background: linear-gradient(90deg, rgba(101, 55, 155, 1) 0%, rgba(136, 106, 234, 1) 53%, rgba(100, 87, 198, 1) 100%);
box-shadow: 0px 50px 50px rgba(0, 0, 0, 0.16);
position: absolute"></button>
			<div style="left: 183px;
top: 373px;
width: 69px;
height: 36px;
color: rgba(255, 255, 255, 1);
letter-spacing: 6px;
font-size: 18px;
text-align: center;
font-weight: 500;
position: absolute">保存</div>

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
	export default {
		name: "changename",
		methods: {
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
