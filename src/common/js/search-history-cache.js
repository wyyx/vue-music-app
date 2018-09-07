export default class SearchHistoryCache {
	// cache name and size
	constructor(name, size = 100) {
		this.name = name
		this.size = size
		this.storage = JSON.parse(localStorage.getItem(name))
		if (!this.storage) {
			this.storage = []
		}
	}

	add(value) {
		this.storage.unshift(value)
		if (this.storage.length > this.size) {
			this.storage.pop()
		}

		localStorage.setItem(this.name, JSON.stringify(this.storage))
	}

	remove(value) {
		for (let index = 0; index < this.storage.length; index++) {
			if (this.storage[index] === value) {
				this.storage.splice(index, 1)
			}
		}

		localStorage.setItem(this.name, JSON.stringify(this.storage))
	}

	clear() {
		this.storage = []
		localStorage.setItem(this.name, JSON.stringify(this.storage))
	}
}

export function loadSearchHistory() {
	const cache = new SearchHistoryCache('searchHistory')
	return cache.storage
}
