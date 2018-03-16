import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
	state:{
		itemIndex:'',//导航条默认active 下标
		overview:{
			ovNavIndex:0,//概览右侧导航 默认显示下表
			modalIsShow: "off", //弹框显示与否 控制
			modalDateChose: "昨天", //弹框选择后，显示在右侧的日期
			chartsData:{}, //概览页 图表数据
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
			copydata:''
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
        }

		
	},
	mutations:{
		setHomeMsg(state,data){
			state.homeMsg=data.msg;
		},
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
		},
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
		},
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
		}
	}
})

export default store