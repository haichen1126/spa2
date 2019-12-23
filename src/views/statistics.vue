<template>
	<div>
		<!--搜索-->

      <!--搜索-->
      <el-form :inline="boolean" :model="queryform" class="ruleForm2-search">
        <el-form-item>
          <el-input size="small" v-model="queryform.suUserId" placeholder="贷款号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="queryform.suUsername" placeholder="用户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="queryform.siMoney" placeholder="借款金额"></el-input>
        </el-form-item>



        <el-form-item>
          <el-button  size="small" type="primary" icon="el-icon-search"  @click="doSearch">搜索</el-button>
        </el-form-item>
      </el-form>


		<!-- 数据表格 -->
		<el-table :data="tableData" style="width: 100%" max-height="600px">
			<el-table-column label="ID" width="180" prop="siId">
<!--				<template slot-scope="">-->
<!--					&lt;!&ndash; 	<i class="el-icon-time"></i>-->
<!--				<span style="margin-left: 10px"></span> &ndash;&gt;-->
<!--				</template>-->
			</el-table-column>
			<el-table-column label="贷款号" width="180" prop="sUews.suUserId">

			</el-table-column>
			<el-table-column label="用户" width="180" prop="sUews.suUsername">

      </el-table-column>
      <el-table-column label=" 借款金额" width="180" prop="siMoney">

      </el-table-column>
      <el-table-column label="服务费用" width="180" prop="proceDure">




			</el-table-column>


			<!-- 操作 -->


		</el-table>
		<div class="black" style="padding-top: 20px ; text-align: center;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryform.page"
			 :page-sizes="[10, 20, 30, 40]" :page-size="queryform.rows" layout="total, sizes, prev, pager, next, jumper" :total="queryform.total">
			</el-pagination>
		</div>



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


          siId: null,
          suUserId: null,
          suUsername: null,
          siMoney: null,
          bsProfit: null,
          proceDure: null,
					page: 1,
					rows: 10,
					total: 0,


				},
				ss:false,



				tableData: [],
				dialogmergeFormVisible: false,

				formLabelWidth: '80px',
				mergeform: {

          siId: null,
          suUserId: null,
          suUsername: null,
          siMoney: null,
          bsProfit: null,
          proceDure: null


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
				var url = this.axios.urls['SYS_SIssue_LISTSTA']
				this.axios.post(url,this.queryform).then((response) => {
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
				var url = this.axios.urls['SYS_SIssue_LISTSTA']
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
