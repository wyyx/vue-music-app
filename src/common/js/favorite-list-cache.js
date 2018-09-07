import Song from '@/common/js/song'

export default class FavoriteListCache {
	// cache name and size
	constructor(name, size = 100) {
		this.name = name
		this.size = size
		this.storage = JSON.parse(localStorage.getItem(name))
		if (!this.storage) {
			this.storage = []
		}
	}

	add(song) {
		for (const s of this.storage) {
			if (s.id === song.id) {
				return
			}
		}

		this.storage.unshift(song)
		if (this.storage.length > this.size) {
			this.storage.pop()
		}

		localStorage.setItem(this.name, JSON.stringify(this.storage))
	}

	remove(song) {
		for (let index = 0; index < this.storage.length; index++) {
			if (this.storage[index].id === song.id) {
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

export function loadFavoriteList() {
	const cache = new FavoriteListCache('favoriteList')

	let ret = []
	cache.storage.forEach(song => {
		ret.push(new Song({ ...song }))
	})
	return ret
}
