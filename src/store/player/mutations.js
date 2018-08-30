export const MUTATION_TYPES = {
	setPlayingState: 'setPlayingState',
	setFullScreen: 'setFullScreen',
	setPlaylist: 'setPlaylist',
	setSequenceList: 'setSequenceList',
	setPlayMode: 'setPlayMode',
	setCurrentIndex: 'setCurrentIndex'
}

export default {
	[MUTATION_TYPES.setPlayingState](state, payload) {
		state.playingState = payload
	},
	[MUTATION_TYPES.setFullScreen](state, payload) {
		state.fullScreen = payload
	},
	[MUTATION_TYPES.setPlaylist](state, payload) {
		state.playlist = payload
	},
	[MUTATION_TYPES.setSequenceList](state, payload) {
		state.sequenceList = payload
	},
	[MUTATION_TYPES.setPlayMode](state, payload) {
		state.playMode = payload
	},
	[MUTATION_TYPES.setCurrentIndex](state, payload) {
		state.currentIndex = payload
	}
}
