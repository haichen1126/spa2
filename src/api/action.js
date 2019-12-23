/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	//服务器
	'SERVER': 'http://localhost:8080',
// yhj
  'YHJ_FirstTriale_listAll':'/yhj/FirstTrialelist',

  'YHJ_FirstTriale_update':'/yhj/updateFirstTrial',

  'YHJ_Information':'/HCSUews/Information',

// hs
  'SYS_TExpense_LISTALL':'/TExpense/hh',
  'SYS_TExpense_merge':'/TExpense/merge',
  'SYS_TExpense_DEL':'/TExpense/DEL',

  // fyf
  'YFY_TMakeOver': '/makeover/load',
  'YFY_TMakeOver2': '/makeover/load2',
  'YFY_TMakeOver3': '/makeover/load3',
  'YFY_TMakeOver4': '/makeover/load4',
  'YFY_Boverdu': '/boverdu/load',
  'YFY_Bwebsite':'/boverdu/load1',
  'YFY_Scurrent':'/scurrent/load',
  'YFY_Scurrentt':'/scurrent/load1',
  'YFY_Scurrenttt':'/scurrent/load11',
  'YFY_Scurrent_update':'/scurrent/update',
  'YFY_Scurrent_TL':'/scurrent/TL',


  //统计 hs
  'SYS_SIssue_LISTSTA':'/SIssue/Sta',
	// 	//菜单管理
	'SYS_TREENODE_LISTALL': '/TTreeNode/tt',

	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}
