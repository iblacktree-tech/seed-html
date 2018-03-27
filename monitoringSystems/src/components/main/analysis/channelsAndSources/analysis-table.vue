<template>
    <!-- partThree -->
    <div class="analysis-table main-item-box">
        <div class="chart-box">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{partThreeData.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='partThreeData.des'></i>
                </div>
                <div class="head-time">{{partThreeData.dates}}</div>
            </div> 
            <div class="tableBox">
                <v-table
                     is-horizontal-resize
                     style="width:100%"
                     :is-loading="isLoading"
                     :multiple-sort="multipleSort"
                     :columns="columns"
                     :table-data="tableData"
                     @sort-change="sortChange"
                     row-hover-color="#eee"
                     row-click-color="#edf7ff"
                ></v-table>

            </div>
        </div>
    </div>
</template>

<script>


export default {
    name : 'analysis-table',
    data() {
        return {
            imgUrl:'../../static/img/loading.png',
            isLoading: true,
            tableData: null,
            multipleSort:false,
            columns: [
                {field: 'label', title: '访问来源', width: 50, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                {field: 'nb_uniq_new_visitors', title: '新访问用户量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'nb_uniq_visitors', title: '访问用户量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'nb_new_users', title: '新登录用户量',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'nb_users', title: '登录用户量',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'avg_time_on_site', title: '平均访问时长',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'nb_pageviews', title: '每次访问页面浏览量',width: 100, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                {field: 'bounce_rate', title: '跳出率',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true}
            ]
        }
    },
    computed:{
      chartLoading(){
          return this.$store.state.analysis.chartLoading;
      }
    },
    props:['partThreeData'],
    // props:{partThreeData:'partThreeData'},
    mounted(){
        this.init()
    },
    created(){
        this.request();
    },
    watch: {

    },

    methods:{
        init(){
           // console.log(this.partThreeData)
        },
        // 获取 table 组件每次操作后的参数（重新去请求数据）
        sortChange(params){
            // console.log(params)
        },
        request(){
            this.isLoading = true;



            var r = Math.random();

            setTimeout(x => {
                this.isLoading = false;

                if (r > 0.9) {
                    this.tableData = null;
                } else {
                    this.tableData = this.partThreeData.tables
                    console.log(this.partThreeData.tables)
                }
            }, 3000);
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
    .tableBox>.v-table-views{
        border-left:0;
        border-right:0;
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
      height: auto;
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
      padding: 10px 10px 15px 15px;
     
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

    .tableBox{
        width: 100%;
    }
</style>
