<template>
    <div class="pageMain ">
        <router-view/>
    </div>
</template>

<script>

export default {
    name : 'pageMain',
    data() {
        return {
            
        }
    },
    computed:{
        // 导航条选项下标
        itemIndex(){
            return this.$store.state.itemIndex;
        }
    },
    mounted(){
        // this.init();  
    },
    methods:{
        // init(){
        //     console.log(999999)
        //     // 初始化显示概览页
        //     // this.$router.push('/home/overview');
        // }
        
    },
    components:{

    }
}
</script>

<style scoped>
    
</style>
