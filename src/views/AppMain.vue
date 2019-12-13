<template>
	<el-container class="main-container">
		<el-aside :class="asideClass">
			<LeftNav></LeftNav>
		</el-aside>
		<el-container>
			<el-header class="main-header">
				<TopNav></TopNav>
			</el-header>
			<el-main class="main-center">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import TopNav from '@/components/TopNav'
	import LeftNav from '@/components/LeftNav'

	export default {
		data() {
			return {
				a: false
			}
		},
    methods:{
  // dofun:function() {
  //
  // }
    },
		computed: {

			asideClass: function() {
				return this.a ? "main-aside-collapsed" : "main-aside"
			}
		},
		components: {
			TopNav,
			LeftNav
		},
		created: function() {
			this.$root.Bus.$on("aside-toggle", (indexs) => {
				if (indexs == true) {
					setTimeout(() => {
						this.a = indexs
					}, 300)

				} else {
					this.a = indexs
				}
			});
		}
	}
</script>


`<style scoped>
	.main-container {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.main-aside-collapsed {
		/* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
		width: 64px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-aside {
		width: 240px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-header {
		padding: 0px;
		border-left: 2px solid #333;
	}

	.main-center {
		padding: 20px;
		border-left: 2px solid #333;
	}
</style>
