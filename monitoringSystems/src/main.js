// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import animate from './assets/css/animate.min.css'
import vueResource from 'vue-resource'
import $ from 'jquery'
import echarts from 'echarts'
import './assets/js/bootstrap.min.js'
import './assets/css/bootstrap.min.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(vueResource)
Vue.use(VueClipboard)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  update: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	animate,
	$,
	components: { App },
	template: '<App/>'
})
Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
 request.credentials = true;
next()
})

