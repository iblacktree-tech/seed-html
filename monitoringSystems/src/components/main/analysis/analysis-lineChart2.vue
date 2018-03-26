<template>
    <!-- 折线图 -->
    <div class="analysis-lineChart main-item-box">
        <div class="chart-box">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{chartdates.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='chartdates.des'></i>
                </div>
                <div class="head-time">{{chartdates.dates}}</div>
            </div> 
            <!-- 指标对比 -->
            <div class="chart-duibi-info" v-show='!chartdates.isNull'>
                <div class="gr-chart-aggregate-inner">
                    <div class="chart-aggregate-percent">
                        <div class="chart-trend ">
                            {{chartdates.counts}}
                        </div>
                        <span class="chart-trend-desc">{{chartdates.cycle}}</span>
                    </div>
                </div>
            </div>  
            
            <!-- 图表 -->
            <div class="echart-box" :id="chartdates.id" :style="{width:this.chartWidth}" v-show='!chartdates.isNull' :class='{"chartShow":chartLoading=="hide"}'> 
            </div>
            <div class="echart-center" v-show='chartdates.isNull&&chartLoading=="hide"'>暂无数据</div>
            <img alt="" class="loading" :src="imgUrl" v-show="chartLoading=='show'">
        </div>
    </div>
</template>

<script>


export default {
    name : 'analysis-lineChart',
    data() {
        return {
          imgUrl:'../../static/img/loading.png',
        }
    },
    computed:{
      chartLoading(){
          return this.$store.state.analysis.chartLoading;
      },
      charts(){
          return this.$store.state.analysis.charts;
      }
    },
    props:['chartdates'],
    // props:{chartdates:'chartdates'},
    mounted(){
        this.chartWidth()
    },
    watch: {
       chartLoading(){

        // console.log(this.chartLoading)
          if (this.chartLoading =="hide") {
              this.drawLine()
          }
       }
    },

    methods:{
        chartWidth(){
            this.chartWidth = $("#"+this.chartdates.id).siblings('.chart-duibi-info').width()
            // if (this.charts.length!=0) {
            //     this.charts[this.chartdates.id].init()  
            // }
            this.drawLine()
            // console.log(this.chartWidth)
        },
        drawLine(){
          // console.log(this.chartLoading)
          var that = this;
            // console.log(this.chartdates.chartX)
            // 基于准备好的dom，初始化echarts实例
            if (this.chartdates.id==''||this.chartdates.id==null) return;

            var myChart = this.$echarts.init(document.getElementById(that.chartdates.id))
            // console.log(myChart)
            // 绘制图表
            myChart.setOption({
                // 给echarts图设置背景色
                backgroundColor: '#FBFBFB',                    
                calculable: true,
                grid: {
                    right: '5%',
                    top: 20
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: { 
                    // align: 'center', //水平方向位置
                    // verticalAlign: 'bottom', //垂直方向位置
                    x: 'center', //距离x轴的距离
                    y: 'bottom', //距离Y轴的距离
                    data:['当前周期','上一周期']
                },
                xAxis: [{
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel:{
                        color: '#000'
                    },
                    type: 'category',
                    boundaryGap: false,
                    // data: ['17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一','17/05 周一'],
                    data: this.chartdates.chartX,
                }],
                yAxis: [{
                    // show: false,
                    type: 'value',
                    axisLine:{
                        show : false
                    },
                    splitLine:{
                        lineStyle:{
                            type: 'dotted'
                        }
                    }
                }],
                axisLine: {
                    lineStyle: {
                        color: '#CECECE'
                     }
                 },
                series: [{
                    name: '当前周期',
                    type: 'line',
                    color:['rgb(255, 70, 131)'],
                    // symbol:'none',
                    // data: [800, 300, 500, 800, 300, 600, 500, 600,200],
                    data: this.chartdates.chartYNow,
                    areaStyle: { 
                        //渐变色
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 70, 131)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 158, 68)'
                            }])
                        }
                    }
                }, {
                    name: '上一周期',
                    type: 'line',
                    color:['#cccccc'],
                    // symbol:'none',
                    // data: [600, 300, 400, 200, 300, 300, 200, 400,800]
                    data:  this.chartdates.chartYBefore
                }]
            },true);
            // 用于宽度自适应
            this.charts.push(myChart);

            this.$store.commit('overviewData',{
                charts : this.charts
            })
            // main-item-box 提示hover 显示
            $('.analysis-lineChart').find('[data-toggle="tooltip"]').tooltip()
        }
    },
    components:{
        
        
    } 
   
}
</script>

<style scoped>
    .loading{
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:-25px;
        margin-top: -25px;
        z-index: 50;
        -webkit-animation: load 2s infinite ease;
        animation: load 2s infinite ease;
    }
    .chartShow{
        opacity: 1 !important;
    }
    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .main-item-box{
      border: 1px solid #dae2e5;
      height: 270px;
    }
    .main-box-container>div{
      padding:5px;
    }


    /*main-item-box内容*/

    .chart-box{
      position: relative;
      height: 100%;
      width: 100%;
      background-color: #fff;
      padding: 10px 10px 0 15px;
     
    }


    .chart-head-wrapper{
      height: 40px;
      /*overflow: hidden;*/
      text-align: left;
    }

    .chart-head-title{
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
    .head-time{
      color: #999;
      font-size: 12px;
    }
    .tishi-box{
      color: rgb(153, 153, 153);
      border:0 !important;
      background-color: transparent !important;
      /*vertical-align: middle;*/
    }
    .tooltip.top {
        /*padding: 5px 0;*/
        margin-top: -3px;
    }
    .tooltip-inner{
      max-width: 240px;
      padding: 6px 8px;
    }



    .chart-overview-wrapper{
        height: calc(100% - 40px);
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .chart-duibi-info{
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: right;
      position: relative;
      z-index: 5;
    }
    .chart-aggregate-percent{
      display: inline-block;
      margin-left: 6px;
      font-size: 12px;
      position: relative;
      top: -36px;
      line-height: 1;
          text-align: right;
    }
    .chart-trend{
      font-size: 20px;
      line-height: 20px;
    }

    .chart-trend-desc{
        font-size: 12px;
        color: #9698a3;
    }
    .echart-box{
      height: 183px;
      width: 100%;
      opacity: 0;
      /*margin-top: -30px;*/
    }

    .echart-box2{
      height: 218px;
      /*margin-top: -20px;*/
    }

    .echart-center{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      color: rgb(153, 153, 153);
      font-size: 16px;
      font-weight: 200;
      text-align: center;
    }

    .echart-textBox{
        text-align: center;
        white-space: nowrap;
        position: absolute;
        top: 62px;
        left: 50%;
        transform: translate(-50%,0);
        visibility: visible;
    }

    .echart-textP1{
        color: #999;
        font-size: 12px;
    }

    .echart-textP2{
        color: #333;
        font-size: 22px;
    }
</style>
