export const GETTERS_TYPES = {
	singer: 'singer'
}

export default {
	[GETTERS_TYPES.singer](state) {
		return state.singer
	}
}
