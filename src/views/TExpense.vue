<template>
	<div>
		<!--搜索-->
		<el-form :inline="boolean" :model="queryform" class="ruleForm2-search">



  <div align="right">
      <el-button  @click="doMergeForm1" type="primary">添加借款费用</el-button>
  </div>

		</el-form>


		<!-- 数据表格 -->
		<el-table :data="tableData" style="width: 100%" max-height="600px">
			<el-table-column label="ID" width="180" prop="teId">
				<template slot-scope="">
					<!-- 	<i class="el-icon-time"></i>
				<span style="margin-left: 10px"></span> -->
				</template>
			</el-table-column>
			<el-table-column label="名称" width="180" prop="teName">

			</el-table-column>
			<el-table-column label="状态" width="180" prop="teState">

			</el-table-column>
			<el-table-column label="扣费金额" width="180" prop="teDeduction">

			</el-table-column>


			<!-- 操作 -->
			<el-table-column label="操作">
				<template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="success" @click="doEdit(scope.row)"></el-button>
					<el-button size="mini" icon="el-icon-delete" type="danger" @click="FormDelete(scope.row)"></el-button>

				</template>
			</el-table-column>

		</el-table>
		<div class="black" style="padding-top: 20px ; text-align: center;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryform.page"
			 :page-sizes="[5, 10, 20, 40]" :page-size="queryform.rows" layout="total, sizes, prev, pager, next, jumper" :total="queryform.total">
			</el-pagination>
		</div>

		<el-dialog  :visible.sync="ss" label-width="80px" @closed="FromClose">
			<el-form :inline="boolean" :model="mergeform" :rules="rules" ref="Form1">


				<el-form-item label="名称" :label-width="formLabelWidth" prop="teName">
					<el-input style="width: 300px;" v-model="mergeform.teName" autocomplete="off"></el-input>
				</el-form-item>
				<br />
        <el-form-item label="状态" :label-width="formLabelWidth" prop="teState">
          <el-select  style="width: 300px;"  v-model="mergeform.teState" autocomplete="off" >
            <el-option label="不开" value="不开"></el-option>
            <el-option label="开启" value="开启"></el-option>

          </el-select>
        </el-form-item>
        <br />
				<el-form-item label="扣费金额" :label-width="formLabelWidth" prop="teDeduction">
					<el-input style="width: 300px;"  v-model="mergeform.teDeduction" autocomplete="off"></el-input>
				</el-form-item>
				<br />




			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="ss = false">取 消</el-button>
				<el-button type="primary" @click="doMergeForm">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>


<script>
	export default {
		data: function() {
			return {
				boolean: true,

				value: '',
				value1: '',


				queryform: {
          teId: null,
          teName: null,
          teState: null,
          teDeduction: null,
					page: 1,
					rows: 5,
					total: 0,


				},
				ss:false,



				tableData: [],
				dialogmergeFormVisible: false,

				formLabelWidth: '80px',
				mergeform: {

          teId: null,
          teName: null,
          teState: null,
          teDeduction: null


				},
				rules: {




					svrcreateby: [{
							required: true,
							message: '请输入创建人名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '长度在 1 到 10 个字符',
							trigger: 'blur'
						}
					],
					svrdueto: [{
							required: true,
							message: '请输入分配名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '长度在 1 到 2 个字符',
							trigger: 'blur'
						}
					]

				}
			}

		},
		methods: {
			doSearch: function() {
			  console.log("6+++++++++++++++++++++++++")
				var url = this.axios.urls['SYS_TExpense_LISTALL']
				this.axios.post(url, this.queryform).then((response) => {
					/* for( let a in response.data.result.s){
						console.log(a)
							var item ={"a":a}
							this.tableData.push(item)
					} */
					//console.log(this.tableData)
          console.log("++++++++++++++++++++++++")
					this.tableData = response.data.result;
            // this.tableData.svrtype;
					console.log(this.tableData);
					this.queryform.page = response.data.page;
					this.queryform.rows = response.data.rows;
					this.queryform.total = response.data.total;
				}).catch(function(error) {
					console.log(error);
				});

			},

			xxx() {
				var url = this.axios.urls['SYS_TExpense_LISTALL']
				console.log(this.queryform.svrcreateDate)
				if(this.queryform.svrcreateDate==null){
					this.doSearch()
				}else{


				this.axios.post(url, this.queryform).then((response) => {
					// console.log(response.data.result.length)
					// console.log(this.queryform.svrcreateDate[0])
					// console.log(response.data.result)
					this.tableData = []
					let date1 = new Date(this.queryform.svrcreateDate[0]).getTime()
					let date2 = new Date(this.queryform.svrcreateDate[1]).getTime()
					// console.log(this.queryform.svrcreateDate[0])
					// console.log(date1)
					for (var i = 0; i < response.data.result.length; i++) {
						if (date1 < response.data.result[i].svrcreateDate && date2 > response.data.result[i].svrcreateDate) {
							this.tableData.push(response.data.result[i])
						}
					}

					this.queryform.page = response.data.page;
					this.queryform.rows = response.data.rows;
					this.queryform.total = response.data.total;


				}).catch(function(error) {
					console.log(error);
				});
}
			},
			msToDate: function(msec) {
				let datetime = new Date(msec);
				let year = datetime.getFullYear();
				let month = datetime.getMonth();
				let date = datetime.getDate();
				let hour = datetime.getHours();
				let minute = datetime.getMinutes();
				let second = datetime.getSeconds();

				let result1 = year +
					'-' +
					((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
					'-' +
					((date + 1) < 10 ? '0' + date : date) +
					' ' +
					((hour + 1) < 10 ? '0' + hour : hour) +
					':' +
					((minute + 1) < 10 ? '0' + minute : minute) +
					':' +
					((second + 1) < 10 ? '0' + second : second);

				let result2 = year +
					'-' +
					((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
					'-' +
					((date + 1) < 10 ? '0' + date : date);

				let result = {
					hasTime: result1,
					withoutTime: result2
				};

				return result;
			},
			dateFormatter(row, column) {
				let datetime = row.svrcreateDate;
				if (datetime) {
					datetime = new Date(datetime);
					let f = datetime.toLocaleDateString()

					return f;
				}
			},


			handleSizeChange(val) {
				console.log('handleSizeChange,%s', val);
				this.queryform.rows = val;
				this.queryform.page = 1;
				this.doSearch();
			},
			handleCurrentChange(val) {
				console.log('handleCurrentChange,%s', val);
				this.queryform.page = val;
				this.doSearch();
			},
			doEdit: function(row) {
				if (row.teName != '') {

					this.mergeform.teId=row.teId;
					this.mergeform.teName=row.teName;
					this.mergeform.teDeduction=row.teDeduction;
					this.mergeform.teState=row.teState;


					// this.mergeform.svrcreateDate = this.msToDate(row.svrcreateDate).hasTime;
					// this.mergeform.svrduedate = this.mergeform.svrduedate = this.msToDate(new Date()).hasTime;

					// this.mergeform.svrdealby = '胡爽';
					// this.mergeform.svrdeal = row.svrdeal;

					this.ss = true;
				}
			},
			FormDelete: function(row) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = this.axios.urls['SYS_TExpense_DEL'];
					this.axios.post(url, {
						teId: row.teId
					}).then((response) => {
						this.$message({
							message: response.data.message,
							type: 'success'

						});
						this.doSearch();
						this.ss = false;

					}).catch(function(error) {
						console.log(error);
					});

					// }).catch(() => {
					// 	this.$message({
					// 		type: 'info',
					// 		message: '已取消删除'
					// 	});
				});
			},
			doMergeForm: function() {

				console.log("doMergeForm.....");
				// this.$refs['Form1'].validate((valid) => {
				// 	if (false == valid) {
				// 		return false;
				// 	}
        console.log(this.mergeform);
					var url = this.axios.urls['SYS_TExpense_merge']
					this.axios.post(url, this.mergeform).then((response) => {
					  console.log(this.mergeform)
							this.$message({
								message: response.data.message,
								type: 'success'
							});
							// if (!this.mergeform.teId) {
							// 	this.doClearMergeForm();
              //
							// }
            this.doClearMergeForm();
							this.doSearch();


					}).catch(function(error) {
						console.log(error);
					});
        this.ss = false;
				// });
			},
      doMergeForm1(){
			  this.ss=true;
      },
			doClearMergeForm: function() {
				this.mergeform.teId=null;
				this.mergeform.teName=null;
				this.mergeform.teState=null;
				this.mergeform.teDeduction=null;
			},
			FromClose: function() {
				// this.$refs['Form1'].resetFields();
				// this.doClearMergeForm();
			},
			AddRoleId: function(){
				return this.$store.getters.RoleId;
			}


		},

		created: function() {
				this.doSearch();
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
