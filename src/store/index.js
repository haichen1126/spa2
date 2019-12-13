import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import actions from '@/store/actions'
import state from '@/store/state'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import createPersistedState from "vuex-persistedstate"

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})]
})

export default store
