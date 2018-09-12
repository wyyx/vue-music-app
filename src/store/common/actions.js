import { MUTATION_TYPES } from './mutations'
import _ from 'lodash'
import SearchHistoryCache from '@/common/js/search-history-cache'
import PlayHistoryCache from '@/common/js/play-history-cache'
import FavoriteListCache from '@/common/js/favorite-list-cache'

export const ACTION_TYPES = {
	setDisc: 'setDisc',
	setTopList: 'setTopList',
	setSampleList: 'setSampleList',
	setSearchHistory: 'setSearchHistory',
	addSearchHistory: 'addSearchHistory',
	removeAllSearchHistory: 'removeAllSearchHistory',
	addPlayHistory: 'addPlayHistory',
	setPlayHistory: 'setPlayHistory',
	removeSearchHistory: 'removeSearchHistory',
	setFavoriteList: 'setFavoriteList',
	addFavorite: 'addFavorite',
	removeFavorite: 'removeFavorite'
}

const searchHistoryCache = new SearchHistoryCache('searchHistory')
const playHistoryCache = new PlayHistoryCache('playHistory')
const favoriteListCache = new FavoriteListCache('favoriteList')

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
		context.commit(MUTATION_TYPES.setSearchHistory, payload)
	},
	[ACTION_TYPES.addSearchHistory](context, payload) {
		// exclude repeat search history
		for (const query of searchHistoryCache.storage) {
			if (query === payload) {
				return
			}
		}
		searchHistoryCache.add(payload)

		let searchHistory = context.state.searchHistory.slice()
		searchHistory.unshift(payload)
		searchHistory = _.uniq(searchHistory)

		context.commit(MUTATION_TYPES.setSearchHistory, searchHistory)
	},
	[ACTION_TYPES.removeSearchHistory](context, payload) {
		let searchHistory = context.state.searchHistory.slice()
		let index = searchHistory.findIndex(item => item === payload)
		searchHistory.splice(index, 1)

		// remove search history
		for (const query of searchHistoryCache.storage) {
			if (query === payload) {
				searchHistoryCache.remove(payload)
			}
		}

		context.commit(MUTATION_TYPES.setSearchHistory, searchHistory)
	},
	[ACTION_TYPES.removeAllSearchHistory](context, payload) {
		searchHistoryCache.clear()
		context.commit(MUTATION_TYPES.removeAllSearchHistory)
	},
	[ACTION_TYPES.addPlayHistory](context, song) {
		// exclude repeat song
		for (const ph of playHistoryCache.storage) {
			if (ph.id === song.id) {
				return
			}
		}

		playHistoryCache.add(song)

		let playHistory = context.state.playHistory.slice()
		playHistory.unshift(song)
		context.commit(MUTATION_TYPES.setPlayHistory, playHistory)
	},
	[ACTION_TYPES.setPlayHistory](context, songList) {
		context.commit(MUTATION_TYPES.setPlayHistory, songList)
	},
	[ACTION_TYPES.setFavoriteList](context, songList) {
		context.commit(MUTATION_TYPES.setFavoriteList, songList)
	},
	[ACTION_TYPES.addFavorite](context, song) {
		let favoriteList = context.state.favoriteList.slice()

		for (const s of favoriteList) {
			if (s.id === song.id) {
				return
			}
		}

		favoriteListCache.add(song)
		favoriteList.unshift(song)

		context.commit(MUTATION_TYPES.setFavoriteList, favoriteList)
	},
	[ACTION_TYPES.removeFavorite](context, song) {
		let favoriteList = context.state.favoriteList.slice()

		for (let i = 0; i < favoriteList.length; i++) {
			if (favoriteList[i].id === song.id) {
				// console.log('song', song)
				favoriteList.splice(i, 1)
				favoriteListCache.remove(song)
			}
		}

		context.commit(MUTATION_TYPES.setFavoriteList, favoriteList)
	}
}
