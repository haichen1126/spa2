<template>
  <!--待初审-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">债卷转让-正在转让
      </el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <!--<el-form-item label="标题" >-->
      <!--<el-input v-model="queryForm.siName" placeholder="标题"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="转让者">-->
      <!--<el-input v-model="queryForm.siId" placeholder="货款号">-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="用户名">-->
      <!--<el-input v-model="queryForm.suUsername" placeholder="用户名">-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="标种">-->
      <!--<el-select v-model="queryForm.bsType"  placeholder="请选择">-->
      <!--<el-option label="抵押标" value="抵押标"></el-option>-->
      <!--<el-option label="无押标" value="无押标"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <!--<el-button type="primary" size="medium" icon="el-icon-search" @click="doForFirstTrialelist(null)">查询</el-button>-->
        <!--<el-button type="primary" size="medium" icon="el-icon-search" @click="doreset">重置</el-button>-->
        <el-button  @click="exportExcel" type="primary" size="medium" icon="el-icon-s-unfold
">导出</el-button>
      </el-form-item>
    </el-form>
    <!--<el-table-->
    <!--class="table"-->
    <!--:data="tableData"-->
    <!--border-->
    <!--style="width: 100%">-->
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="sUews.suUsername" label="转让者" width="100">

      </el-table-column>
      <el-table-column prop="sIssue.siName" label="投标标题" width="100">

      </el-table-column>
      <el-table-column prop="sIssue.siProfit" label="利率" width="100">

      </el-table-column>
      <el-table-column prop="kkkk"  label="代收期数" width="100">

      </el-table-column>
      <el-table-column prop="tmoMakeOver" label="转让期数" width="100">

      </el-table-column>
      <el-table-column prop="tRepayment.trPeriods"  label="总期数" width="100">

      </el-table-column>
      <el-table-column prop="kk" label="代收本金" width="100">

      </el-table-column>
      <el-table-column prop="tRepayment.trInterest" label="代收利息" width="120">

      </el-table-column>
      <el-table-column prop="tmoPrice" label="转让价格" width="100">

      </el-table-column>
      <el-table-column prop="tmoDatetime" :formatter="timestampToTime" label="提交时间" width="150">

      </el-table-column>
      <el-table-column prop="tmoState" label="状态" width="90">

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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        tableData: [],
        queryForm: {
          sidate: null,
          siName: null,
          siId: null,
          suUsername: null,
          bsType: null,
          title: null,
          siPrepare: null,
          siSubmit: null,
          page: 1,
          rows: 5,
          total: 0
        }
      }
    },
    methods: {
      timestampToTime(row, column) {
        var date = new Date(row.tmoDatetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      exportExcel () {
        // 设置当前日期
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let name = year + '' + month + '' + day
        // console.log(name)
        /* generate workbook object from table */
        //  .table要导出的是哪一个表格
        var wb = XLSX.utils.table_to_book(document.querySelector('.table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          //  name+'.xlsx'表示导出的excel表格名字
          FileSaver.saveAs(
            new Blob([wbout], {type: 'application/octet-stream'}),
            name + '.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
          return wbout
        }
      },
      doForFirstTrialelist: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        var url = this.axios.urls['YFY_TMakeOver2'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
          console.log(this.tableData)

          // console.log(tableData.get(tmoPrice))
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
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
