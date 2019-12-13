export default {
	settTreeNode: function(context, payload) {
		let _this = payload._this;
		var url = _this.axios.urls['SYS_TREENODE_LISTALL']
		_this.axios.post(url, {}).then((response) => {
			var TTreeNode = response.data.result;
			context.commit('setTTreeNode', {
				TTreeNode: TTreeNode
			})
		}).catch(function(error) {
			console.log(error);
		});
	}
}
