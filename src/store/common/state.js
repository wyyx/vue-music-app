import { loadSearchHistory } from '@/common/js/search-history-cache'
import { loadPlayHistory } from '@/common/js/play-history-cache'
import { loadFavoriteList } from '@/common/js/favorite-list-cache'

export default {
	disc: null,
	topList: [],
	sampleList: [],
	searchHistory: loadSearchHistory(),
	playHistory: loadPlayHistory(),
	favoriteList: loadFavoriteList()
}
