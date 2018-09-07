import Vue from 'vue'
import Router from 'vue-router'
import AppRecommend from 'components/Recommend/Recommend'
import AppRank from 'components/Rank/Rank'
import AppSearch from 'components/Search/Search'
import AppSinger from 'components/Singer/Singer'
import AppSingerDetail from 'components/SingerDetail/SingerDetail'
import AppDisc from 'components/Disc/Disc'
import AppTopList from 'components/TopList/TopList'
import AppUserCenter from 'components/UserCenter/UserCenter'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: AppRecommend,
			children: [
				{
					path: ':id',
					component: AppDisc
				}
			]
		},
		{
			path: '/rank',
			component: AppRank,
			children: [
				{
					path: ':id',
					component: AppTopList
				}
			]
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
		},
		{
			path: '/user',
			component: AppUserCenter
		}
	]
})
