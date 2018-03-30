<template>
    <!-- partThree -->
    <div class="userRetention-table main-item-box">
        <div class="chart-box">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{partTwoData.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='partTwoData.des'></i>
                </div>
                <div class="head-time">{{partTwoData.dates}}</div>
            </div> 
            <div class="tableBox" :id="partTwoData.id">
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
                     :column-cell-class-name="columnCellClass"
                ></v-table>

            </div>
        </div>
    </div>
</template>

<script>


export default {
    name : 'userRetention-table',
    data() {
        return {
            imgUrl:'../../static/img/loading.png',
            isLoading: true,
            tableData: null,
            multipleSort:false,
            columns: [
                
            ]
        }
    },
    computed:{
      chartLoading(){
          return this.$store.state.analysis.chartLoading;
      }
    },
    props:['partTwoData'],
    // props:{partTwoData:'partTwoData'},
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
              this.columns = this.partTwoData.thData
        },
        // 获取 table 组件每次操作后的参数（重新去请求数据）
        sortChange(params){
            console.log(params)
        },
        columnCellClass(rowIndex,columnName,rowData){
            // 给一行column为‘hobby’的列设置className
            if (rowIndex === 1 && columnName==='nb_visits'){

                return 'td-bg1';
            }

            // 给第二行设置className
            if (rowIndex ===1){

                return 'td-bg2';
            }

        },
        request(){
            this.isLoading = true;



            var r = Math.random();

            setTimeout(x => {
                this.isLoading = false;

                if (r > 0.9) {
                    this.tableData = null;
                } else {
                    this.tableData = this.partTwoData.tables
                    // console.log(this.partTwoData.tables)
                }
            }, 3000);
        }
    },
    components:{
        
        
    } 
   
}
</script>

<style scoped>
    .td-bg1{
        background-color: #187;
    }
    .td-bg2{
        background-color: #ccc;
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
