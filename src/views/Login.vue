<template>
	<div>
		<div class="login-container">
			<el-form label-width="0px" class="demo-ruleForm login-page">
				<h3 class="title">用户登录</h3>
				<el-form-item prop="usrName">
					<el-input type="text" auto-complete="off" v-model="ruleForm2.usrName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="usrPassword">
					<el-input type="password" auto-complete="off" v-model="ruleForm2.usrPassword" placeholder="密码"></el-input>
				</el-form-item>
				<el-checkbox class="rememberme">记住密码</el-checkbox>
				<el-form-item style="width:100%;">
					<el-button type="primary" style="width:100%;" @click="doLogin">登录</el-button>
				</el-form-item>
				<el-form-item style="text-align:center ;">
					<div>
						<el-link :underline="false" type="primary" @click="toRog">快速注册</el-link>&nbsp;&nbsp;<el-link :underline="false"
						 type="primary">找回密码</el-link>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Logion',
		data() {
			return {
				ruleForm2: {
					usrName: "",
					usrPassword: "",
				},
				tableData: []
			}
		},
		methods: {
			doLogin: function() {

				// 				   axios.get(url, {//注意数据是保存到json对象的params属性
				//         params: this.ruleForm2
				//       }).then(function (response) {
				//         console.log(response);
				//       }).catch(function (error) {
				//         console.log(error);
				//       });
        //
				// 		   axios.post(url,this.ruleForm2).then(function (response) {
				//         console.log(response);
				//       }).catch(function (error) {
				//         console.log(error);
				//       });
				// var url = this.axios.urls['SYS_USER_DOLOGIN']
				// this.axios.post(url, this.ruleForm2).then((response) => {
				// 	if (response.data.code === -1) {
				// 		this.$message.error(response.data.message);
				// 	} else {
				// 		this.tableData=response.data.result;
				// 		this.$message({
				// 			message: response.data.message,
				// 			type: 'success',
        //
				// 		});
				// 		this.$store.commit('setusername', {
				// 			username: this.ruleForm2.usrName
				// 		})
        //
				// 		this.$store.commit('setuserid', {
				// 			userid: this.tableData[0].usrId
				// 		})
				// 		this.$store.commit('setuserRoleId', {
				// 			usrRoleId: this.tableData[0].usrRoleId
				// 		})
				// 		if (this.$store.getters.TTreeNode || this.$store.getters.TTreeNode === null) {
				//
							this.$store.dispatch('settTreeNode', {
								_this: this
							}).then((response) => {
								this.$router.push({
									path: '/AppMain'
								})
							}).catch(function(error) {
								console.log(error);
							});
				// 		}
        //
				// 	}
				// }).catch(function(error) {
				// 	console.log(error);
				// });




			},
			toRog: function() {
				this.$router.push({
					path: '/Reg'
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-container {
		width: 100%;
		height: 100%;
	}

	.login-page {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
	}

	label.el-checkbox.rememberme {
		margin: 0px 0px 15px;
		text-align: left;
	}
</style>
