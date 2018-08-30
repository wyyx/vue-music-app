import Vue from 'vue'
import Vuex from 'vuex'
import singerStateModule from './singer'
import playerStateModule from './player'
import CommonStateModule from './common'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	modules: {
		singerStateModule,
		playerStateModule,
		CommonStateModule
	},
	strict: debug,
	plugins: debug ? [ createLogger() ] : []
})

export default store
