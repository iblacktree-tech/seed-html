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
            chartsSum: this.overData,
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
                        id : "1",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
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
                        id : "2",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
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
                        id : "3",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
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
                        id : "4",
                        chartX:[],
                        chartYNow:[],
                        chartYBefore:[],
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
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
                      id : "5",
                      chartX:[],
                      chartYNow:[],
                      chartYBefore:[],
                      isNull: false, //是否显示暂无数据
                      chartWidth: 0//宽度
                    }
                },
                {
                    c:'col-xs-6',
                    chartsdata:{
                        title: "页面（URL）进入量前10名",//标题
                        des: "页面（URL）进入量前10名",//描述
                        dates:"",//日期
                        id : "6",
                        chartX:[],
                        chartY:[],
                        isOnlyOne:false, //是否只有一组数据
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
                    }
                },
                {
                    c:'col-xs-6',
                    chartsdata:{
                      title: "站外搜索搜索词进入量前10名",//标题
                      des: "站外搜索搜索词进入量前10名",//描述
                      dates:"",//日期
                      id : "7",
                      chartX:[],
                      chartY:[],
                      isNull: false, //是否显示暂无数据
                      chartWidth: 0//宽度
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "访问用户一级访问来源",//标题
                      des: "访问用户一级访问来源",//描述
                      dates:"",//日期
                      id : "8",
                      chartName:[],
                      chartValue:[],
                      isNull: false, //是否显示暂无数据
                      chartWidth: 0//宽度
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "广告来源访问用户量前10名",//标题
                      des: "广告来源访问用户量前10名",//描述
                      dates:"",//日期
                      id : "9",
                      chartX:[],
                      chartY:[],
                      isNull: false, //是否显示暂无数据
                      chartWidth: 0//宽度
                    }
                },
                {
                    c:'col-xs-4',
                    chartsdata:{
                      title: "城市名称访问用户量前10名",//标题
                      des: "城市名称访问用户量前10名",//描述
                      dates:"",//日期
                      id : "10",
                      chartX:[],
                      chartY:[],
                      isNull: false, //是否显示暂无数据
                      chartWidth: 0//宽度
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
        },
        charts(){
            return this.$store.state.overview.charts;
        }
    },
    watch: {
       chartsData(){ // chartdata 数据变化监听
        // console.log(111199999)

           // console.log(this.chartsData) 
           for (var i = 0; i < this.box.length; i++) {
             this.box[i].chartsdata.isNull = false
           }

           this.visits()
           this.uniq_visitors()
           this.pageOnces()
           this.newVistor()
           this.urlTop10()
           this.keywords()
           this.firstSource()
           this.refererlev1()
           this.citytop10()
           this.pageviews()
       }
    },
    methods:{
        pageviews(){//页面浏览量
            var that = this
            let dataNow = this.chartsData.data1.data
            // console.log( this.chartsData)
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]
            // console.log( dataBefore)
            if (dataNow.length==0&&dataBefore.length==0) {
              // console.log(2222)
                this.box[0].chartsdata.isNull=true //是否显示暂无数据
            }
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[0].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  if ('nb_pageviews' in dataNow[i]) {
                      counts += dataNow[i].nb_pageviews
                  }else{
                      counts +=0
                  }
                  
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
            if (dataBefore.length!=0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_pageviews);
                    if ('nb_pageviews' in dataBefore[i]) {
                        countsBefore += dataBefore[i].nb_pageviews
                    }else{
                        countsBefore +=0
                    }
                    
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


            // console.log(this.formatDate('2018-03-19'))
            // 用于 图表loading隐藏 图表显示
            this.$store.commit('overviewData',{
                chartLoading : 'hide'
            })
            
        },
        visits(){//网站访问量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[1].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  if ('nb_visits' in dataNow[i]) {
                      counts += dataNow[i].nb_visits
                  }else{
                      counts +=0
                  }
                  // counts += dataNow[i].nb_visits
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
            if (dataBefore.length!=0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_visits);
                    // countsBefore += dataBefore[i].nb_visits
                    if ('nb_visits' in dataBefore[i]) {
                        countsBefore += dataBefore[i].nb_visits
                    }else{
                        countsBefore +=0
                    }
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
            if (dataNow.length==0&&dataBefore.length==0) {
                this.box[1].chartsdata.isNull=true //是否显示暂无数据
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
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[2].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  if ('nb_uniq_visitors' in dataNow[i]) {
                      counts += dataNow[i].nb_uniq_visitors
                  }else{
                      counts +=0
                  }
                  // counts += dataNow[i].nb_uniq_visitors
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
            if (dataBefore.length!=0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_uniq_visitors);
                    // countsBefore += dataBefore[i].nb_uniq_visitors
                    if ('nb_uniq_visitors' in dataBefore[i]) {
                        countsBefore += dataBefore[i].nb_uniq_visitors
                    }else{
                        countsBefore +=0
                    }
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
            if (dataNow.length==0&&dataBefore.length==0) {
                this.box[2].chartsdata.isNull=true //是否显示暂无数据
            }
        },
        pageOnces(){//每次访问页面浏览量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[],dd=0

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[3].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  if ('nb_pageviews' in dataNow[i]) {
                      dd = (parseInt(dataNow[i].nb_pageviews)/parseInt(dataNow[i].nb_visits)) +''
                      dd=  dd.substr(0,dd.indexOf(".")+3) /1
                  }else{
                      dd =0
                  }
                  
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
            if (dataBefore.length!=0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                  if ('nb_pageviews' in dataBefore[i]) {
                      dd = (parseInt(dataBefore[i].nb_pageviews)/parseInt(dataBefore[i].nb_visits)) +''
                      dd=  dd.substr(0,dd.indexOf(".")+3) /1
                  }else{
                      dd =0
                  }
                  
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
            if (dataNow.length==0&&dataBefore.length==0) {
                this.box[3].chartsdata.isNull=true //是否显示暂无数据
            }
        },
        newVistor(){//新访问用户量趋势
            var that = this
            let dataNow = this.chartsData.data1.data
            let dataBefore = this.chartsData.data2.data
            let counts = 0,countsNow = 0,countsBefore = 0,num=0,riseOrFall='',chartX=[],chartYNow=[],chartYBefore=[]

            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[4].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  if ('nb_uniq_visitors_newcoming' in dataNow[i]) {
                      counts += dataNow[i].nb_uniq_visitors_newcoming
                  }else{
                      counts +=0
                  }
                  // counts += dataNow[i].nb_uniq_visitors_newcoming
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
            if (dataBefore.length!=0) {//有数据
                for (var i = 0; i < dataBefore.length; i++) {
                    chartYBefore.push(dataBefore[i].nb_uniq_visitors_newcoming);
                    // countsBefore += dataBefore[i].nb_uniq_visitors_newcoming
                    if ('nb_uniq_visitors_newcoming' in dataBefore[i]) {
                        countsBefore += dataBefore[i].nb_uniq_visitors_newcoming
                    }else{
                        countsBefore +=0
                    }
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
            if (dataNow.length==0&&dataBefore.length==0) {
                this.box[4].chartsdata.isNull=true //是否显示暂无数据
            }
            // console.log(this.formatDate('2018-03-19'))
        },
        urlTop10(){//页面（URL）进入量前10名
            var that = this
            let dataNow = this.chartsData.data1.urls
            let chartX=[],chartY=[]
            // console.log(dataNow)
            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[5].chartsdata.dates = dataNow[dataNow.length-1].datadate
                for (var i = 0; i < dataNow.length; i++) {
                  // counts += dataNow[i].nb_uniq_visitors_newcoming
                  chartX.unshift(dataNow[i]['nb_hits'])
                  chartY.unshift(dataNow[i].label)
                }
                // 横坐标
                this.box[5].chartsdata.chartX = chartX
                // 纵坐标
                this.box[5].chartsdata.chartY = chartY
            }else{//暂无数据
                this.box[5].chartsdata.isNull = true
            }
            // console.log(this.box[5].chartsdata)
        },
        keywords(){//站外搜索搜索词进入量前10名
            var that = this
            let dataNow = this.chartsData.data1.keywords
            let chartX=[],chartY=[]
            // console.log(dataNow)
            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[6].chartsdata.dates = dataNow[dataNow.length-1].datadate
                for (var i = 0; i < dataNow.length; i++) {
                  // counts += dataNow[i].nb_uniq_visitors_newcoming
                  chartX.unshift(dataNow[i]['nb_visits'])
                  chartY.unshift(dataNow[i].label)
                }
                // 横坐标
                this.box[6].chartsdata.chartX = chartX
                // 纵坐标
                this.box[6].chartsdata.chartY = chartY
            }else{//暂无数据
                this.box[6].chartsdata.isNull = true
            }
            // console.log(this.box[6].chartsdata)
        },
        firstSource(){//访问用户一级访问来源
            var that = this
            let dataNow = this.chartsData.data1.refererlev1
            // console.log( this.chartsData)
            let chartName = [],chartValue = []
            
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[7].chartsdata.dates = dataNow[dataNow.length-1].datadate

                for (var i = 0; i < dataNow.length; i++) {
                  chartValue.unshift(dataNow[i]['nb_uniq_visitors'])
                  chartName.unshift(dataNow[i].label)
                }
                // 类型
                this.box[7].chartsdata.chartName = chartName
                // 值
                this.box[7].chartsdata.chartValue = chartValue
            }else{
                this.box[7].chartsdata.isNull=true //是否显示暂无数据
            }
            
        },
        refererlev1(){//广告来源访问用户量前10名
            var that = this
            // let dataNow = this.chartsData.data1.refererlev12
            let dataNow = []//暂时
            let chartX=[],chartY=[]
            // console.log(dataNow)
            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[8].chartsdata.dates = dataNow[dataNow.length-1].datadate
                for (var i = 0; i < dataNow.length; i++) {
                  // counts += dataNow[i].nb_uniq_visitors_newcoming
                  chartX.unshift(dataNow[i]['nb_uniq_visitors'])
                  chartY.unshift(dataNow[i].label)
                }
                // 横坐标
                this.box[8].chartsdata.chartX = chartX
                // 纵坐标
                this.box[8].chartsdata.chartY = chartY
            }else{//暂无数据
                this.box[8].chartsdata.isNull = true
            }
            // console.log(this.box[8].chartsdata)
        },
        citytop10(){//广告来源访问用户量前10名
            var that = this
            let dataNow = this.chartsData.data1.citytop10
            let chartX=[],chartY=[]
            // console.log(dataNow)
            // console.log(this.chartsData.data1.data)
            // 本周期
            if (dataNow.length!=0) {//有数据
                // 日期
                this.box[9].chartsdata.dates = dataNow[dataNow.length-1].datadate
                for (var i = 0; i < dataNow.length; i++) {
                  // counts += dataNow[i].nb_uniq_visitors_newcoming
                  chartX.unshift(dataNow[i]['nb_visits'])
                  chartY.unshift(dataNow[i].label)
                }
                // 横坐标
                this.box[9].chartsdata.chartX = chartX
                // 纵坐标
                this.box[9].chartsdata.chartY = chartY
            }else{//暂无数据
                this.box[9].chartsdata.isNull = true
            }
            // console.log(this.box[9].chartsdata)
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
