export const MUTATION_TYPES = {
	setDisc: 'setDisc',
	setTopList: 'setTopList',
	setSampleList: 'setSampleList',
	setSearchHistory: 'setSearchHistory',
	removeAllSearchHistory: 'removeAllSearchHistory',
	setPlayHistory: 'setPlayHistory',
	setFavoriteList: 'setFavoriteList'
}

export default {
	[MUTATION_TYPES.setDisc](state, payload) {
		state.disc = payload
	},
	[MUTATION_TYPES.setTopList](state, payload) {
		state.topList = payload
	},
	[MUTATION_TYPES.setSampleList](state, payload) {
		state.sampleList = payload
	},
	[MUTATION_TYPES.setSearchHistory](state, payload) {
		state.searchHistory = payload
	},
	[MUTATION_TYPES.removeAllSearchHistory](state) {
		state.searchHistory = []
	},
	[MUTATION_TYPES.setPlayHistory](state, payload) {
		state.playHistory = payload
	},
	[MUTATION_TYPES.setFavoriteList](state, payload) {
		state.favoriteList = payload
	}
}
