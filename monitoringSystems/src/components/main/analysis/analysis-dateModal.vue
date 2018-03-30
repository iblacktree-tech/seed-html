<template>
    <!-- <div class="analysis-dateModal"> -->
        <!-- 右侧导航 日期弹框 -->
        <!-- <div class="top-choosedate-tankuang" > -->
          <div class="tankuang-box">
            <div class="tankuang-container">
              <div v-for="(item,index) in dateItems" class="tankuang-item" @click="choseDate(index)" :class="{'active':index ==modalDateItemActive }">
                  <div class="itemLeft pull-left"><span>{{item.itemName}}</span> </div>
                  <div class="itemRight pull-right">
                      <p v-show="index==0||index==1" class="dataP2">{{item.thisCycle.from}}</p>
                      <div class="rightBox" v-show="index!=0&&index!=1">
                          <div class="dataLeft pull-left">
                              <p class="dataP ">{{item.thisCycle.from}}</p>
                              <p class="dataP pFont">{{item.week.from}}</p>
                          </div> 
                          <span class="dataSpan pull-left">:</span>
                          <div class="dataRight pull-right">
                             <p class="dataP ">{{item.thisCycle.to}}</p>
                             <p class="dataP pFont">{{item.week.to}}</p> 
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
    <!-- </div> -->
</template>

<script>
export default {
    name : 'analysis-dateModal',
    data() {
        return {
            modalDateItemActive:1,
            dateItems:[
                {itemName :"今天", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"day"},
                {itemName :"昨天", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"day"},
                {itemName :"本周", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"day"},
                {itemName :"上周", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"day"},
                {itemName :"本月", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"week"},
                {itemName :"上月", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"week"},
                {itemName :"今年", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"month"},
                {itemName :"去年", thisCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."},period:"month"}
            ]

        }
    },
    computed:{
        webId(){
            return this.$store.state.webManages.webId;
        }
    },
    mounted: function () {
      this.dates()
    },
    created(){
      // this.dates()
    },
    methods:{
        // 选择日期函数
        choseDate(index){
            // 更改标签上的 日期显示
            this.$store.commit('analysisData',{
                modalDateChose : this.dateItems[index].itemName
            })
            // 用于 图表loading隐藏 图表显示
            this.$store.commit('analysisData',{
                chartLoading : 'show'
            })
            // // 关闭弹框
            // this.$store.commit('analysisData',{
            //     modalDateChose : this.dateItems[index].itemName
            // })
            // 颜色更换
             this.modalDateItemActive = index;
             // this.dataShow();

            
             
            let days = this.dateItems[index].thisCycle.from +","+this.dateItems[index].thisCycle.to
            let period = this.dateItems[index].period
            // 会话存贮
            sessionStorage.setItem('days',days)
            sessionStorage.setItem('period',period)
            // 请求数据
            this.$store.commit('analysisData',{
                chartTime : days
            })
        },
        //获取本周，上周等开始结束日期函数
        dates(){
          var that =this;
          var now = new Date(); //当前日期
          var nowDayOfWeek = now.getDay(); //今天本周的第几天
          var nowDay = now.getDate(); //当前日
          var nowMonth = now.getMonth(); //当前月
          var nowYear = now.getYear(); //当前年
          nowYear += (nowYear < 2000) ? 1900 : 0; //
          nowDayOfWeek = nowDayOfWeek==0?7:nowDayOfWeek; // 如果是周日，就变成周七
          var lastMonthDate = new Date(); //上月日期
          lastMonthDate.setDate(1);
          lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
          var lastYear = lastMonthDate.getYear();
          var lastMonth = lastMonthDate.getMonth();

          var datesDate = {};

          function formatDate(date) {
              var myyear = date.getFullYear();
              var mymonth = date.getMonth() + 1;
              var myweekday = date.getDate();
              if (mymonth < 10) {
                  mymonth = "0" + mymonth;
              }
              if (myweekday < 10) {
                  myweekday = "0" + myweekday;
              }
              var weekDate = new Array("Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.");
              var week = new Date(date).getDay(); 
              // console.log(1111)
              datesDate={
                 weeks: weekDate[week],
                 days : myyear + "-" + mymonth + "-" + myweekday
              } 
              // console.log(datesDate)
              return datesDate

          }
          //获得某月的天数
          function getMonthDays(myMonth) {
              var monthStartDate = new Date(nowYear, myMonth, 1);
              var monthEndDate = new Date(nowYear, myMonth + 1, 1);
              var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
              return days;
          }
          //今天
          function toDay(){
            // that.datesDate.toDay =formatDate(now);
            that.dateItems[0]["thisCycle"]['from'] = formatDate(now).days
            that.dateItems[0]["thisCycle"]['to'] = formatDate(now).days
            that.dateItems[0]["week"]['from'] = formatDate(now).weeks
            that.dateItems[0]["week"]['to'] = formatDate(now).weeks
          };

          //昨天
          function yesTerDay(){
           var getYesterdayDate = new Date(nowYear, nowMonth, nowDay - 1);
           // return formatDate(getYesterdayDate)
           // that.datesDate.yesTerDay =formatDate(getYesterdayDate);
           that.dateItems[1]["thisCycle"]['from'] = formatDate(getYesterdayDate).days
           that.dateItems[1]["thisCycle"]['to'] = formatDate(getYesterdayDate).days
           that.dateItems[1]["week"]['from'] = formatDate(getYesterdayDate).weeks
           that.dateItems[1]["week"]['to'] = formatDate(getYesterdayDate).weeks
          };
          //获得本周的开始日期
          function getWeekStartDate() {
              var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek +1);
              that.dateItems[2]["thisCycle"]['from'] = formatDate(weekStartDate).days
              that.dateItems[2]["week"]['from'] = formatDate(weekStartDate).weeks
          }
          //获得本周的结束日期
          function getWeekEndDate() {
              var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek +1));
              that.dateItems[2]["thisCycle"]['to'] = formatDate(weekEndDate).days
              that.dateItems[2]["week"]['to'] = formatDate(weekEndDate).weeks
          }
          //获得上周的开始日期
          function getLastWeekStartDate() {
              var lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7 +1);
              that.dateItems[3]["thisCycle"]['from'] = formatDate(lastWeekStartDate).days
              that.dateItems[3]["week"]['from'] = formatDate(lastWeekStartDate).weeks
          }
          //获得上周的结束日期
          function getLastWeekEndDate() {
              var lastWeekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1 +1);
              that.dateItems[3]["thisCycle"]['to'] = formatDate(lastWeekEndDate).days
              that.dateItems[3]["week"]['to'] = formatDate(lastWeekEndDate).weeks
          }
          //获得本月的开始日期
          function getMonthStartDate() {
              var monthStartDate = new Date(nowYear, nowMonth, 1);
              that.dateItems[4]["thisCycle"]['from'] = formatDate(monthStartDate).days
              that.dateItems[4]["week"]['from'] = formatDate(monthStartDate).weeks
          }
          //获得本月的结束日期
          function getMonthEndDate() {
              var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
              that.dateItems[4]["thisCycle"]['to'] = formatDate(monthEndDate).days
              that.dateItems[4]["week"]['to'] = formatDate(monthEndDate).weeks
          }
          //获得上月开始时间
          function getLastMonthStartDate() {
              var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
              that.dateItems[5]["thisCycle"]['from'] = formatDate(lastMonthStartDate).days
              that.dateItems[5]["week"]['from'] = formatDate(lastMonthStartDate).weeks
          }
          //获得上月结束时间
          function getLastMonthEndDate() {
              var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
              that.dateItems[5]["thisCycle"]['to'] = formatDate(lastMonthEndDate).days
              that.dateItems[5]["week"]['to'] = formatDate(lastMonthEndDate).weeks
          }
          // 今年开始
          function getYearStart() {
            var getYesterStart = new Date(nowYear, 0, 1);
            that.dateItems[6]["thisCycle"]['from'] = formatDate(getYesterStart).days
            that.dateItems[6]["week"]['from'] = formatDate(getYesterStart).weeks
          }
          // 今年结束
          function getYearEnd() {
            var getYesterEnd = new Date(nowYear, 11, 31);
            that.dateItems[6]["thisCycle"]['to'] = formatDate(getYesterEnd).days
            that.dateItems[6]["week"]['to'] = formatDate(getYesterEnd).weeks
          }
          // 去年开始
          function getLastYearStart() {
            var getLastYesterStart = new Date(nowYear-1, 0, 1);
            that.dateItems[7]["thisCycle"]['from'] = formatDate(getLastYesterStart).days
            that.dateItems[7]["week"]['from'] = formatDate(getLastYesterStart).weeks
          }
          // 去年结束
          function getLastYearEnd() {
            var getLastYesterEnd = new Date(nowYear-1, 11, 31);
            that.dateItems[7]["thisCycle"]['to'] = formatDate(getLastYesterEnd).days
            that.dateItems[7]["week"]['to'] = formatDate(getLastYesterEnd).weeks
          }
          function init(){
            toDay();
            yesTerDay();
            getWeekStartDate();
            getWeekEndDate();
            getLastWeekStartDate();
            getLastWeekEndDate();
            getMonthStartDate();
            getMonthEndDate();
            getLastMonthStartDate();
            getLastMonthEndDate();
            getYearStart();
            getYearEnd();
            getLastYearStart();
            getLastYearEnd();
          } 
          init();

          this.$store.commit('analysisData',{
              chartTime : this.dateItems[1].thisCycle.from +","+this.dateItems[1].thisCycle.to
          })
        }
        
    }
}
</script>

<style scoped>

/*   .top-choosedate-tankuang{
     z-index: 100;
     position: absolute;
     right: 30px;
   }*/

   /*.tankuang-box{
     display: block;
     font-size: 12px;
     font-weight: 400;
     line-height: 1.5;
     float: right;
   }*/
   .tankuang-box{
     position: absolute;
     top: 105px;
     right: 37px;
     width: 300px;
     height: 410px;
     background-color: #fff;
     border: 1px solid #dae2e5;
     padding: 7px 10px;
     box-shadow: 0 0 4px rgba(0,0,0,.17);
     border: 1px solid #d9d9d9;
     z-index: 100;
   }

   .tankuang-container {
       width: 100%;
       float: right;
   }

   .tankuang-item{
     padding: 5px 10px 0;
     box-sizing: border-box;
     font-size: 14px;
     cursor: pointer;
     text-align: left;
     height: 50px;
     border-bottom: 1px solid #d9d9d9;
   }
   .tankuang-item:last-child{
    border-bottom: 0px;
   }
   .tankuang-item:hover{
      color: #ea6947;
   }
   .tankuang-item.active{
     /*border-left: 2px solid #ea6947;*/
     color: #ea6947;
   }
   .rightBox{
        overflow:hidden;
   }
   .itemLeft{
        overflow:hidden;
        width: 30%;
        line-height: 40px;
   }
   .itemRight{
        width: 70%;
   }
   .dataLeft{
      width: 49%;
      text-align: center;
   }
   .dataRight{
      width: 49%;
      text-align: center;
   }
   .dataSpan{
      width: 2%;
      height: 100%;
      line-height: 40px;
      text-align: center;
   }
   .dataP{
      margin: 0;
      
   }
   .dataP2{
    width: 100%;
    line-height: 40px;
    text-align: center;
    margin:0;
   }
   .pFont{
    font-size: 12px;
   }
</style>
