import { MUTATIONS_TYPES } from './mutations'

export const ACTIONS_TYPES = {
	setPlaying: 'setPlaying',
	setFullScreen: 'setFullScreen',
	setPlaylist: 'setPlaylist',
	setSequenceList: 'setSequenceList',
	setMode: 'setMode',
	setCurrentIndex: 'setCurrentIndex'
}

export default {
	[ACTIONS_TYPES.setPlaying](context, payload) {
		context.commit(MUTATIONS_TYPES.setPlaying, payload)
	},
	[ACTIONS_TYPES.setFullScreen](context, payload) {
		context.commit(MUTATIONS_TYPES.setFullScreen, payload)
	},
	[ACTIONS_TYPES.setPlaylist](context, payload) {
		context.commit(MUTATIONS_TYPES.setPlaylist, payload)
	},
	[ACTIONS_TYPES.setSequenceList](context, payload) {
		context.commit(MUTATIONS_TYPES.setSequenceList, payload)
	},
	[ACTIONS_TYPES.setMode](context, payload) {
		context.commit(MUTATIONS_TYPES.setMode, payload)
	},
	[ACTIONS_TYPES.setCurrentIndex](context, payload) {
		context.commit(MUTATIONS_TYPES.setCurrentIndex, payload)
	}
}
