import { MUTATIONS_TYPES } from './mutations'

export const ACTIONS_TYPES = {
	setSinger: 'setSinger'
}

export default {
	[ACTIONS_TYPES.setSinger](context, payload) {
		context.commit(MUTATIONS_TYPES.setSinger, payload)
	}
}
