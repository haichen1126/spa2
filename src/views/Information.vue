<template>
  <!--投资信息-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">投资信息</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="标题" >
        <el-input v-model="queryForm.siName" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="货款号">
        <el-input v-model="queryForm.siId" placeholder="货款号">
        </el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="queryForm.suUsername" placeholder="用户名">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doForFirstTrialelist(null)">查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doreset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="suUserId" label="投资ID" width="120">

      </el-table-column>
      <el-table-column prop="suUsername" label="投资人" width="180">

      </el-table-column>
      <el-table-column :formatter="Datetime" label="投资时间" width="180">

      </el-table-column>
      <el-table-column :formatter="state" label="投资状态" width="180">

      </el-table-column>
      <el-table-column prop="tInvestment.tiReason" label="投资理由" width="180">

      </el-table-column>
<!--      <el-table-column prop="sIssue.siName" label="标题" width="120">-->

<!--      </el-table-column>-->
      <el-table-column prop="tInvestment.tiSiId" label="贷款号" width="180">

      </el-table-column>
      <el-table-column prop="tInvestment.tiMoney" label="借款金额" width="180">

      </el-table-column>
    </el-table>
    <div class="block"  style="padding-top: 20px;text-align: right;">
      <span class="demonstration" ></span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryForm.page"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="5"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="queryForm.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition:'right',
        tableData: [],
        queryForm: {
          siName:'',
          suUsername:'',
          siId:'',
          quantity:0,
          page: 1,
          rows:10,
          total: 0
        },

      }
    },
    methods: {
      doForFirstTrialelist: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        // this.queryForm.siState=null;
        // this.queryForm.quantity=0;
        var url = this.axios.urls['YHJ_Information'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
          console.log(this.tableData.length)
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.queryForm.rows=val;
        this.queryForm.page = 1;
        this.doForFirstTrialelist("a");
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.queryForm.page = val;
        this.doForFirstTrialelist("a");
      },
      doreset(){
        this.queryForm.siId=null;
        this.queryForm.suUsername=null;
        this.queryForm.siName=null;
        this.doForFirstTrialelist(null)
      },
      state(row, column){
        if(row.sIssue.siAudit==0){
            return '审核中';
        }else if(row.sIssue.siAudit==1){
          return '失败';
        }else if(row.sIssue.siAudit==2){
          return '成功';
        }
      },
      Datetime(row, column){
        var date = new Date(row.tInvestment.tiDatetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    created: function () {
      this.doForFirstTrialelist();
    }
  }
</script>

<style scoped>

</style>
