<template>
	<div>

		<div id="container2">

			<div style="left: 166px;
top: 57px;
width: 97px;
height: 36px;
color: rgba(239, 239, 239, 1);
letter-spacing: 0.18px;
font-size: 24px;
font-weight: 700;

position: absolute">我的订单
			</div>
			<svg xmlns="http://www.w3.org/2000/svg"
				class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 iKfgJk svg-icon-path-icon fill"
				viewBox="0 0 32 32" width="24" height="24" style="left: 26px;
top: 57px;
width: 32px;
height: 32px;
fill:white;
position: absolute;" v-on:click='back()'>
				<defs data-reactroot=""></defs>
				<g>
					<path
						d="M9.476 16.257c-0.103-0.435 0.015-0.912 0.355-1.251l10.685-10.685c0.521-0.521 1.365-0.521 1.886 0s0.521 1.365 0 1.886l-9.745 9.745 9.746 9.746c0.521 0.521 0.521 1.365 0 1.886s-1.365 0.521-1.886 0l-10.685-10.685c-0.171-0.171-0.296-0.388-0.354-0.632l-0.002-0.009z">
					</path>
				</g>
			</svg>
			<div id="underline" :style="{left:leftlen}"></div>
			<div :style="{color:first}" id="first" @click="clickfirst">全部
			</div>
			<div :style="{color: second}" id="second" @click="clicksecond">待支付
			</div>
			<div :style="{color: third}" id="third" @click="clickthird">已转赠
			</div>
			<div v-if="firststate">
				<div v-if="allnum==0">
					<img :src="imgsrc" width="292px" height="265px" style="left: 58px;
  top: 253px;
  width: 292px;
  height: 265px;
  position:absolute;">
					<div style="left: 151px;
  top: 518px;
  width: 128px;
  height: 24px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 500;
  position: absolute">您还没有产生订单
					</div>
				</div>
				<div v-else>
					<div v-for="(item, index) in allitems">
						<div :style="{top:com_height(index)+'px'}" style="left: 16px;
  width: 391px;
  height: 196px;
  background: rgba(41, 41, 41, 1);
  border-radius: 20px;
  position:absolute;">
							<img :src="item.imgherf" width="116px" height="160px" style="left: 18px;
  top: 24px;
  width: 116px;
  height: 160px;
  background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
  border-radius: 34.2px;
  position:absolute;">
							<div style="left: 145px;
  top: 25px;
  width: 56px;
  height: 28px;
  background: rgba(58, 48, 79, 1);
  border-radius: 20px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 29px;
  height: 21px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.18px;
  font-size: 14px;
  font-weight: 700;position: absolute;
  ">创世
								</div>
							</div>
							<div style="left: 206px;
  top: 25px;
  width: 146px;
  height: 27px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.18px;
  font-size: 18px;
  font-weight: 700;
  position:absolute;">{{ item.name }}
							</div>
							<div style="position: absolute;left: 160px;
  top: 68px;
  width: 210px;
  height: 24px;
  color: rgba(121, 72, 234, 1);
  letter-spacing: 0.18px;
  font-size: 16px;
  font-weight: 400;
  ">编号：{{ item.code }}
							</div>
							<div style="left: 287px;
  top: 98px;
  width: 120px;
  height: 36px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.18px;
  font-size: 24px;
  font-weight: 700;
  position: absolute">¥ {{ item.price }}.00
							</div>
							<div style="left: 207px;
  top: 151px;
  width: 80px;
  height: 31px;
  background: rgba(56, 56, 56, 1);
  border-radius: 22px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 54px;
  height: 20px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.2px;
  font-size: 13.2px;
  font-weight: 700;position: absolute;
  ">删除订单
								</div>
							</div>
							<div style="left: 301px;
  top: 151px;
  width: 80px;
  height: 31px;
  background: rgba(56, 56, 56, 1);
  border-radius: 22px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 54px;
  height: 20px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.2px;
  font-size: 13.2px;
  font-weight: 700;position: absolute;
  ">查看更多
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="secondstate">
				<div v-if="secondnum==0">
					<img :src="imgsrc" width="292px" height="265px" style="left: 58px;
  top: 253px;
  width: 292px;
  height: 265px;
  position:absolute;">
					<div style="left: 151px;
  top: 518px;
  width: 128px;
  height: 24px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 500;
  position: absolute">您还没有产生订单
					</div>
				</div>
			</div>
			<div v-else-if="thirdstate">
				<div v-if="thirdnum==0">
					<img :src="imgsrc" width="292px" height="265px" style="left: 58px;
  top: 253px;
  width: 292px;
  height: 265px;
  position:absolute;">
					<div style="left: 151px;
  top: 518px;
  width: 128px;
  height: 24px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 500;
  position: absolute">您还没有产生订单
					</div>
				</div>
				<div v-else>
					<div v-for="(item, index) in senditems">
						<div :style="{top:com_height(index)+'px'}" style="left: 16px;
  width: 391px;
  height: 196px;
  background: rgba(41, 41, 41, 1);
  border-radius: 20px;
  position:absolute;">
							<img :src="item.imgherf" width="116px" height="160px" style="left: 18px;
  top: 24px;
  width: 116px;
  height: 160px;
  background: linear-gradient(180deg, rgba(217, 175, 217, 1) 0%, rgba(151, 217, 225, 1) 100%);
  border-radius: 34.2px;
  position:absolute;">
							<div style="left: 145px;
  top: 25px;
  width: 56px;
  height: 28px;
  background: rgba(58, 48, 79, 1);
  border-radius: 20px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 29px;
  height: 21px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.18px;
  font-size: 14px;
  font-weight: 700;position: absolute;
  ">创世
								</div>
							</div>
							<div style="left: 206px;
  top: 25px;
  width: 146px;
  height: 27px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.18px;
  font-size: 18px;
  font-weight: 700;
  position:absolute;">{{ item.name }}
							</div>
							<div style="position: absolute;left: 160px;
  top: 68px;
  width: 210px;
  height: 24px;
  color: rgba(121, 72, 234, 1);
  letter-spacing: 0.18px;
  font-size: 16px;
  font-weight: 400;
  ">编号：{{ item.code }}
							</div>
							<img :src="item.sender" width="35px" height="35px" style="left: 166px;
top: 112px;
width: 35px;
height: 35px;border-radius:25px;
box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.22);position: absolute;
">
							<div style="left: 225px;
top: 115px;
width: 200px;
height: 24px;
color: rgba(255, 255, 255, 1);
letter-spacing: 0.18px;
font-size: 16px;
font-weight: 500;
position: absolute">转给：{{item.sended}}</div>
							<div style="left: 207px;
  top: 151px;
  width: 80px;
  height: 31px;
  background: rgba(56, 56, 56, 1);
  border-radius: 22px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 54px;
  height: 20px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.2px;
  font-size: 13.2px;
  font-weight: 700;position: absolute;
  ">删除订单
								</div>
							</div>
							<div style="left: 301px;
  top: 151px;
  width: 80px;
  height: 31px;
  background: rgba(56, 56, 56, 1);
  border-radius: 22px;
  position: absolute">
								<div style="left: 14px;
  top: 4px;
  width: 54px;
  height: 20px;
  color: rgba(239, 239, 239, 1);
  letter-spacing: 0.2px;
  font-size: 13.2px;
  font-weight: 700;position: absolute;
  ">查看更多
								</div>
							</div>
						</div>
					</div>
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
	let length = ['43px', '187px', '343px'];
	var space = 206;
	export default {
		name: "order",
		data() {
			return {
				first: 'rgba(255, 255, 255, 1)',
				second: 'rgba(166, 166, 166, 1)',
				third: 'rgba(166, 166, 166, 1)',
				firststate: true,
				secondstate: false,
				thirdstate: false,
				leftlen: '43px',
				allnum: 1,
				secondnum: 0,
				thirdnum: 1,
				height: 170,
				imgsrc: 'https://s1.ax1x.com/2022/07/18/joSRzT.png',
				allitems: [{
						imgherf: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名藏...',
						code: '00111223344',
						price: '99'
					},
					{
						imgherf: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名藏...',
						code: '00111223344',
						price: '99'
					}
				],
				senditems: [{
						imgherf: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名藏...',
						code: '00111223344',
						sender: 'https://s1.ax1x.com/2022/07/18/jIy7cQ.jpg',
						sended: 'ABB'
					},
					{
						imgherf: 'https://s1.ax1x.com/2022/07/18/jo9726.png',
						name: '藏品名藏品名藏...',
						code: '00111223344',
						sender: 'https://s1.ax1x.com/2022/07/18/jIy7cQ.jpg',
						sended: 'ABB'
					}
				]
			}
		},
		computed: {},
		methods: {
			com_height: function(index) {
				console.log(index);
				return this.height + index * space;
			},
			clickfirst: function() {
				this.first = 'rgba(255, 255, 255, 1)';
				this.second = 'rgba(166, 166, 166, 1)';
				this.third = 'rgba(166, 166, 166, 1)';
				this.leftlen = length[0];
				this.firststate = true;
				this.secondstate = false;
				this.thirdstate = false;

			},
			clicksecond: function() {
				this.second = 'rgba(255, 255, 255, 1)';
				this.first = 'rgba(166, 166, 166, 1)';
				this.third = 'rgba(166, 166, 166, 1)';
				this.leftlen = length[1];
				this.secondstate = true;
				this.firststate = false;
				this.thirdstate = false;
			},
			clickthird: function() {
				this.third = 'rgba(255, 255, 255, 1)';
				this.second = 'rgba(166, 166, 166, 1)';
				this.first = 'rgba(166, 166, 166, 1)';
				this.leftlen = length[2];
				this.thirdstate = true;
				this.secondstate = false;
				this.firststate = false;
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
	#underline {
		top: 147px;
		width: 50px;
		left: 43px;
		height: 3px;
		background: rgba(255, 255, 255, 1);
		position: absolute;
	}

	#first {
		left: 50px;
		color: rgba(255, 255, 255, 1);
		top: 118px;
		width: 37px;
		height: 27px;
		letter-spacing: 0.18px;
		font-size: 18px;
		font-weight: 500;
		position: absolute;
	}

	#second {
		left: 187px;
		top: 118px;
		color: rgba(166, 166, 166, 1);
		width: 55px;
		height: 27px;
		letter-spacing: 0.18px;
		font-size: 18px;
		font-weight: 500;
		position: absolute;
	}

	#third {
		left: 342px;
		top: 118px;
		width: 55px;
		color: rgba(166, 166, 166, 1);
		height: 27px;
		position: absolute;
		letter-spacing: 0.18px;
		font-size: 18px;
		font-weight: 500;

	}

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
