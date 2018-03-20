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
         this.$http.get('/api/glreport/getReportBasicdata', {
            params: {
                siteid: this.webId,//网站siteid
                querydate: this.chartTime,//查询日期范围
                period: 'day'//数据粒度, 最小是day
            }
         },{
             credentials: true,
             emulateJSON: true
         }).then(function(res) {
            console.log(res.body.data) 
         },function(err){
             // console.log(err.status)
         });
       },
       chartsData(){
           console.log(this.chartsData) 
       }
    },
    methods:{
<<<<<<< HEAD
        
=======
        pageviews(){//页面浏览量
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,chartX=[],chartYNow=[],chartYBefore=[]

            console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length>0) {//有数据
                // 日期
                this.box[0].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  counts += dataNow[i].nb_pageviews
                  chartX.push(that.formatDate(dataNow[i]['datadate']))
                  chartYNow.push(dataNow[i].nb_pageviews)
                }
                //页面访问量总量
                this.box[0].chartsdata.counts = counts
                //本周期页面访问量总量
                countsNow = counts
                // 横坐标
                this.box[0].chartsdata.chartX = chartX
                // 纵坐标
                this.box[0].chartsdata.chartYNow = chartYNow
            }
            // 上周期
            if (dataBefore.length>0) {//有数据

                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_pageviews);
                    countsBefore += dataBefore[i].nb_pageviews
                }
                // 纵坐标
                this.box[0].chartsdata.chartYBefore = chartYBefore
            }else{
                for (var i = 0; i < dataNow.length; i++) {
                    chartYBefore.push(0);
                    countsBefore += 0
                }
                // 纵坐标
                this.box[0].chartsdata.chartYBefore = chartYBefore
            }

            // 数据比较
            if (countsBefore>0) {
              if (countsNow-countsBefore>=0) {
                  num = ((countsNow-countsBefore)/countsBefore).toFixed(2)
                  this.box[0].chartsdata.num = num;
                  this.box[0].chartsdata.riseOrFall = '上升';
              }else{
                  num = ((countsBefore - countsNow)/countsBefore).toFixed(2)
                  this.box[0].chartsdata.num = num;
                  this.box[0].chartsdata.riseOrFall = '下降';
              }

            }else{
                this.box[0].chartsdata.num = 0;
                this.box[0].chartsdata.riseOrFall = '上升';
            }
            
            // console.log(this.formatDate('2018-03-19'))

            this.$store.commit('overviewData',{
                charChange : counts
            })
        },
        // 日期格式函数
        formatDate(date) {
            var myyear = new Date(date).getFullYear();
            var mymonth = new Date(date).getMonth() + 1;
            var myweekday = new Date(date).getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            var weekDate = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            var week = new Date(date).getDay(); 
            var days = myyear.toString().slice(2) + "/" + mymonth + "" + weekDate[week]

            // console.log(datesDate)
            return days

        }
>>>>>>> b42b2d4... 233
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
