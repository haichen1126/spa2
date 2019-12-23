<template>
  <!--满标审核成功-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">满标审核成功</el-breadcrumb-item>
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
      <el-form-item label="标种">
        <el-select v-model="queryForm.bsType"  placeholder="请选择">
          <el-option label="抵押标" value="抵押标"></el-option>
          <el-option label="免押标" value="免押标"></el-option>
          <el-option label="信用标" value="信用标"></el-option>
          <el-option label="净值标" value="净值标"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doForFirstTrialelist(null)">查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doreset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="siId" label="贷款号" width="120">

      </el-table-column>
      <el-table-column prop="sUews.suUserId" label="借款ID" width="120">

      </el-table-column>
      <el-table-column prop="sUews.suUsername" label="用户名称" width="120">

      </el-table-column>
      <el-table-column prop="siName" label="借款标题" width="120">

      </el-table-column>
      <el-table-column prop="siMoney" label="借款金额" width="120">

      </el-table-column>
      <el-table-column prop="siMoney" label="已借金额" width="120">

      </el-table-column>
      <el-table-column prop="bSign.bsProfit" label="利润(%)" width="120">

      </el-table-column>
      <el-table-column prop="siDeadline" label="借款期限(天)" width="120">

      </el-table-column>
      <el-table-column prop="bSign.bsType" label="借款类型" width="120">

      </el-table-column>
      <el-table-column prop="tWay.twName" label="还款方式" width="120">

      </el-table-column>
      <el-table-column prop="siSubmit" label="提交时间" width="180">

      </el-table-column>
      <el-table-column :formatter="State1" label="状态" width="120">

      </el-table-column>
      <el-table-column :formatter="date1" label="筹标到期时间" width="180">

      </el-table-column>
      <el-table-column prop="quantity" label="投标次数" width="180">

      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handle(scope.$index, scope.row,1)">查看</el-button>
        </template>
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
<!--    编辑-->
    <el-dialog style="font-size: 20px;width:1400px" :title="edit.titles" :visible.sync="dialogMergeFormVisible">
      <el-form :label-position="labelPosition" label-width="80px"   status-icon :inline="true" status-icon :model="SIssue" class="demo-form-inline">
        <el-form-item label="贷款号" >
          <el-input placeholder="贷款号":disabled="assge" v-model="SIssue.siId"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" >
          <el-input placeholder="用户名称"  :disabled="assge" v-model="SIssue.suUsername"></el-input>
        </el-form-item>
        <el-form-item label="借款标题">
          <el-input placeholder="借款标题":disabled="assge" v-model="SIssue.siName"></el-input>
        </el-form-item>
        <el-form-item label="借款金额">
          <el-input  placeholder="借款金额" :disabled="assge" v-model="SIssue.siMoney"></el-input>
        </el-form-item>
        <el-form-item label="利率">
          <el-input placeholder="利率"  :disabled="assge" v-model="SIssue.bsProfit"></el-input>
        </el-form-item>
        <el-form-item label="借款期限">
          <el-input placeholder="借款期限" :disabled="assge" v-model.number="SIssue.siDescribe"></el-input>
        </el-form-item>
        <el-form-item label="借款类型">
          <el-input placeholder="借款类型" :disabled="assge" v-model="SIssue.bsType"></el-input>
        </el-form-item>
        <el-form-item label="还款方式">
          <el-input placeholder="还款方式"  :disabled="assge" v-model="SIssue.twName"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input placeholder="提交时间" :disabled="assge" v-model="SIssue.siSubmit"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input placeholder="状态" v-if="siState1"  :disabled="assge" v-model="SIssue.siAudit"></el-input>
        </el-form-item>
        <el-form-item label="管理备注">
          <el-input type="textarea" placeholder="管理备注" v-model="SIssue.siAdministration"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMergeFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition:'right',
        edit:{
          titles:'查看'
        },
        tableData: [],
        dialogMergeFormVisible:false,
        assge:true,//不可编辑
        siState1:true,//状态隐藏
        siState2: false,//状态
        confirm:false,//查看时隐藏确定
        queryForm: {
          sidate: null,
          siName: null,
          siId: null,
          suUsername: null,
          bsType: null,
          title: null,
          siPrepare: null,
          siSubmit: null,
          siAudit:null,
          quantity:0,
          page: 1,
          rows: 5,
          total: 0
        },
        SIssue:{
          siId:'',
          suUsername:'',
          siName:'',
          siMoney:'',
          bsProfit:'',
          siDescribe:'',
          bsType:'',
          twName:'',
          siSubmit:'',
          siAudit:'',
          siAdministration:''
        }
      }
    },
    methods: {
      doForFirstTrialelist: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        // this.queryForm.siState=null;
        // this.queryForm.quantity=0;
        this.queryForm.siAudit=2;
        var url = this.axios.urls['YHJ_FirstTriale_listAll'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
        }).catch(function (error) {
          console.log(error);
        });
      },
      doupdate(){
        var url = this.axios.urls['YHJ_FirstTriale_update'];
        this.axios.post(url, this.SIssue).then((response) => {
          this.$message({
            message: response.data.message,
            type: 'success',
          });
          this.dialogMergeFormVisible=false;
          this.doForFirstTrialelist(null)
        }).catch(function (error) {
          console.log(error);
        });
      },
      doreset(){
          this.queryForm.siId=null;
        this.queryForm.suUsername=null;
        this.queryForm.siName=null;
          this.queryForm.bsType=null;
        this.doForFirstTrialelist(null)
      },
      // 绑定数据
      handle(index, row,a){
        this.SIssue.siId=row.siId;
        this.SIssue.suUsername=row.sUews.suUsername;
        this.SIssue.siName=row.siName;
        this.SIssue.siMoney=row.siMoney;
        this.SIssue.bsProfit=row.bSign.bsProfit;
        this.SIssue.siDescribe=row.siDescribe;
        this.SIssue.bsType=row.bSign.bsType;
        this.SIssue.twName=row.tWay.twName;
        this.SIssue.siSubmit=row.siSubmit;

        this.SIssue.siAdministration=row.siAdministration;
        this.dialogMergeFormVisible=true;
        if(a==1){
          this.handleEdit(index, row);
        }else{
          this.handleupdate(index, row);
        }
      },
      // 查看
      handleEdit(index, row) {
        this.edit.titles='查看';
        this.siState1=true;
        this.SIssue.siAudit='还款中';
      },
      date1: function (row,column) {
          return this.calcuDate(row.siSubmit, Number(row.siPrepare));
      },
      State1: function (row,column) {
        return '还款中';
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
      calcuDate: function (date, plusDays) {
        var dateArray = date.split("-");
        var year = Number(date.substr(0, 4));
        var month = Number(date.substr(5, 2))-1;
        var day = Number(date.substr(8, 2));
        var hourNum = Number(date.substr(11, 2));
        var minuteNum = Number(date.substr(14, 2));
        var secondNum = Number(date.substr(17, 2));
        var oriDay = day;
        var secondMonthDays = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
        while (plusDays > 0) {
          oriDay = day
          day += plusDays;
          switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
              if (day > 30) {
                plusDays -= (30 - oriDay) + 1;
                month++;
                day = 1;
              } else {
                plusDays = 0;
              }
              break;
            case 2:
              if (day > secondMonthDays) {
                plusDays -= (secondMonthDays - oriDay) + 1;
                month++;
                day = 1;
              } else {
                plusDays = 0;
              }
              break;
            default:
              if (day > 31) {
                plusDays -= (31 - oriDay) + 1;
                day = 1;
                month++;
              } else {
                plusDays = 0;
              }
          }
          if (month > 12) {
            month = 1;
            year++;
          }
        }
        var Y = year + '-';
        var M = (month + 1 < 10 ? '0' + (month + 1) : month + 1) + '-';
        var D = day + ' ';
        var h = hourNum + ':';
        var m = minuteNum + ':';
        var s = secondNum;
        return Y + M + D + h + m + s;
      },
    },
    created: function () {
      this.doForFirstTrialelist();
    }
  }
</script>

<style scoped>

</style>
