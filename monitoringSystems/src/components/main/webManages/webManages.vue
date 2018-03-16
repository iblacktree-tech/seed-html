<template>
    <!-- 网站应用管理 -->
    <div class="webManages ">
        <div class="panel panel-default">
            <div class="panel-heading">
                网站应用管理
            </div>
          <div class="panel-body">
            <table class="table table-striped table-hover" id="id-applist">
                <thead>
                    <tr>
                        <th>网站名称</th>
                        <th >网站类型</th>
                        <th style="min-width:200px">网站地址</th>
                        <th>负责人</th>
                        <th>负责人电话</th>
                        <th style="min-width:130px">是否启用站内搜索</th>
                        <th >时区</th>
                        <th>货币</th>
                        <th style="width:186px; text-align:center" >操作</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in webManDatas.pageData">
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.appname"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.apptype"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.weburl"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.chargename"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.chargemobile"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.insearchmonitor"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.apptimezone"></td>
                      <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.currency"></td>
                      <td>
                        <button class="btn btn-default btn-sm" type="button" @click = "layout(index)" >布局说明</button>
                        <button class="btn btn-default btn-sm" type="button" @click = "inputEdit(index)" >编辑</button>
                        <button class="btn btn-default btn-sm" type="button" @click = "trDelete(index)">删除</button>
                      </td>
                  </tr> 
                </tbody>
            </table>
            <div>
                <a href="#" data-toggle="modal" data-target="#id-modal-addapp" class="btn btn-sm btn-primary pull-left" @click="addItem">添加网站应用</a>
            </div>
          </div>
        </div>
        <!-- 添加、编辑网站 弹框 -->
        <webManagesModal></webManagesModal>
        <!-- 网站布局说明 弹框 -->
        <webManagesLayout></webManagesLayout>
    </div>
</template>

<script>
import webManagesModal from '@/components/main/webManages/webManages-modal'
import webManagesLayout from '@/components/main/webManages/webManages-layout'
export default {
    name : 'webManages',
    data() {
        return {
            
        }
    },
    computed:{
        webManDatas(){
            return this.$store.state.webManages;
        }
    },
    created(){
        this.pullData()
    },
    methods:{
        // 添加
        addItem(){
          // 修改 状态
          // $('#id-modal-addapp').modal('show')
          this.webManDatas.modalData[0].choseValue = '';
          this.webManDatas.modalData[1].choseValue = '';
          this.webManDatas.modalData[2].choseValue = 'PC端';
          this.webManDatas.modalData[3].choseValue = '';
          this.webManDatas.modalData[4].choseValue = '';
          this.webManDatas.modalData[5].choseValue = '';
          this.webManDatas.modalData[6].choseValue = '是';
          this.webManDatas.modalData[7].choseValue = 'Asia/Shanghai';
          this.webManDatas.modalData[8].choseValue = 'CNY';
          this.webManDatas.modalData[9].id = '';

            this.$store.commit('webManagesData',{
                modalData : this.webManDatas.modalData,
                editOrAdd : "add"
            })
        },
        // 编辑
        inputEdit(index){
          // console.log(this.webManDatas.pageData)
            // 修改 状态
            $('#id-modal-addapp').modal('show')
            this.webManDatas.modalData[0].choseValue = this.webManDatas.pageData[index].appname;
            this.webManDatas.modalData[1].choseValue = this.webManDatas.pageData[index].weburl;
            this.webManDatas.modalData[2].choseValue = this.webManDatas.pageData[index].apptype;
            this.webManDatas.modalData[3].choseValue = this.webManDatas.pageData[index].chargename;
            this.webManDatas.modalData[4].choseValue = this.webManDatas.pageData[index].chargemobile;
            this.webManDatas.modalData[5].choseValue = this.webManDatas.pageData[index].chargeemail;
            this.webManDatas.modalData[6].choseValue = this.webManDatas.pageData[index].insearchmonitor;
            this.webManDatas.modalData[7].choseValue = this.webManDatas.pageData[index].apptimezone;
            this.webManDatas.modalData[8].choseValue = this.webManDatas.pageData[index].currency;
            this.webManDatas.modalData[9].id = this.webManDatas.pageData[index].id;

            this.$store.commit('webManagesData',{
                modalData : this.webManDatas.modalData,
                editOrAdd : "edit"
            })
        },
        // 删除
        trDelete(index){
            if(confirm('确定删除网站应用“'+this.webManDatas.pageData[index].appname+'”吗？')){
                // 向后台发送数据
                this.$http.get('/api/gl/delapp', {
                    params: {
                        appid : this.webManDatas.pageData[index].id
                    }
                },{
                    credentials: true,
                    emulateJSON: true
                }).then(function(data) {
                    // console.log(data.body)
                    // 更改后台数据
                    this.$store.commit('webManagesData',{
                        pageData : data.body.data
                    })
                },function(err){
                    if (err.status =='操作失败，请重试') {
                        alert('操作失败，请重试')
                    }
                    console.log(err.status)
                    
                })
            }
        },
        // 请求后台数据,初始化页面
        pullData(){ 
            this.$http.get('/api/gl/getuserapp', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data){
                // console.log(data.body)
                // 更改后台数据
                this.$store.commit('webManagesData',{
                    pageData : data.body.data
                })
            },function(err){
                // console.log(err.status)
                if (err.status ==500) {
                    if (confirm('登录超时，请重新登录！')==true){ 
                        this.$router.push({path:'/login'})  
                    }else{ 

                    } 
                }
                console.log(err.status)
            });
        },
        // 网站部署说明弹框
        layout(index){
          // console.log(99999)
            $('#id-modal-jsdeploy').modal('show');
             // console.log(this.webManDatas.pageData[index].trackjs)
            // 更改后台数据
            this.$store.commit('webManagesData',{
                copydata : this.webManDatas.pageData[index].trackjs
            })
        }
    },
    components:{
        webManagesModal : webManagesModal,
        webManagesLayout : webManagesLayout

    }
}
</script>

<style scoped>
    .webManages {
        margin-top: 90px;
    }
    .td-input{
      outline: none;
      border:0;
      background: #fffddd;
      width: 100%;
      margin-top: 2px;
    }
    input:disabled{
      background-color:transparent;
    }
    .float-left {
        float: left;
        margin-right: 35px;
    }
    .text-gray {
        color: gray !important;
    }
    .nolink {
        cursor: text !important;
    }
    td{
      text-align:left;
    }
</style>