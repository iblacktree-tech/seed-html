<template>
    <div class="overview-dateModal">
        <!-- 右侧导航 日期弹框 -->
        <div class="top-choosedate-tankuang" >
          <div class="tankuang-box">
            <div class="tankuang-container">
              <div class="tankuang-item" v-for="(item, index) in modalDateItem" :class='{"active":modalDateItemActive==index}' @click="choseDate(index)">{{item}}</div>
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
            modalDateItem:[
                '今天','昨天','本周','上周','本月','上月','今年','去年','过去7天','过去14天','过去30天','过去90天','过去180天','过去365天'
            ],
            modalDateItemActive:1
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
               modalDateChose : this.modalDateItem[index]
           })
          // 颜色更换
           this.modalDateItemActive = index
        }
    }
}
</script>

<style scoped>
   .top-choosedate-tankuang{
     z-index: 100;
     /*display: none;*/
     position: absolute;
     /*top: 114px;*/
     right: 30px;
     /* width: 100%; */
   }

   .tankuang-box{
     display: block;
     font-size: 12px;
     font-weight: 400;
     line-height: 1.5;
   }
   .tankuang-box{
     position: relative;
     width: 580px;
     height: 270px;
     background-color: #fff;
     border: 1px solid #dae2e5;
     padding: 7px 10px;
     box-shadow: 0 0 4px rgba(0,0,0,.17);
     border: 1px solid #d9d9d9;
   }

   .tankuang-container {
       width: 100%;
       padding-top: 15px;
       display: inline-block;
   }

   .tankuang-item{
     border-left: 1px solid #e9e9e9;
     width: 50%;
     padding: 6px 7px;
     box-sizing: border-box;
     font-size: 14px;
     cursor: pointer;
     /*display: inline-block;*/
     float: left;
   }

   .tankuang-item.active{
     border-left: 2px solid #ea6947;
     color: #ea6947;
   } 
</style>
