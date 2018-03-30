import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
	state:{
		itemIndex: 0,//导航条默认active 下标
		overview:{//应用概览
			modalIsShow: "off", //日期弹框显示与否 控制
			modalDateChose: "昨天", //弹框选择后，显示在右侧的日期
			chartsData:[], //概览页 图表数据
			chartTime:'', //图表选择日期 用于overview 监听日期变化
			chartLoading: 'show', //图表loading 是否显示
			charts:[],//用于存放echarts 对象， 用于window.onresize
		},
		webManages:{//网站管理
			pageData:[],//页面数据
			modalData:[//弹框数据
				{
				   name: "网站名称",
				   choseValue: '' 
				},{
				   name: "网站地址",
				   choseValue: '' 
				},{
				   name: "网站类型",
				   choseValue: 'PC端' 
				},{
				   name: "负责人姓名",
				   choseValue: '' 
				},{
				   name: "负责人手机号",
				   choseValue: '' 
				},{
				   name: "负责人邮箱",
				   choseValue: '' 
				},{
				   name: "启用站内搜索监测",
				   choseValue: '是' 
				},{
				   name: "时区",
				   choseValue: '' 
				},{
				   name: "货币符号",
				   choseValue: '' 
				},{
					id:''
				}
			],
			editOrAdd: 'edit',//添加还是编辑
			copydata:'',//部署代码
			webId:0 //当前网站数据请求的id 是否发生改变，用于overview监听
		},
        userSettings:{//账户管理
        	pageData:[], //账户管理页数据更新
			modalData:[// 账户弹框弹框数据
	            {
	               name: "登录名",
	               choseValue: '' 
	            },{
	               name: "登录密码",
	               choseValue: '' 
	            },{
	               name: "确认密码",
	               choseValue: '' 
	            },{
	               name: "账号类型",
	               choseValue: '协作' 
	            },{
	               name: "姓名",
	               choseValue: '' 
	            },{
	               name: "邮箱",
	               choseValue: '' 
	            },{
	               name: "手机号",
	               choseValue: '' 
	            },{
	               id: "" 
	            }
	        ],
	        editOrAdd:"add"// 编辑还是添加依据
        },
		analysis:{//应用分析
			itemIndex: '', //项目下标
			chartTime:'', //图表选择日期 用于overview 监听日期变化
			modalIsShow: "off", //日期弹框显示与否 控制
			modalDateChose: "昨天", //弹框选择后，显示在右侧的日期
			chartLoading: 'show', //图表loading 是否显示
			charts:[],//用于存放echarts 对象， 用于window.onresize
			// chartsData:[], //分析页 图表数据
		},

		
	},
	mutations:{

		// 导航条默认active 切换
		itemIndex(state,data){
			// console.log(data)
			state.itemIndex=data.itemIndex;
		},
		// 概览页 数据切换
		overviewData(state,data){
			// console.log(data)
			if (data.ovNavIndex) {
				state.overview.ovNavIndex=data.ovNavIndex;
			}
			// 弹框的显示与隐藏
			if (data.modalIsShow) {
				state.overview.modalIsShow=data.modalIsShow;
			}
			// 标签上的日期显示
			if (data.modalDateChose) {
				state.overview.modalDateChose=data.modalDateChose;
			}
			// 概览页 图表数据更新
			if (data.chartsData) {
				state.overview.chartsData=data.chartsData;
			}
			// 概览页 图表选择日期
			if (data.chartTime) {
				state.overview.chartTime=data.chartTime;
			}
			// 概览页 图表loading 是否显示
			if (data.chartLoading) {
				state.overview.chartLoading=data.chartLoading;
			}
			if (data.charts) {
				state.overview.charts=data.charts;
			}
		},
		// 网站管理
		webManagesData(state,data){
			// 网站管理页数据更新
			if (data.pageData) {
				state.webManages.pageData=data.pageData;
			}
			if (data.modalData) {
				state.webManages.modalData=data.modalData;
			}
			if (data.editOrAdd) {
				state.webManages.editOrAdd=data.editOrAdd;
			}
			if (data.copydata) {
				state.webManages.copydata=data.copydata;
			}
			if (data.webId) {
				state.webManages.webId=data.webId;
			}
		},
		// 账户管理
		userSettingsData(state,data){
			// 账户管理页数据更新
			if (data.pageData) {
				state.userSettings.pageData=data.pageData;
			}
			if (data.modalData) {
				state.userSettings.modalData=data.modalData;
			}
			if (data.editOrAdd) {
				state.userSettings.editOrAdd=data.editOrAdd;
			}
		},
		// 分析
		analysisData(state,data){
			// 分析模块，各模块导航切换
			if (data.itemIndex) {
				state.analysis.itemIndex=data.itemIndex;
			}
			// 分析模块，各模块导航切换
			if (data.chartLoading) {
				state.analysis.chartLoading=data.chartLoading;
			}
			if (data.charts) {
				state.analysis.charts=data.charts;
			}
			// 弹框的显示与隐藏
			if (data.modalIsShow) {
				state.analysis.modalIsShow=data.modalIsShow;
			}
			// 标签上的日期显示
			if (data.modalDateChose) {
				state.analysis.modalDateChose=data.modalDateChose;
			}
			// 分析页 图表选择日期
			if (data.chartTime) {
				state.analysis.chartTime=data.chartTime;
			}
			// 分析页 图表数据
			// if (data.chartsData) {
			// 	state.analysis.chartsData=data.chartsData;
			// }
		},
	}
})

export default store