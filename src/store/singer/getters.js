export const GETTER_TYPES = {
	singer: 'singer'
}

export default {
	[GETTER_TYPES.singer](state) {
		return state.singer
	}
}
