export const MUTATION_TYPES = {
	setSinger: 'setSinger'
}

export default {
	[MUTATION_TYPES.setSinger](state, payload) {
		state.singer = payload
	}
}
