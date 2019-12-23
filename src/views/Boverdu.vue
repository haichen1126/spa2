<template>
  <!--待初审-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">逾期借款</el-breadcrumb-item>
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
        <el-select v-model="queryForm.bsName" clearable placeholder="请选择">
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

    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="sIssue.siBorrow" label="贷款号" width="100">

      </el-table-column>
      <el-table-column prop="sUews.suUsername" label="借款人" width="100">

      </el-table-column>
      <el-table-column prop="sIssue.siName" label="借款标题" width="100">

      </el-table-column>
      <el-table-column prop="bSign.bsName"  label="标种类型" width="100">

      </el-table-column>
      <el-table-column prop="sIssue.siDeadline" label="借款期限" width="100">

      </el-table-column>
      <el-table-column prop="boDatetime" :formatter="timestampToTime"  label="应还时间" width="150">

      </el-table-column>
      <el-table-column prop="boShould" label="应还本息" width="100">

      </el-table-column>
      <el-table-column prop="boDay" label="逾期天数" width="120">

      </el-table-column>
      <!--<el-table-column prop="bWebsite.bwState" label="网站是否垫付" width="120">-->

      <!--</el-table-column>-->
      <el-table-column prop="boState" label="状态" width="90">


      </el-table-column>
      <el-table-column prop="bsRecently" :formatter="timestampToTimee" label="最近还款时间" width="150">
      </el-table-column>
      <!--<el-table-column label="操作" width="200">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
      <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
        tableData: [],
        queryForm: {
          time:null,
          bsName:null,
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
          total: 0
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
        time: ''
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
        var date = new Date(row.bsRecently) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
        var url = this.axios.urls['YFY_Boverdu'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
          console.log(this.tableData)
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
      doreset(){
        this.queryForm.siId=null;
        this.queryForm.suUsername=null;
        this.queryForm.siName=null;
        this.queryForm.bsType=null;
        this.doForFirstTrialelist(null)
      },
      handleEdit(index, row) {
        console.log(index, row);
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
      getgTime(k){
        var date = new Date(k) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      }
      ,
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
