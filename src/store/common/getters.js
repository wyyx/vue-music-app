export const GETTER_TYPES = {
	disc: 'disc',
	topList: 'topList',
	sampleList: 'sampleList',
	searchHistory: 'searchHistory'
}

export default {
	[GETTER_TYPES.disc](state) {
		return state.disc
	},
	[GETTER_TYPES.topList](state) {
		return state.topList
	},
	[GETTER_TYPES.sampleList](state) {
		return state.sampleList
	},
	[GETTER_TYPES.searchHistory](state) {
		return state.searchHistory
	}
}
