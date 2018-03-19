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
                                <li v-for="(cItem, cIndex) in pItem.children">
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
                        {"routerLinks":'/home/fenxi',"text":'渠道与来源分析'},
                        {"routerLinks":'/home/fenxi',"text":'着陆页分析'},
                        {"routerLinks":'/home/fenxi',"text":'用户留存分析'},
                        {"routerLinks":'/home/fenxi',"text":'用户忠诚度分析'},
                        {"routerLinks":'/home/fenxi',"text":'用户标签管理'},
                        {"routerLinks":'/home/fenxi',"text":'用户画像'}
                    ]
                },
                {
                    title: '广告追踪',
                    children:[//广告追踪
                        {"routerLinks":'/home/fenxi',"text":'广告活动管理'},
                        {"routerLinks":'/home/fenxi',"text":'广告实时监测'},
                        {"routerLinks":'/home/fenxi',"text":'广告跳出页分析'},
                        {"routerLinks":'/home/fenxi',"text":'转化漏斗分析'}
                    ]
                },
            ],
            WebsiteManagement:[
            ],
            // 网站显示
            WebManageShow:"网站应用管理",
            userName:''
        }
    },
    created(){
        this.getWebsiteData()
    },
    computed:{
        itemIndex(){
            return this.$store.state.itemIndex;
        }
    },
    methods:{
        // 导航项目切换
        itemChange(index){
            // console.log(index)
            this.$store.commit('itemIndex',{
                itemIndex:index
            })
        },
        // 获取后台数据
        getWebsiteData(){
            // 网站管理数据
            this.$http.get('/api/gl/getuserapp', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data.body)
                // 判断是否已经写入网站
                // 没有
                if (data.body.data.length=='' || data.body.data.length==0) {
                  this.WebsiteManagement = '';
                  this.WebManageShow = '网站应用管理'

                }else{
                  // 有
                  this.WebsiteManagement = data.body.data;
                  this.WebManageShow = data.body.data[0].chargename; 
                  // console.log(this.WebsiteManagement)
                  this.$store.commit('webManagesData',{
                      webId:this.WebsiteManagement[0].siteid
                  })
                }
   
            },function(err){
                // console.log(err.status)
                if (err.status ==500) {
                    if (confirm('登录超时，请重新登录！')==true){ 
                        this.$router.push({path:'/login'})  
                    }else{ 

                    } 
                }
                console.log(err.status)
            });
            // 获取当前登录账号账号名
            this.$http.get('/api/gl/getuser', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data.body.data.username)
                this.userName = data.body.data.username
            
            },function(err){
                console.log(err.status)
            });
        },
        // 更改网站显示函数
        WebManageShowChange(data,index){
          this.WebManageShow = data;
          if (data!='网站应用管理') {
            // 切换 导航条 active 显示
            this.itemChange(0); 
            // 更新 网站数据请求id
            if (index!='') {
              this.$store.commit('webManagesData',{
                  webId:this.WebsiteManagement[index].siteid
              })
            }
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
