export const MUTATIONS_TYPES = {
	setSinger: 'setSinger'
}

export default {
	[MUTATIONS_TYPES.setSinger](state, payload) {
		state.singer = payload
	}
}
