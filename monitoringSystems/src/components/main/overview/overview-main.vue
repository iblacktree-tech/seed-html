<template>
    <div class="overview-main">
        <div class="row main-box-container">
            <div :class='item.c' v-for='(item,index) in box'>
                <lineChart v-if="index<5" :chartdates="box[index].chartsdata"></lineChart>
                <barChart v-else-if="index>=5&&index!=7" :chartdates="box[index].chartsdata"></barChart>
                <pieChart v-else :chartdates="box[index].chartsdata"></pieChart>
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
                {
                    c:'col-xs-6',
                    chartsdata:{
                        title: "页面浏览量趋势",//标题
                        des: "页面浏览量趋势",//描述
                        dates:"",//日期
                        counts :0,//数量
                        num : 0,//上升或者下降数量
                        riseOrFall:"上升",// 上升或者下降
                        id : "echart-box1",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-6',
                    chartsdata:{
                        title: "网站访问量趋势",//标题
                        des: "网站访问量趋势",//描述
                        dates:"",//日期
                        counts :0,//数量
                        num : 0,//上升或者下降数量
                        riseOrFall:"上升",// 上升或者下降
                        id : "echart-box2",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                        title: "访问用户量趋势",//标题
                        des: "访问用户量趋势",//描述
                        dates:"",//日期
                        counts :0,//数量
                        num : 0,//上升或者下降数量
                        riseOrFall:"上升",// 上升或者下降
                        id : "echart-box3",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                        title: "每次访问页面浏览量趋势",//标题
                        des: "每次访问页面浏览量趋势",//描述
                        dates:"",//日期
                        counts :0,//数量
                        num : 0,//上升或者下降数量
                        riseOrFall:"上升",// 上升或者下降
                        id : "echart-box4",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "新访问用户量趋势",//标题
                      des: "新访问用户量趋势",//描述
                      dates:"",//日期
                      counts :0,//数量
                      num : 0,//上升或者下降数量
                      riseOrFall:"上升",// 上升或者下降
                      id : "echart-box5",
                      chartX:[],
                      chartYNow:[],
                      chartYBefore:[],
                      isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                        title: "页面（URL）进入量前10名",//标题
                        des: "页面（URL）进入量前10名",//描述
                        dates:"2018/01/18",//日期
                        counts :200,//数量
                        num : 10,//上升或者下降数量
                        riseOrFall:"上升",// 上升或者下降
                        id : "echart-box5",
                        chartX:['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-6',
                    chartsdata:{
                      title: "站外搜索搜索词进入量前10名",//标题
                      des: "站外搜索搜索词进入量前10名",//描述
                      dates:"2018/01/18",//日期
                      counts :200,//数量
                      num : 10,//上升或者下降数量
                      riseOrFall:"上升",// 上升或者下降
                      id : "echart-box5",
                      chartX:['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                      chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                      chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                      isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-6',
                    chartsdata:{
                      title: "访问用户一级访问来源",//标题
                      des: "访问用户一级访问来源",//描述
                      dates:"2018/01/18",//日期
                      counts :200,//数量
                      num : 10,//上升或者下降数量
                      riseOrFall:"上升",// 上升或者下降
                      id : "echart-box5",
                      chartX:['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                      chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                      chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                      isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "广告来源访问用户量前10名",//标题
                      des: "广告来源访问用户量前10名",//描述
                      dates:"2018/01/18",//日期
                      counts :200,//数量
                      num : 10,//上升或者下降数量
                      riseOrFall:"上升",// 上升或者下降
                      id : "echart-box5",
                      chartX:['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                      chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                      chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                      isNull: false //是否显示暂无数据
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "城市名称访问用户量前10名",//标题
                      des: "城市名称访问用户量前10名",//描述
                      dates:"2018/01/18",//日期
                      counts :200,//数量
                      num : 10,//上升或者下降数量
                      riseOrFall:"上升",// 上升或者下降
                      id : "echart-box5",
                      chartX:['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                      chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                      chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                      isNull: false //是否显示暂无数据
                    }
                }
            ],

        }
    },
    created(){
       // this.a() 
    },
    mounted(){
       
    },
    computed:{
        chartsData(){
            return this.$store.state.overview.chartsData;
        }
    },
    watch: {
       chartsData(){ // chartdata 数据变化监听
           console.log(this.chartsData) 
           this.pageviews()
           this.visits()
           this.uniq_visitors()
           this.pageOnces()
           this.newVistor()
       }
    },
    methods:{
        pageviews(){//页面浏览量
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
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
                //页面访问量总量
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

                if (chartYBefore==0) {
                      this.box[0].chartsdata.num = 0;
                      this.box[0].chartsdata.riseOrFall ='上升';
                }else{
                    if (countsNow-countsBefore>=0) {
                        num = ((countsNow-countsBefore)/countsBefore).toFixed(2);
                        this.box[0].chartsdata.num =num;
                        this.box[0].chartsdata.riseOrFall ='上升';
                    }else{
                        num = ((countsBefore - countsNow)/countsBefore).toFixed(2);
                        this.box[0].chartsdata.num =num;
                        this.box[0].chartsdata.riseOrFall ='下降';
                    }
                }
            }else{
                this.box[0].chartsdata.num =0;
                this.box[0].chartsdata.riseOrFall ='上升';
            }



            if (dataNow.length==0&&dataBefore.length==0) {
                this.box[0].chartsdata.isNull=true //是否显示暂无数据
            }

            // console.log(this.formatDate('2018-03-19'))

            this.$store.commit('overviewData',{
                charChange : counts
            })
        },
        visits(){//网站访问量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length>0) {//有数据
                // 日期
                this.box[1].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  counts += dataNow[i].nb_visits
                  chartX.push(that.formatDate(dataNow[i]['datadate']))
                  chartYNow.push(dataNow[i].nb_visits)
                }
                //页面访问量总量
                this.box[1].chartsdata.counts = counts
                //页面访问量总量
                countsNow = counts
                // 横坐标
                this.box[1].chartsdata.chartX = chartX
                // 纵坐标
                this.box[1].chartsdata.chartYNow = chartYNow
            }
            // 上周期
            if (dataBefore.length>0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_visits);
                    countsBefore += dataBefore[i].nb_visits
                }
                // 纵坐标
                this.box[1].chartsdata.chartYBefore = chartYBefore

                if (chartYBefore==0) {
                      this.box[1].chartsdata.num = 0;
                      this.box[1].chartsdata.riseOrFall ='上升';
                }else{
                    if (countsNow-countsBefore>=0) {
                        num = ((countsNow-countsBefore)/countsBefore).toFixed(2);
                        this.box[1].chartsdata.num =num;
                        this.box[1].chartsdata.riseOrFall ='上升';
                    }else{
                        num = ((countsBefore - countsNow)/countsBefore).toFixed(2);
                        this.box[1].chartsdata.num =num;
                        this.box[1].chartsdata.riseOrFall ='下降';
                    }
                }
            }else{
                this.box[1].chartsdata.num =0;
                this.box[1].chartsdata.riseOrFall ='上升';
            }
            // console.log(this.formatDate('2018-03-19'))
        },
        uniq_visitors(){//访问用户量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length>0) {//有数据
                // 日期
                this.box[2].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  counts += dataNow[i].nb_uniq_visitors
                  chartX.push(that.formatDate(dataNow[i]['datadate']))
                  chartYNow.push(dataNow[i].nb_uniq_visitors)
                }
                //页面访问量总量
                this.box[2].chartsdata.counts = counts
                //页面访问量总量
                countsNow = counts
                // 横坐标
                this.box[2].chartsdata.chartX = chartX
                // 纵坐标
                this.box[2].chartsdata.chartYNow = chartYNow
            }
            // 上周期
            if (dataBefore.length>0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_uniq_visitors);
                    countsBefore += dataBefore[i].nb_uniq_visitors
                }
                // 纵坐标
                this.box[2].chartsdata.chartYBefore = chartYBefore

                if (chartYBefore==0) {
                      this.box[2].chartsdata.num = 0;
                      this.box[2].chartsdata.riseOrFall ='上升';
                }else{
                    if (countsNow-countsBefore>=0) {
                        num = ((countsNow-countsBefore)/countsBefore).toFixed(2);
                        this.box[2].chartsdata.num =num;
                        this.box[2].chartsdata.riseOrFall ='上升';
                    }else{
                        num = ((countsBefore - countsNow)/countsBefore).toFixed(2);
                        this.box[2].chartsdata.num =num;
                        this.box[2].chartsdata.riseOrFall ='下降';
                    }
                }
            }else{
                this.box[2].chartsdata.num =0;
                this.box[2].chartsdata.riseOrFall ='上升';
            }
        },
        pageOnces(){//访问用户量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length>0) {//有数据
                // 日期
                this.box[3].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  let dd = (parseInt(dataNow[i].nb_pageviews)/parseInt(dataNow[i].nb_visits))
                  counts += dd
                  chartX.push(that.formatDate(dataNow[i]['datadate']))
                  chartYNow.push(dd)
                }
                //页面访问量总量
                this.box[3].chartsdata.counts = counts
                //页面访问量总量
                countsNow = counts
                // 横坐标
                this.box[3].chartsdata.chartX = chartX
                // 纵坐标
                this.box[3].chartsdata.chartYNow = chartYNow
            }
            // 上周期
            if (dataBefore.length>0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    let dd = (parseInt(dataNow[i].nb_pageviews)/parseInt(dataNow[i].nb_visits))

                    chartYBefore.push(dd);
                    countsBefore += dd
                }
                // 纵坐标
                this.box[3].chartsdata.chartYBefore = chartYBefore
                if (chartYBefore==0) {
                      this.box[3].chartsdata.num = 0;
                      this.box[3].chartsdata.riseOrFall ='上升';
                }else{
                    if (countsNow-countsBefore>=0) {
                        num = ((countsNow-countsBefore)/countsBefore).toFixed(2);
                        this.box[3].chartsdata.num =num;
                        this.box[3].chartsdata.riseOrFall ='上升';
                    }else{
                        num = ((countsBefore - countsNow)/countsBefore).toFixed(2);
                        this.box[3].chartsdata.num =num;
                        this.box[3].chartsdata.riseOrFall ='下降';
                    }
                }
            }else{
                this.box[3].chartsdata.num =0;
                this.box[3].chartsdata.riseOrFall ='上升';
            }
        },
        newVistor(){//新访问用户量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length>0) {//有数据
                // 日期
                this.box[4].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  counts += dataNow[i].nb_uniq_visitors_newcoming
                  chartX.push(that.formatDate(dataNow[i]['datadate']))
                  chartYNow.push(dataNow[i].nb_uniq_visitors_newcoming)
                }
                //页面访问量总量
                this.box[4].chartsdata.counts = counts
                //页面访问量总量
                countsNow = counts
                // 横坐标
                this.box[4].chartsdata.chartX = chartX
                // 纵坐标
                this.box[4].chartsdata.chartYNow = chartYNow
            }
            // 上周期
            if (dataBefore.length>0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_uniq_visitors_newcoming);
                    countsBefore += dataBefore[i].nb_uniq_visitors_newcoming
                }
                // 纵坐标
                this.box[4].chartsdata.chartYBefore = chartYBefore
                if (chartYBefore==0) {
                      this.box[4].chartsdata.num = 0;
                      this.box[4].chartsdata.riseOrFall ='上升';
                }else{
                    if (countsNow-countsBefore>=0) {
                        num = ((countsNow-countsBefore)/countsBefore).toFixed(2);
                        this.box[4].chartsdata.num =num;
                        this.box[4].chartsdata.riseOrFall ='上升';
                    }else{
                        num = ((countsBefore - countsNow)/countsBefore).toFixed(2);
                        this.box[4].chartsdata.num =num;
                        this.box[4].chartsdata.riseOrFall ='下降';
                    }
                }
            }else{
                this.box[4].chartsdata.num = 0;
                this.box[4].chartsdata.riseOrFall ='上升';
            }
            // console.log(this.formatDate('2018-03-19'))
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
