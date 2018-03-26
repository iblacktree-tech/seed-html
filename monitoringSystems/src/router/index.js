import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import webManage from '@/components/main/webManages/webManages'
import analysis from '@/components/main/analysis/analysis'
import overview from '@/components/main/overview/overview'
import userSettings from '@/components/main/userSettings/userSettings'
import AdTracking from '@/components/main/AdTracking/AdTracking'


Vue.use(Router)
let routers = new Router({
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
	            { path: '/home/analysis/:id', component: analysis},
	            { path: '/home/overview', component: overview},
			    {path: '/home/webManage',component: webManage},
			    {path: '/home/userSettings',component: userSettings},
			    {path: '/home/AdTracking',component: AdTracking},
	      ]
	    }
  	]
})
routers.beforeEach((to, from, next) => {
    // if (to.meta.title) {
    //     document.title = to.meta.title;
    //     $('html,body').animate({scrollTop:0},30)
    // }
    // console.log(to)
    next();
})

export default routers