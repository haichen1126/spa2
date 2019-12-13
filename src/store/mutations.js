export default {
	setResturantName: (state, payload) => {
		state.resturantName = payload.resturantName;
	},
	setusername: (state, payload) => {
		state.username = payload.username;
	},
	setuserid: (state, payload) => {
		state.userid = payload.userid;
	},
	setuserRoleId: (state, payload) => {
		state.usrRoleId = payload.usrRoleId;
	},
	setTTreeNode: (state, payload) => {
		state.TTreeNode = payload.TTreeNode;
	},

	clear: function(state) {
		for (let attrName in state) {
			state[attrName] = null
		}
	}
}
