<template>
    <!--partTwo 柱状图 -->
    <div class="landingPage-barChart main-item-box">
        <div class="chart-box">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{partOneData.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='partOneData.des'></i>
                </div>
                <div class="head-time">{{partOneData.dates}}</div>
            </div>             
            <!-- 图表 -->
            <div class="echart-box" :id="partOneData.id" :style="{width:this.chartWidth}" v-show='!partOneData.isNull' :class='{"chartShow":chartLoading=="hide"}'> 
            </div>
            <div class="echart-center" v-show='partOneData.isNull&&chartLoading=="hide"'>暂无数据</div>
            <img alt="" class="loading" :src="imgUrl" v-show="chartLoading=='show'">
        </div>
    </div>
</template>

<script>


export default {
    name : 'landingPage-barChart',
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
    props:['partOneData'],
    // props:{partOneData:'partOneData'},
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
            this.chartWidth = $('#'+this.partOneData.id).siblings('.chart-head-wrapper').width()
            // console.log(this.chartWidth)
            // if (this.charts.length!=0) {
            //     this.charts[this.partOneData.id].init()  
            // }
            this.drawLine()
            // console.log(this.chartWidth)
        },
        drawLine(){
          // console.log(this.chartLoading)
          var that = this;
            // 基于准备好的dom，初始化echarts实例
            if (this.partOneData.id==null||this.partOneData.id=='') return;
            // console.log(this.partOneData.id +'aaa')
            var myChart = this.$echarts.init(document.getElementById(that.partOneData.id))
            // console.log(myChart)
            // 计算百分比
            var sum = 0;
            for (var x in this.partOneData.chartX){
              sum+= parseInt(this.partOneData.chartX[x])
              // console.log(x)
            }
            // 绘制图表
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
                      data: that.partOneData.chartY
                  },
                  series: [
                      {
                          name: '2011年',
                          type: 'bar',
                          data: that.partOneData.chartX,
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
            if (this.partOneData.chartY !=''&&this.partOneData.chartY !=null) {
               if (this.partOneData.chartY.length==1) {
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

            this.$store.commit('analysisData',{
                charts : this.charts
            })
            // main-item-box 提示hover 显示
            $('.landingPage-barChart').find('[data-toggle="tooltip"]').tooltip()
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
