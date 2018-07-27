export const MUTATIONS_TYPES = {
	setPlaying: 'setPlaying',
	setFullScreen: 'setFullScreen',
	setPlaylist: 'setPlaylist',
	setSequenceList: 'setSequenceList',
	setMode: 'setMode',
	setCurrentIndex: 'setCurrentIndex'
}

export default {
	[MUTATIONS_TYPES.setPlaying](state, payload) {
		state.playing = payload
	},
	[MUTATIONS_TYPES.setFullScreen](state, payload) {
		state.setFullScreen = payload
	},
	[MUTATIONS_TYPES.setPlaylist](state, payload) {
		state.setPlaylist = payload
	},
	[MUTATIONS_TYPES.setSequenceList](state, payload) {
		state.setSequenceList = payload
	},
	[MUTATIONS_TYPES.setMode](state, payload) {
		state.mode = payload
	},
	[MUTATIONS_TYPES.setCurrentIndex](state, payload) {
		state.currentIndex = payload
	}
}
