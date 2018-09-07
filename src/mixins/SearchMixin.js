import { mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters([ 'searchHistory' ])
	},
	methods: {
		...mapActions([ 'addSearchHistory', 'removeSearchHistory', 'setSearchHistory' ]),
		onQueryChange(query) {
			this.query = query
			this.addToSearchHistory(query)
		},
		addToSearchHistory(query) {
			if (!query) {
				return
			}
			for (const h of this.searchHistory) {
				if (h === query) {
					return
				}
			}

			this.addSearchHistory(query)
		},
		setQuery(query) {
			this.$refs.searchBox.setQuery(query)
			this.query = query
			this.addToSearchHistory(query)
		},
		deleteHistory(history) {
			this.removeSearchHistory(history)
		},
		showConfirm() {
			this.$refs.confirm.show()
		}
	}
}
