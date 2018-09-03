import { MUTATION_TYPES } from './mutations'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const ACTION_TYPES = {
	setPlayingState: 'setPlayingState',
	setFullScreen: 'setFullScreen',
	setPlaylist: 'setPlaylist',
	setSequenceList: 'setSequenceList',
	setPlayMode: 'setPlayMode',
	setCurrentIndex: 'setCurrentIndex',
	selectPlay: 'selectPlay',
	randomPlay: 'randomPlay',
	deleteFromPlaylist: 'deleteOneFromPlaylist',
	deleteAllFromPlaylist: 'deleteAllFromPlaylist'
}

export default {
	[ACTION_TYPES.setPlayingState]({ commit }, payload) {
		commit(MUTATION_TYPES.setPlayingState, payload)
	},
	[ACTION_TYPES.setFullScreen]({ commit }, payload) {
		commit(MUTATION_TYPES.setFullScreen, payload)
	},
	[ACTION_TYPES.setPlaylist]({ commit }, payload) {
		commit(MUTATION_TYPES.setPlaylist, payload)
	},
	[ACTION_TYPES.setSequenceList]({ commit }, payload) {
		commit(MUTATION_TYPES.setSequenceList, payload)
	},
	[ACTION_TYPES.setPlayMode]({ commit, state }, payload) {
		commit(MUTATION_TYPES.setPlayMode, payload)

		if (payload === playMode.sequence) {
			commit(MUTATION_TYPES.setPlaylist, state.sequenceList)
		}
	},
	[ACTION_TYPES.setCurrentIndex]({ commit }, payload) {
		commit(MUTATION_TYPES.setCurrentIndex, payload)
	},
	[ACTION_TYPES.selectPlay]({ commit, state }, { list, index }) {
		commit(MUTATION_TYPES.setPlayingState, true)

		let currentIndex
		if (state.playMode === playMode.random) {
			// when random play
			let randomList = shuffle(list)
			currentIndex = findCurrentIndexInPlaylist(randomList, list, index)
			commit(MUTATION_TYPES.setPlaylist, randomList)
		} else {
			currentIndex = index
			commit(MUTATION_TYPES.setPlaylist, list)
		}

		commit(MUTATION_TYPES.setSequenceList, list)
		commit(MUTATION_TYPES.setCurrentIndex, currentIndex)
		commit(MUTATION_TYPES.setFullScreen, true)
	},
	[ACTION_TYPES.randomPlay]({ commit, state }, { list }) {
		commit(MUTATION_TYPES.setPlayingState, true)
		commit(MUTATION_TYPES.setPlayMode, playMode.random)

		let randomList = shuffle(list)
		commit(MUTATION_TYPES.setPlaylist, randomList)

		commit(MUTATION_TYPES.setSequenceList, list)
		commit(MUTATION_TYPES.setCurrentIndex, 0)
		commit(MUTATION_TYPES.setFullScreen, true)
	},
	[ACTION_TYPES.deleteFromPlaylist]({ commit, state }, song) {
		let playlist = state.playlist.slice()
		let sequenceList = state.sequenceList.slice()
		let currentIndex = state.currentIndex

		let pIndex = playlist.findIndex(s => s.id === song.id)
		playlist.splice(pIndex, 1)

		let sIndex = sequenceList.findIndex(s => s.id === song.id)
		sequenceList.splice(sIndex, 1)

		if (
			currentIndex > pIndex ||
			(currentIndex === pIndex && currentIndex === playlist.length)
		) {
			currentIndex--
		}

		commit(MUTATION_TYPES.setCurrentIndex, currentIndex)
		commit(MUTATION_TYPES.setPlaylist, playlist)
		commit(MUTATION_TYPES.setSequenceList, sequenceList)
	},
	[ACTION_TYPES.deleteAllFromPlaylist]({ commit, state }) {
		commit(MUTATION_TYPES.setCurrentIndex, -1)
		commit(MUTATION_TYPES.setPlaylist, [])
		commit(MUTATION_TYPES.setSequenceList, [])
	}
}

function findCurrentIndexInPlaylist(playlist, sequenceList, index) {
	return playlist.findIndex(item => item.id === sequenceList[index].id)
}
