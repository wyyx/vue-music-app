import Vue from 'vue'
import Router from 'vue-router'
import AppRecommend from 'components/Recommend/Recommend'
import AppRank from 'components/Rank/Rank'
import AppSearch from 'components/Search/Search'
import AppSinger from 'components/Singer/Singer'
import AppSingerDetail from 'components/SingerDetail/SingerDetail'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: AppRecommend
		},
		{
			path: '/rank',
			component: AppRank
		},
		{
			path: '/search',
			component: AppSearch
		},
		{
			path: '/singer',
			component: AppSinger,
			children: [
				{
					path: ':id',
					component: AppSingerDetail
				}
			]
		}
	]
})
