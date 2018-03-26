<template>
    <div class="pageNav">
        <!-- 顶部导航 -->
          <nav class="navbar navbar-inverse navbar-fixed-top">
              <div class="container">
                  <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                      </button>
                      <a class="navbar-brand" href="#">SEED - admin</a>
                  </div>
                  <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav" id="id-mainmenu">
                        <li :class="{'active open':itemIndex==0}" @click="itemChange(0)">
                            <router-link :to="'/home/overview'">应用概览</router-link>
                        </li>
                        <li v-for="(pItem, pIndex) in navLeftList" :class="{'active open':itemIndex==(pIndex+1)}" @click="itemChange(pIndex+1)">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{pItem.title}} <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li v-for="(cItem, cIndex) in pItem.children" @click="cIndexChange(cIndex,pIndex)">
                                    <router-link :to="cItem.routerLinks">
                                        {{cItem.text}}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <!-- 右侧 -->
                    <ul class="nav navbar-nav navbar-right">
                      <!-- 网站权限管理 -->
                      <li class="dropdown WebsiteManagement" :class="{'active open':itemIndex==3}" @click="itemChange(3)">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-if="WebsiteManagement.length > 0">{{WebManageShow}} <span class="caret"></span></a>
                          
                          <ul class="dropdown-menu" v-if="WebsiteManagement.length > 0">
                            <li v-for="(item, index) in WebsiteManagement  " @click.stop="WebManageShowChange(item.appname,index)">
                                <router-link :to="'/home/overview'">
                                    {{item.appname}}
                                </router-link>
                            </li>
                            <li @click="WebManageShowChange('网站应用管理')">
                                <router-link :to="'/home/webManage'">
                                    网站应用管理
                                </router-link>
                            </li>
                          </ul>
                          <router-link :to="'/home/webManage'" v-else>网站应用管理</router-link>
                          <!-- <a href="#" v-else>{{WebManageShow}}</a> -->
                      </li>
                      <!-- 登出 -->
                      <li :class="{'active open':itemIndex==5}" @click="itemChange(5)">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">您好，{{userName}} <span class="caret"></span></a>
                          <ul class="dropdown-menu">
                              <li>
                                  <router-link :to="'/home/userSettings'">
                                      账户权限管理
                                  </router-link>
                              </li>
                              <li @click="logOut">
                                  <router-link :to="'/login'">
                                      登出
                                  </router-link>
                              </li>
                          </ul>
                    </li>
                    </ul>
                  </div>
              </div>
          </nav>
    </div>
</template>

<script>
// import userSettings from '@/components/nav/userSettings/userSettings'
export default {
    name : 'pageNav',
    data() {
        return {
            navLeftList:[
                {   
                    title: '应用分析',
                    children:[//应用分析
                        {"routerLinks":`/home/analysis/${1}`,"text":'渠道与来源分析'},
                        {"routerLinks":`/home/analysis/${2}`,"text":'着陆页分析'},
                        {"routerLinks":`/home/analysis/${3}`,"text":'用户留存分析'},
                        {"routerLinks":`/home/analysis/${4}`,"text":'用户忠诚度分析'},
                        {"routerLinks":`/home/analysis/${5}`,"text":'用户标签管理'},
                        {"routerLinks":`/home/analysis/${6}`,"text":'用户画像'}
                    ]
                },
                {
                    title: '广告追踪',
                    children:[//广告追踪
                        {"routerLinks":'/home/AdTracking',"text":'广告活动管理'},
                        {"routerLinks":'/home/AdTracking',"text":'广告实时监测'},
                        {"routerLinks":'/home/AdTracking',"text":'广告跳出页分析'},
                        {"routerLinks":'/home/AdTracking',"text":'转化漏斗分析'}
                    ]
                },
            ],
            WebsiteManagement:[
            ],
            // 网站显示
            WebManageShow:"网站应用管理",
            userName:'',//当前用户登录名称
            itemIndex:0//项目下标
        }
    },
    created(){
        // this.getWebsiteData()
    },
    mounted(){
       this.init()
    },
    computed:{

    },
    methods:{
        init(){
            // 下标
            this.itemIndex = sessionStorage.getItem('navItemIndex')
            // console.log(this.itemIndex)
            // 当前账户名称
            this.userName = sessionStorage.getItem('userName')
            
            let webList = JSON.parse(sessionStorage.getItem('webList'))
            // 判断是否已经写入网站
            // 没有
            if (webList=='' || webList.length==0) {
                this.WebsiteManagement = '';
                this.WebManageShow = '网站应用管理'
            }else{
              // 有
              this.WebsiteManagement = webList
              // console.log(webList)
              let siteId = sessionStorage.getItem('siteId')
              for (var i = 0; i < webList.length; i++) {
                  if (webList[i].siteid == siteId) {
                      this.WebManageShow = webList[i].appname; 
                  }
              }
            }
        },
        // 导航项目切换
        itemChange(index){
    
            this.itemIndex = index;
            sessionStorage.setItem('navItemIndex',index);

            if (index==0) {
              this.$store.commit('overviewData',{
                  chartLoading:'show'
              })
            }
        },
        cIndexChange(cIndex,pIndex){
            // console.log(9999)
            // console.log(pIndex)
            // 分析
            if (pIndex==0) {
                this.$store.commit('analysisData',{
                    itemIndex : cIndex+1
                }) 
                // sessionStorage.setItem('analysisIndex',cIndex)
            }
        },
        // 更改网站显示函数
        WebManageShowChange(data,index){
          this.WebManageShow = data;
          // console.log(index)
          if (data!='网站应用管理') {
            // 更新 网站数据请求id
            let siteid =this.WebsiteManagement[index].siteid
            // console.log(this.WebsiteManagement[index].siteid)
            // console.log(this.WebsiteManagement)
            sessionStorage.setItem('siteId',siteid)
            // 用于 图表loading隐藏 图表显示
            this.$store.commit('overviewData',{
                chartLoading : 'show'
            }) 
            this.$store.commit('webManagesData',{
                webId : siteid
            })
          
            // 切换 导航条 active 显示
            this.itemChange(0); 
          }
          
        },
        // 登出
        logOut(){
           // 发送登出请求
           this.$http.get('/api/gl/logout', {

           },{
               credentials: true,
               emulateJSON: true
           }).then(function(data) {
              console.log('logout') 
           },function(err){
              if (err.status ==500) {
                  if (confirm('登录超时，请重新登录！')==true){ 
                      this.$router.push({path:'/login'})  
                  }else{ 

                  } 
              }
              console.log(err.status)
           });
        }

    },
    components:{
        // userSettings : userSettings
    }

    

}

</script>

<style scoped>
  .bg-a:hover{
    color: #9d9d9d !important;
  }
</style>
