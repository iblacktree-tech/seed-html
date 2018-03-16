<template>
    <div class="overview-dateModal">
        <!-- 右侧导航 日期弹框 -->
        <div class="top-choosedate-tankuang" >
          <div class="tankuang-box">
            <div class="tankuang-container">
              <div v-for="(item,index) in dateItems" class="tankuang-item" @click="choseDate(index)">
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
        </div>
    </div>
</template>

<script>
export default {
    name : 'overview-dateModal',
    data() {
        return {
            modalDateItemActive:1,
            dateItems:[
                {itemName :"今天", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"昨天", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"本周", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"上周", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"本月", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"上月", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"今年", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}},
                {itemName :"去年", thisCycle:{from: "2018-03-16",to:"2018-03-16"},lastCycle:{from: "2018-03-16",to:"2018-03-16"},week:{from: "Mon.",to:"Sun."}}
            ]
        }
    },
    computed:{
        
    },
    created(){

    },
    methods:{
        // 选择日期函数
        choseDate(index){
          // 更改标签上的 日期显示
           this.$store.commit('overviewData',{
               modalDateChose : this.dateItems[index].itemName
           })
          // 颜色更换
           this.modalDateItemActive = index;

        },
        dataShow(){

        }
    }
}
</script>

<style scoped>
   .top-choosedate-tankuang{
     z-index: 100;
     position: absolute;
     right: 30px;
   }

   .tankuang-box{
     display: block;
     font-size: 12px;
     font-weight: 400;
     line-height: 1.5;
   }
   .tankuang-box{
     position: relative;
     width: 300px;
     height: 410px;
     background-color: #fff;
     border: 1px solid #dae2e5;
     padding: 7px 10px;
     box-shadow: 0 0 4px rgba(0,0,0,.17);
     border: 1px solid #d9d9d9;
   }

   .tankuang-container {
       width: 100%;
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
      color: #5bc0de;
   }
   .tankuang-item.active{
     border-left: 2px solid #ea6947;
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
