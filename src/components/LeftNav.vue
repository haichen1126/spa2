<template>
	<!-- @open="handleOpen" @close="handleClose" -->
	<el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
	 active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb">
		<!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
		<div class="logobox">
			<img class="logoimg" src="../assets/img/logo.png" alt="">
		</div>

		<el-menu-item index="1"><i class="el-icon-location"></i><span >客户管理关系系统</span></el-menu-item>
		<el-submenu CstService v-for="(n1,ind1) in treeNodeList" :key="ind1" :index="'index'+n1.treeNodeId">
			<template slot="title">
				<i :class="n1.icon"></i>
				<span>{{n1.treeNodeName}}</span>
			</template>
			<el-menu-item v-for="(n2,ind2) in n1.tTreeNodes" :key="ind2" :index="n2.url">
				<i :class="n2.icon"></i>
				<span slot="title">{{n2.treeNodeName}}</span>
			</el-menu-item>
		</el-submenu>
	</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data: function() {
			return {
				collapsed: false,
				bb: true
			}
		},
		methods: {
			doToggle: function() {
        this.$store.dispatch('settTreeNode', {
          _this:this
        })
				this.collapsed = !this.collapsed
				this.$root.Bus.$emit("aside-toggle", this.collapsed);
			}

		},
		created: function() {
			this.$root.Bus.$on("aside-toggle", (indexs) => {
				this.collapsed = indexs
			});
		},
		computed:{
			treeNodeList:function(){
				return this.$store.getters.TTreeNode
			}
		}
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
