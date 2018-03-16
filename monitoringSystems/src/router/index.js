import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import webManage from '@/components/main/webManages/webManages'
import fenxi from '@/components/main/fenxi/fenxi'
import overview from '@/components/main/overview/overview'
import userSettings from '@/components/main/userSettings/userSettings'


Vue.use(Router)
export default new Router({
  	mode: 'history',
  	routes: [
	    {
	      path: '/',
	      component: login
	    },{
	      path: '/login',
	      component: login
	    },
	    {
	      path: '/home',
	      component: home,
	      children:[
	            { path: '/home/fenxi', component: fenxi},
	            { path: '/home/overview', component: overview},
			    {path: '/home/webManage',component: webManage},
			    {path: '/home/userSettings',component: userSettings}
	      ]
	    }
  	]
})
