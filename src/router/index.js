import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import AppMain from '@/views/AppMain'
// yhj
import ForFirstTrialelist from '@/views/ForFirstTrialelist'
import BeBeingBorrowlist from '@/views/BeBeingBorrowlist'
import DefeatedBorrowlist from '@/views/DefeatedBorrowlist'
import HaveExpiredlist from '@/views/HaveExpiredlist'
import FailureOfBidlist from '@/views/FailureOfBidlist.vue'
import Withdrawlist from '@/views/Withdrawlist'
import ForScalelist from '@/views/ForScalelist'
import ScalelistDefeated from '@/views/ScalelistDefeated'
import ScaleSucceedlist from '@/views/ScaleSucceedlist'
import ScalelistFinish from '@/views/ScalelistFinish'
import ScalelistAdvance from '@/views/ScalelistAdvance'
import TExpense from '@/views/TExpense'
import Information from '@/views/Information'
// fyf
import TMakeOver from '@/views/TMakeOver'
import TMakeOver2 from '@/views/TMakeOver2'
import TMakeOver3 from '@/views/TMakeOver3'
import TMakeOver4 from '@/views/TMakeOver4'
import Boverdu from '@/views/Boverdu'
import Bwebsite from '@/views/Bwebsite'
import Scurrent from '@/views/Scurrent'
import Scurrent_jilu from '@/views/Scurrent_jilu'
// hs
import statistics from '@/views/statistics'








Vue.use(Router)

export default new Router({
			routes: [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
				{
					path: '/AppMain',
					name: 'AppMain',
					component: AppMain,
          children:[{
            path:'ForFirstTrialelist',
            name:'ForFirstTrialelist',
            component:ForFirstTrialelist
          },{
            path:'BeBeingBorrowlist',
            name:'BeBeingBorrowlist',
            component:BeBeingBorrowlist
          },{
            path:'DefeatedBorrowlist',
            name:'DefeatedBorrowlist',
            component:DefeatedBorrowlist
          },{
            path:'HaveExpiredlist',
            name:'HaveExpiredlist',
            component:HaveExpiredlist
          },{
            path:'FailureOfBidlist',
            name:'FailureOfBidlist',
            component:FailureOfBidlist
          },{
            path:'Withdrawlist',
            name:'Withdrawlist',
            component:Withdrawlist
          },{
            path:'ForScalelist',
            name:'ForScalelist',
            component:ForScalelist
          },{
            path:'ScalelistDefeated',
            name:'ScalelistDefeated',
            component:ScalelistDefeated
          },{
            path:'ScaleSucceedlist',
            name:'ScaleSucceedlist',
            component:ScaleSucceedlist
          },{
            path:'ScalelistFinish',
            name:'ScalelistFinish',
            component:ScalelistFinish
          },{
            path:'ScalelistAdvance',
            name:'ScalelistAdvance',
            component:ScalelistAdvance
          },{
            path:'TExpense',
            name:'TExpense',
            component:TExpense
          },{
            path:'Information',
            name:'Information',
            component:Information
          },{
              path :'TMakeOver',
              name :'TMakeOver',
              component : TMakeOver
            }
            ,{
              path :'TMakeOver2',
              name :'TMakeOver2',
              component : TMakeOver2
            }
            ,{
              path :'TMakeOver3',
              name :'TMakeOver3',
              component : TMakeOver3
            }
            ,{
              path :'TMakeOver4',
              name :'TMakeOver4',
              component : TMakeOver4
            }
            ,{
              path :'Boverdu',
              name :'Boverdu',
              component : Boverdu
            }
            ,{
              path :'Bwebsite',
              name :'Bwebsite',
              component : Bwebsite
            }
            ,{
              path :'Scurrent',
              name :'Scurrent',
              component : Scurrent
            }
            ,{
              path :'Scurrent_jilu',
              name :'Scurrent_jilu',
              component : Scurrent_jilu
            },{
              path :'statistics',
              name :'statistics',
              component : statistics
            }]
					}
				]
			})
