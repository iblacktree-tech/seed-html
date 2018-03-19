<template>
    <div class="overview-main">
        <div class="row main-box-container">
            <div :class='item.c' v-for='(item,index) in box'>
                <lineChart v-if="index<5"></lineChart>
                <barChart v-else-if="index>=5&&index!=7">
                    
                </barChart>
                <pieChart v-else></pieChart>
            </div>

        </div>
    
    </div>
</template>

<script>
import lineChart from '@/components/main/overview/overview-lineChart'
import barChart from '@/components/main/overview/overview-barChart'
import pieChart from '@/components/main/overview/overview-pieChart'
export default {
    name : 'overview-main',
    data() {
        return {
            box:[
                {c:'col-xs-6'},
                {c:'col-xs-6'},
                {c:'col-xs-4'},
                {c:'col-xs-4'},
                {c:'col-xs-4'},
                {c:'col-xs-6'},
                {c:'col-xs-6'},
                {c:'col-xs-4'},
                {c:'col-xs-4'},
                {c:'col-xs-4'}
            ],

        }
    },
    created(){
       // this.a() 
    },
    mounted(){
       
    },
    computed:{
        webId(){
            return this.$store.state.webManages.webId;
        },
        chartTime(){
            return this.$store.state.overview.chartTime;
        },
        chartsData(){
            return this.$store.state.overview.chartsData;
        },
    },
    watch: {
       webId :function(){
         console.log(this.webId)
         console.log(this.chartTime)
         this.$http.get('/api/glreport/getReportdata', {
            params: {
                siteid: this.webId,//网站siteid
                querydate: this.chartTime,//查询日期范围
                segment: '',//拼写过滤条件
                period: 'day'//数据粒度, 最小是day
            }
         },{
             credentials: true,
             emulateJSON: true
         }).then(function(res) {
            console.log(res.body.data) 
         },function(err){
             console.log(err.status)
         });
       },
       chartsData(){
           console.log(this.chartsData) 
       }
    },
    methods:{
        
    },
    components:{
        lineChart : lineChart,
        barChart : barChart,
        pieChart : pieChart
    }
}
</script>

<style scoped>
    .overview-main{
        height: calc(100% - 5px);
        position: relative;
        height: 100%;

    }
    .main-box-container{
      padding:0;
      /*padding-bottom: 250px;*/
      box-sizing: border-box;
      border-top:0.1px solid transparent;
      overflow-y: hidden;
    }
    .main-box-container>div{
        padding:5px;
    }
</style>
