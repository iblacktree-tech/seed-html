<template>
    <!-- 一行两个 -->
    <div class="overview-barChart main-item-box">
      <div class="chart-box">
          <!-- 标题 时间 -->
          <div class="chart-head-wrapper">
              <div class="chart-head-title">
                  {{chartdates.title}}
                <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='chartdates.des'></i>
              </div>
              <div class="head-time">{{chartdates.dates}}</div>
          </div> 
          <!-- 图表 -->
          <div class="echart-box" :id="chartdates.id" v-show='!chartdates.isNull' :class='{"chartShow":chartLoading=="hide"}'>
              
          </div>
          <div class="echart-center" v-show='chartdates.isNull&&chartLoading=="hide"'>暂无数据</div>
          <img alt="" class="loading" :src="imgUrl" v-show="chartLoading=='show'">
      </div>
    </div>
</template>

<script>
// var echarts = require('echarts');
export default {
    name : 'overview-barChart',
    data() {
        return {
            imgUrl:'../../static/img/loading.png'
        }
    },
    computed:{
        chartLoading(){
            return this.$store.state.overview.chartLoading;
        },
        charts(){
            return this.$store.state.overview.charts;
        }
    },
    props:['chartdates'],
    mounted(){
       // this.drawLine();
    },
    props:['chartdates'],
    watch: {
       chartLoading(){
         // console.log(11111)
           if (this.chartLoading =="hide") {
               this.drawLine()
           }
        }

    },
    methods:{
        drawLine(){
            var that =this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById(this.chartdates.id))
            // 定义样式和数据
            // 计算百分比
            var sum = 0;
            for (var x in this.chartdates.chartX){
              sum+= parseInt(this.chartdates.chartX[x])
              // console.log(x)
            }

             myChart.setOption({
                  tooltip: {
                    show:true
                  },
                  legend: {
                      show:false
                  },
                  grid: {
                      right: '5%',
                      top: 20,
                      left:5,
                      bottom:20,
                      containLabel: true
                  },
                  xAxis: {
                    position: "top",
                      type: 'value',
                      boundaryGap: [0, 0.01],
                      axisLine:{
                        show:false
                      },
                      axisTick:{
                        show:false
                      },
                      splitLine:{
                        lineStyle:{
                          type: 'dotted'
                        }
                      }
                  },
                  yAxis: {
                      type: 'category',
                      axisLine:{
                        lineStyle:{
                          color:"#cccccc"
                        }
                      },
                      axisTick:{
                        alignWithLabel:true
                      },
                      axisLabel: {        
                            show: true,
                            interval:0,
                            color: "#000000",
                            align: 'right',
                            formatter: function (value, index) {
                              
                              if (value !=null&&value !='') {
                                // console.log(value.substring(0,10))
                                return value.substring(0,15)
                              }
                                
                            }
                        },
                      // data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                      data: that.chartdates.chartY
                  },
                  series: [
                      {
                          name: '2011年',
                          type: 'bar',
                          data: that.chartdates.chartX,
                          // data: [18203, 23489, 29034, 104970, 131744, 630230],
                          label: {
                                normal: {
                                    show: true,
                                    formatter: function(params){
                                      // return params.value + "("+ (params.value/sum *100).toFixed(2) +"%)"
                                      params.value + "("+ (params.value/sum *100).toFixed(2) +"%)"
                                    },
                                    position: 'right',
                                    color:"#000000"
                                }
                            },
                            barWidth: 10,
                            

                          color:['#90EC7D']
                      }
                  ]
              });
             // 只有一个数据
             if (this.chartdates.chartY !=''&&this.chartdates.chartY !=null) {
                if (this.chartdates.chartY.length==1) {
                    myChart.setOption({
                      series: [{
                       barWidth:'auto',
                       barMaxWidth:80,
                      }]
                    })
                }
             }
             // 用于宽度自适应
             this.charts.push(myChart);
                         
             this.$store.commit('overviewData',{
                 charts : this.charts
             })
        }
    },
    components:{
        // ovDateModal : ovDateModal
    }
}
</script>

<style scoped>
    .main-item-box{
      border: 1px solid #dae2e5;
      height: 270px;
    }
    .main-box-container>div{
      padding:5px;
    }
    .chartShow{
        opacity: 1!important;
    }
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

    .chart-aggregate-num{
          display: inline-block;
        font-family: PingFangSC;
        margin-left: 6px;
        font-size: 24px;
        color: #333;
    }


    .suffix{
      font-size: 18px;
        vertical-align: middle;
    }

    .chart-aggregate-percent{
      display: inline-block;
      margin-left: 6px;
      font-size: 12px;
      position: relative;
      top: -2px;
      line-height: 1;
          text-align: right;
    }
    .chart-trend{
      font-size: 18px;
      line-height: 18px;
    }
    .chart-trend-up{
      color: #28c29b;
    }

    .chart-trend-down{
      color: #f25252;
    }

    .chart-trend-desc{
        font-size: 12px;
        color: #9698a3;
    }

    svg:not(:root) {
        overflow: hidden;
    }
    .svg-icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: middle;
        margin-right: -5px;
    }

    .echart-box{
      height: 183px;
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
