export const GETTER_TYPES = {
	disc: 'disc',
	topList: 'topList',
	sampleList: 'sampleList',
	searchHistory: 'searchHistory',
	playHistory: 'playHistory',
	favoriteList: 'favoriteList'
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
	},
	[GETTER_TYPES.playHistory](state) {
		return state.playHistory
	},
	[GETTER_TYPES.favoriteList](state) {
		return state.favoriteList
	}
}
