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
        }
    },
    created(){
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
