export const GETTERS_TYPES = {
	playing: 'playing',
	fullScreen: 'fullScreen',
	playlist: 'playlist',
	sequenceList: 'sequenceList',
	mode: 'mode',
	currentIndex: 'currentIndex',
	currentSong: 'currentSong'
}

export default {
	[GETTERS_TYPES.playing](state) {
		return state.singer
	},
	[GETTERS_TYPES.fullScreen](state) {
		return state.singer
	},
	[GETTERS_TYPES.playlist](state) {
		return state.singer
	},
	[GETTERS_TYPES.sequenceList](state) {
		return state.singer
	},
	[GETTERS_TYPES.mode](state) {
		return state.singer
	},
	[GETTERS_TYPES.currentIndex](state) {
		return state.singer
	},
	[GETTERS_TYPES.currentSong](state) {
		return state.playlist[state.currentIndex]
	}
}
