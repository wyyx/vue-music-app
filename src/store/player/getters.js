export const GETTER_TYPES = {
	playingState: 'playingState',
	fullScreen: 'fullScreen',
	playlist: 'playlist',
	sequenceList: 'sequenceList',
	playMode: 'playMode',
	currentIndex: 'currentIndex',
	currentSong: 'currentSong'
}

export default {
	[GETTER_TYPES.playingState](state) {
		return state.playingState
	},
	[GETTER_TYPES.fullScreen](state) {
		return state.fullScreen
	},
	[GETTER_TYPES.playlist](state) {
		return state.playlist
	},
	[GETTER_TYPES.sequenceList](state) {
		return state.sequenceList
	},
	[GETTER_TYPES.playMode](state) {
		return state.playMode
	},
	[GETTER_TYPES.currentIndex](state) {
		return state.currentIndex
	},
	[GETTER_TYPES.currentSong](state) {
		return state.playlist[state.currentIndex]
	}
}
