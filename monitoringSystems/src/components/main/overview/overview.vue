<template>
    <div class="overview">
        <!-- 右侧导航 -->
        <overviewTop></overviewTop>
        <!-- 主体 -->
        <overviewMain></overviewMain>
    </div>
</template>

<script>
import overviewTop from '@/components/main/overview/overview-top'
import overviewMain from '@/components/main/overview/overview-main'
export default {
    name : 'overview',
    data() {
        return {
            webIdChange:false,
            chartTimeChange:false
        }
    },
    created(){
        
    },
    computed:{
        webId(){
            return this.$store.state.webManages.webId;
        },        
        chartTime(){
            return this.$store.state.overview.chartTime;
        }
    },
    mounted(){
        
        this.$nextTick(function () {
            // console.log(99999999)
            this.init();
        })
    },
    watch:{
        webId(){
            // console.log(8888888)
            this.init();
        },
        chartTime(){
            // console.log(7777)
            this.init();
        }
    },
    destroyed(){
        this.dataDestroyed()
    },
    methods:{
        dataDestroyed(){
            this.$store.commit('overviewData',{
                chartsData : []
            })
            let yesterdays = sessionStorage.getItem('yesterdays')
            // 初始化昨天
            sessionStorage.setItem('days',yesterdays);
            sessionStorage.setItem('period','day');
            this.$store.commit('overviewData',{
                modalDateChose : "昨天"
            })
        },
        // 初始化
        init(){
            
            // console.log(sessionStorage.getItem('siteId'))
            // var that =this;
            // 请求概览页图表数据
            this.$http.post('/api/glreport/getReportBasicdata', {
               // params: {
                   siteid: sessionStorage.getItem('siteId'),//网站siteid
                   querydate: sessionStorage.getItem('days'),//查询日期范围
                   period: sessionStorage.getItem('period')//数据粒度, 最小是day
               // }
            },{
                credentials: true,
                emulateJSON: true
            }).then(function(res) {
                if (res.body.msg=="操作失败，请重试") {
                     if (confirm('链接超时，请重新登录！')==true){ 
                         this.$router.push({path:'/login'})  
                     }
                }
               // console.log(res.body) 
               // this.chartsData =res.body
               this.$store.commit('overviewData',{
                   chartsData : res.body
               })
            },function(err){
                console.log(err.status)
                if (err.status ==500) {
                    if (confirm('登录超时，请重新登录！')==true){ 
                        this.$router.push({path:'/login'})  
                    }else{ 

                    } 
                }
            });
        }
    },
    components:{
        overviewTop : overviewTop,
        overviewMain : overviewMain
    }
}
</script>

<style scoped>
    .overview {
      width: 100%;
      height: 100%;
      margin: 0;
      /*position: relative;*/
      /*overflow-y: auto;*/
      padding: 0px 30px 80px;
    }
</style>
