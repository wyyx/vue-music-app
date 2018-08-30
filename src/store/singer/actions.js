import { MUTATION_TYPES } from './mutations'

export const ACTION_TYPES = {
	setSinger: 'setSinger'
}

export default {
	[ACTION_TYPES.setSinger](context, payload) {
		context.commit(MUTATION_TYPES.setSinger, payload)
	}
}
