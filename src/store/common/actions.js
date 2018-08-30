import { MUTATION_TYPES } from './mutations'
import _ from 'lodash'

export const ACTION_TYPES = {
	setDisc: 'setDisc',
	setTopList: 'setTopList',
	setSampleList: 'setSampleList',
	setSearchHistory: 'setSearchHistory',
	removeAllSearchHistory: 'removeAllSearchHistory'
}

export default {
	[ACTION_TYPES.setDisc](context, payload) {
		context.commit(MUTATION_TYPES.setDisc, payload)
	},
	[ACTION_TYPES.setTopList](context, payload) {
		context.commit(MUTATION_TYPES.setTopList, payload)
	},
	[ACTION_TYPES.setSampleList](context, payload) {
		context.commit(MUTATION_TYPES.setSampleList, payload)
	},
	[ACTION_TYPES.setSearchHistory](context, payload) {
		let sortedUniq = _.sortedUniq(payload)
		context.commit(MUTATION_TYPES.setSearchHistory, sortedUniq)
	},
	[ACTION_TYPES.removeAllSearchHistory](context, payload) {
		context.commit(MUTATION_TYPES.removeAllSearchHistory)
	}
}
