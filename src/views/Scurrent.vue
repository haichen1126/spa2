<template>
  <!--待初审-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 20px;">额度列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-form :inline="true" :model="queryForm" class="demo-form-inline" >

      <el-form-item label="用户名" >
        <el-input v-model="queryForm.suUsername" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doForFirstTrialelistt(null)">查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="doreset">重置</el-button>
        <!--<el-button  @click="exportExcel" type="primary" size="medium" icon="el-icon-s-unfold-->
        <!--">导出</el-button>-->
      </el-form-item>
      <template>
        <el-checkbox-group v-model="checkList" >
          <el-checkbox  @change="checkedAllFun" label="信用额度"></el-checkbox>
          <el-checkbox  @change="checkedAllFun" label="抵押额度"></el-checkbox>
        </el-checkbox-group>
      </template>

    </el-form>

    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="suUsername" label="用户名" width="100">

      </el-table-column>
      <el-table-column prop="sUserInformation.suiRealName" label="真实姓名" width="100">

      </el-table-column>

      <el-table-column prop="sUserInformation.suiRental" label="账户总额" width="100">

      </el-table-column>
      <el-table-column  :formatter="formatter"  label="额度类型" width="100">

      </el-table-column>
      <!--<el-table-column v-show="true" prop="sProposer.spState"   label="额度类型" width="100">-->

      <!--</el-table-column>-->
      <el-table-column prop="sCurrent.scAtPresent" label="可用额度" width="100">

      </el-table-column>
      <el-table-column prop="sCurrent.scFreeze"  label="冻结额度" width="100">

      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">记录</el-button>
          <el-button v-show="gg"  @click="handleDeleta(scope.$index, scope.row)" size="mini" type="danger" >额度申请</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="额度申请" :visible.sync="dialogFormVisible">
      <el-form :model="formm" :data="tableDataa" >
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input  v-model="formm.suUsername"  autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" >
          <el-input v-model="formm.btName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请金额" :label-width="formLabelWidth">
          <el-input  v-model="formm.spProposer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请备注" :label-width="formLabelWidth">
          <el-input  v-model="formm.spUse" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="申请金额" :label-width="formLabelWidth">
          <el-input  v-model="formm.spId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="formm.spState" label="1">审核通过</el-radio>
            <el-radio v-model="formm.spState" label="2">审核不通过</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="通过金额" :label-width="formLabelWidth">
          <el-input  v-model="formm.spPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核备注" :label-width="formLabelWidth">
          <el-input  v-model="formm.spRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input v-model="formm.boDay"   autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update(null)">通 过</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="额度记录" :visible.sync="dialogTableVisible">
      <el-table :data="tableDataa" style="width: 100%" class="table">
        <el-table-column prop="tLimit.tlId" label="ID" width="100">

        </el-table-column>
        <el-table-column prop="suUsername" label="用户名" width="100">

        </el-table-column>

        <el-table-column prop="bYype.btName" label="类型" width="100">

        </el-table-column>
        <el-table-column prop="tLimit.tlState" label="操作" width="100">

        </el-table-column>
        <el-table-column prop="tLimit.tlMoney"  label="金额" width="100">

        </el-table-column>
        <el-table-column prop="tLimit.tlRemark"  label="备注" width="100">

        </el-table-column>
        <el-table-column  prop="tLimit.tlDatetime" :formatter="timestampToTime"  label="时间" width="150">

        </el-table-column>
      </el-table>
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
        checkList: ['抵押额度','信用额度'],
        tableData: [],
        tableDataa: [],
        gg:false,
        queryForm: {
          // tlDatetime:null,
          btName:'信用额度',
          TTT:'抵押额度',
          scBtId:null,
          scFreeze:null,
          scAtPresent:null,
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
        dialogTableVisible: false,
        dialogFormVisible:false,
        formm: {
          tlSuiId:null,
          scId:null,
          spId:null,
          spState:"1",
          spPass:null,
          suUsername:null,
          btName:null,
          spProposer:null,
          spUse:null,
          spRemark:null,
          boDay :null,
        },
        form: {
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
    methods: {update: function (a) {
        if (a == null) {
          this.dialogFormVisible=false
          this.queryForm.siId=null;
          this.queryForm.suUsername=null;
          this.queryForm.siName=null;
          this.queryForm.bsType=null;
          this.queryForm.page = 1;
        }
        var url = this.axios.urls['YFY_Scurrent_update'];
        this.axios.post(url, this.formm).then((response) => {
          this.tableDataa = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
          console.log(this.queryForm.total+"====")
          this.doForFirstTrialelistt(null)
        }).catch(function (error) {
          console.log(error);
        });
      },
      doForFirstTrialelistqq: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        var url = this.axios.urls['YFY_Scurrenttt'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableDataa = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
          console.log(this.queryForm.total+"====")
          this.queryForm.siId=null;
          this.queryForm.suUsername=null;
          this.queryForm.siName=null;
          this.queryForm.bsType=null;
          this.fyf(response.data.result)
        }).catch(function (error) {
          console.log(error);
        });
      },
      doForFirstTrialelistq: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        var url = this.axios.urls['YFY_Scurrentt'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableDataa = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
          console.log(this.queryForm.total+"====")
          this.queryForm.siId=null;
          this.queryForm.suUsername=null;
          this.queryForm.siName=null;
          this.queryForm.bsType=null;
        }).catch(function (error) {
          console.log(error);
        });
      },
      doForFirstTrialelist: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
        }
        var url = this.axios.urls['YFY_Scurrent'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
          this.queryForm.page = response.data.page;
          this.queryForm.rows = response.data.rows;
          this.queryForm.total = response.data.total;
          console.log(this.queryForm.total+"====")
        }).catch(function (error) {
          console.log(error);
        });
      }, doForFirstTrialelistt: function (a) {
        if (a == null) {
          this.queryForm.page = 1;
          this.queryForm.btName = null;
          this.queryForm.TTT = null;
        }
        console.log("ssfsfsfsfs")
        var url = this.axios.urls['YFY_Scurrent'];
        this.axios.post(url, this.queryForm).then((response) => {
          this.tableData = response.data.result;
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
        this.doForFirstTrialelistt(null)
      },// 全选
      checkedAllFun: function(e,checkList){
        if(this.checkList.length!=0){
          for(let i =0;i<this.checkList.length;i++) {
            if(i==0){
              console.log(this.checkList[i])
              this.queryForm.TTT=null
              this.queryForm.btName=this.checkList[i]
            }else{
              console.log(this.checkList[i])
              this.queryForm.TTT=this.checkList[i]
              console.log("122")
            }
          }
          this.doForFirstTrialelist(null)
        } else{
          console.log("211")
          this.queryForm.btName="pp"
          this.queryForm.TTT="pp"
          this.doForFirstTrialelist(null)
        }

      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        // console.log(row.suUsername)
        this.queryForm.suUsername=row.suUsername
        this.doForFirstTrialelistq(null)
        this.dialogTableVisible = true
      },
      handleDeleta(index, row) {
        this.queryForm.suUsername=row.suUsername
        this.queryForm.btName=row.bYype.btName
        this.formm.suUsername=row.suUsername
        this.formm.btName=row.bYype.btName
        this.dialogFormVisible = true
        this.doForFirstTrialelistqq(null)
        // this.formm.spPass=row.sProposer.spPass
      },
      fyf(row){
        console.log(row)
        console.log(row)
        this.formm.spPass=row[0].sProposer.spPass
        this.formm.spRemark=row[0].sProposer.spRemark
        this.formm.spUse=row[0].sProposer.spUse
        this.formm.spProposer=row[0].sProposer.spProposer
        this.formm.spId=row[0].sProposer.spId
        this.formm.scId=row[0].sCurrent.scId
        this.formm.tlSuiId=row[0].tLimit.tlSuiId
//       for(let i=0;i<row.length;i++){
// console.log(row[i]+"111111111")
//       }
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
      formatter(row,column){
        this.gg=row.sProposer.spState==1?true:false
        return row.bYype.btName;
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
      timestampToTime(row, column) {
        console.log(1)
        var date = new Date(row.tLimit.tlDatetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },

    },
    created: function () {
      this.doForFirstTrialelist();
    }
  }
</script>

<style scoped>

</style>
