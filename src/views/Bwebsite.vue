<template>
  <!--待初审-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">网站垫付</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="借款标题" >
        <el-input v-model="queryForm.siName" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="借款人">
        <el-input v-model="queryForm.suUsername" placeholder="请输入账号">
        </el-input>
      </el-form-item>

      <el-form-item label="标种">
        <el-select v-model="queryForm.bsName"  placeholder="请选择">
          <el-option label="快乐标" value="快乐标"></el-option>
          <el-option label="悲伤标" value="悲伤标"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doForFirstTrialelist(null)">查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doreset">重置</el-button>
        <!--<el-button  @click="exportExcel" type="primary" size="medium" icon="el-icon-s-unfold-->
        <!--">导出</el-button>-->
      </el-form-item>
      <el-form-item label="应还时间">
        <el-date-picker
          v-model="queryForm.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

    </el-form>
    <!--<el-table-->
    <!--class="table"-->
    <!--:data="tableData"-->
    <!--border-->
    <!--style="width: 100%">-->
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="sIssue.siBorrow" label="贷款号" width="80">

      </el-table-column>
      <el-table-column prop="sUews.suUsername" label="借款人" width="80">

      </el-table-column>
      <el-table-column prop="sIssue.siName" label="借款标题" width="80">

      </el-table-column>
      <el-table-column prop="bSign.bsType"  label="标种类型" width="80">

      </el-table-column>
      <el-table-column prop="sIssue.siDeadline"  label="借款期限" width="80">

      </el-table-column>
      <el-table-column prop="boDatetime" :formatter="timestampToTime" label="应还时间" width="150">

      </el-table-column>
      <el-table-column prop="boShould" label="应还本息" width="100">

      </el-table-column>
      <el-table-column prop="boDay" label="逾期天数" width="120">

      </el-table-column>
      <el-table-column  prop="bWebsite.bwMoney"   label="垫付金额" width="120">

      </el-table-column>
      <el-table-column prop="bWebsite.bwDatetime"  :formatter="timestampToTimee" label="垫付时间" width="150">


      </el-table-column>
      <el-table-column prop="sIssue.siId" label="借款信息ID" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary"   @click="handleEdit(scope.$index,scope.row)">垫付查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="网站垫付" :visible.sync="dialogFormVisible">
      <el-form :model="form" >
        <el-form-item label="借款人" :label-width="formLabelWidth">
          <el-input  v-model="form.name"  autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="借款标题" :label-width="formLabelWidth" >
          <el-input v-model="form.siName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input  v-model="form.bsType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应还时间" :label-width="formLabelWidth">
          <el-input  v-model="form.boDatetime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应还金额" :label-width="formLabelWidth">
          <el-input  v-model="form.boShould" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数" :label-width="formLabelWidth">
          <el-input  v-model="form.boDay" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input  v-model="form.h" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="垫付金额" :label-width="formLabelWidth">
          <el-input  v-model="form.bwMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
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
        tableData: [],
        queryForm: {
          bsName:null,
          time:null,
          boShould:null,
          bwState:null,
          SiName:null,
          sidate: null,
          siId: null,
          max :null,
          min : null,
          suUsername: null,
          bsType: null,
          title: null,
          siPrepare: null,
          siSubmit: null,
          page: 1,
          rows: 5,
          total: 0,
        },

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: '',
        a:false,
        value1: '',
        dialogFormVisible: false,
        form: {
          bwMoney:'',
          siName:'',
          bsType:'',
          boDatetime:'',
          boShould:'',
          boDay:'',
          h:'未垫付',
          bwState:'',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      timestampToTime(row, column) {
        var date = new Date(row.boDatetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      timestampToTimee(row, column) {
        var date = new Date(row.bWebsite.bwDatetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      handleEdit(index,row){
        console.log(index,row),
          this.dialogFormVisible = true,
          this.form.name=row.sUews.suUsername,
          this.form.siName=row.sIssue.siName,
          this.form.bsType=row.bSign.bsType,
          this.form.boDatetime=row.boDatetime,
          this.form.boDay=row.boDay,
          this.form.bwState=row.bWebsite.bwState,
          this.form.boShould=row.boShould,
          this.form.bwMoney=row.bWebsite.bwMoney
      },
      getgTime(k){
        var date = new Date(k) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      doForFirstTrialelist: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        if(this.queryForm.time!=null&&this.queryForm.time.length>0){
          this.queryForm.min=this.getgTime(this.queryForm.time[0].getTime()),
            this.queryForm.max=this.getgTime(this.queryForm.time[1].getTime())
        }
        var url = this.axios.urls['YFY_Bwebsite'];
        this.axios.post(url, this.queryForm).then((response) => {

          this.tableData = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
          this.queryForm.time=null
          this.queryForm.max=null
          this.queryForm.min=null
          console.log(this.queryForm.total+"====")
        }).catch(function (error) {
          console.log(error);
        });
      },
      formatter(row,column){
        console.log(row.bWebsite.bwState)
        this.a=row.bWebsite.bwState==1?true:false
        return row.bWebsite.bwState;
      },
      doreset(){
        this.queryForm.siId=null;
        this.queryForm.suUsername=null;
        this.queryForm.siName=null;
        this.queryForm.bsType=null;
        this.doForFirstTrialelist(null)
      },
      handleEdi(index) {
        console.log(index);
        console.log("123")
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      date1: function (row,column) {
        return this.calcuDate(row.siSubmit, Number(row.siPrepare));
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
