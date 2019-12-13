import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import AppMain from '@/views/AppMain'





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
					component: AppMain

					}
				]
			})
