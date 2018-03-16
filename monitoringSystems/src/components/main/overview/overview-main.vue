<template>
    <div class="overview-main">
        <div class="row main-box-container">
            <div class='col-xs-6' v-for="(item, index) in chartDatas"></div>
        </div>
    
    </div>
</template>

<script>
import chartsBox from '@/components/main/overview/overview-chartsBox'
import chartsBox2 from '@/components/main/overview/overview-chartsBox2'
export default {
    name : 'overview-main',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    created(){
        this.getChartsData()
    },
    computed:{
        chartDatas(){
            return this.$store.state.overview.chartsData.body;
        },
    },
    methods:{
        addBtnFn(){
            this.$store.commit('setHomeMsg',{
                msg:'你好'
            })
        },
        // 获取后台图表数据
        getChartsData(){
            this.$http.get('../static/json/dataJson2.json', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data)
                this.$store.commit('overviewData',{
                    chartsData:data
                })
                // console.log(this.chartDatas)
            },function(err){
                if (err.status ==500) {
                    if (confirm('登录超时，请重新登录！')==true){ 
                        this.$router.push({path:'/login'})  
                    }else{ 

                    } 
                }
                console.log(err.status)
            });
        },
    },
    components:{
        chartsBox : chartsBox,
        chartsBox2 : chartsBox2
    }
}
</script>

<style scoped>
    .main-box-container{
      height: auto;
      position: relative;
      transition: height .2s ease;
      padding:0;
    }
</style>
