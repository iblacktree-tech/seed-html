<template>
    <div class="home" @click ="ovModalShow">
        <pageNav></pageNav>
        <pageMain></pageMain>
    </div>
</template> 
<script>
import pageNav from '@/components/nav/nav'
import pageMain from '@/components/main/main'

export default {
    name : 'home',
    data() {
        return {
            
        }
    },
    computed:{
        ovShow(){
            return this.$store.state.overview.modalIsShow;
        },
        charts(){
            return this.$store.state.overview.charts;
        },
        charts2(){
            return this.$store.state.analysis.charts;
        }
    },
    created(){
    },
    mounted() {
      let that =this;
        window.onresize = function temp() {
            if (that.charts.length!=0) {
                // setTimeout(()=>{
                    for (var i = 0; i < that.charts.length; i++) {
                      that.charts[i].resize();
                    }
                // },100)
                
            }
            if (that.charts2.length!=0) {
                // setTimeout(()=>{
                    for (var i = 0; i < that.charts2.length; i++) {
                      that.charts2[i].resize();
                    }
                // },100)
                
            }
        };
    },
    methods:{
      ovModalShow(){
        if (this.ovShow=='on') {
          this.$store.commit('overviewData',{
              modalIsShow : 'off'
          })
        }
      }
    },
    components:{
        pageNav : pageNav,
        pageMain : pageMain,
    }
}
</script>

<style scoped>
html,body{
  height: 100%;
}
  .home{
    padding-top: 60px;
    /*height: calc(100%- 60px);*/
  }
</style>
