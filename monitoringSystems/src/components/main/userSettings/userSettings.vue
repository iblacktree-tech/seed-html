<template>

    <div class="userSettings container">
        <div class="panel panel-default">
            <div class="panel-heading">
                账户权限管理
            </div>
            <div class="panel-body">
                <div class="text-left" style="margin-bottom:20px">
                    <label>
                        当前账户级别：
                    </label>
                    <label id="id-level" class="label label-info">VIP {{userlevel}}</label> 
                    <a href="#">升级</a>
                </div>
                <div class="text-left" id="abbilitieslist">
                    <div class="">
                        <label>
                            账户权限：
                            <span class="label label-default userSpan" v-for="(item,index) in allLevel" :class="{'label-primary' : flag(item.abbilitiesdesc)}">{{item.abbilitiesdesc}}</span>
                        </label>
                    </div>
                    
                </div>
                <div class="text-right">
                    <a href="#">账户权限说明</a>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                协作账号管理
            </div>
            <div class="panel-body">
                <table class="table table-striped table-hover" id="id-acclist">
                    <thead>
                        <tr>
                            <th>登录名</th>
                            <th>账号类型</th>
                            <th>协作人姓名</th>
                            <th>协作人邮箱</th>
                            <th>协作人手机号</th>
                            <th style="width:160px; text-align:center">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in account.pageData">
                            <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.logonname"></td>
                            <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.accounttype"></td>
                            <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.accountname"></td>
                            <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.accountemail"></td>
                            <td><input type="text" :disabled ="true" class="td-input" v-model.trim="item.accountmobile"></td>
                            <td>
                              <button class="btn btn-default btn-sm" type="button" @click = "inputEdit(index)">编辑</button>
                              <button class="btn btn-default btn-sm" type="button" @click = "trDelete(index)">删除</button>
                            </td>
                        </tr> 
                    </tbody>
                </table>
                <div>
                    <a href="#" data-toggle="modal" data-target="#id-modal-addacc" class="addBtn btn btn-sm btn-success pull-left" @click ="addItem">添加账号</a>
                </div>
            </div>
        </div>
        <!-- 弹框 -->
        <userSettingsModal></userSettingsModal>
    </div>

</template>

<script>
import userSettingsModal from '@/components/main/userSettings/userSettings-modal'
export default {
    name : 'userSettings',
    data() {
        return {
           userlevel:'',//账户级别
           allLevel:'',//账户权限
           curLevel:"" //当前权限
        }
    },
    computed:{
        account(){
            return this.$store.state.userSettings;
        }
    },
    created(){
        this.pullData();
        this.navIndex();

    },
    methods:{
        pullData(){ 
            // console.log(this.account)
            // 读取某账户的所有协作账号
            this.$http.get('/api/gl/getaccountlist', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data.body.data)
                // 更改后台数据
                this.$store.commit('userSettingsData',{
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

            // 读取某账户级别
            this.$http.get('/api/gl/getuser', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data.body.data)
                this.userlevel =data.body.data.userlevel
            },function(err){
                
                console.log(err.status)
            });

            // 读取某账户所有权限
            this.$http.get('/api/gl/getallabbilities', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(res) {
                // console.log(res.body.data)
                this.allLevel = res.body.data
                // console.log(this.allLevel)
            },function(err){
                
                console.log(err.status)
            });
            // 读取某账户以获取的权限
            this.$http.get('/api/gl/getuserlevel', {

            },{
                credentials: true,
                emulateJSON: true
            }).then(function(res) {
                // console.log(res.body.data)
                this.curLevel = res.body.data
            },function(err){
                
                console.log(err.status)
            });
            
        },
        // 编辑
        inputEdit(index){
          // 修改 状态
          $('#id-modal-addacc').modal('show')
          this.account.modalData[0].choseValue = this.account.pageData[index].logonname;
          this.account.modalData[1].choseValue = this.account.pageData[index].logonpwd;
          this.account.modalData[2].choseValue = this.account.pageData[index].logonpwd;
          this.account.modalData[3].choseValue = this.account.pageData[index].accounttype;
          this.account.modalData[4].choseValue = this.account.pageData[index].accountname;
          this.account.modalData[5].choseValue = this.account.pageData[index].accountemail;
          this.account.modalData[6].choseValue = this.account.pageData[index].accountmobile;
          this.account.modalData[7].id = this.account.pageData[index].id;

          this.$store.commit('userSettingsData',{
              modalData : this.account.modalData
              // editOrAdd : "edit"
          })
          this.$store.commit('userSettingsData',{
              // modalData : this.account.modalData,
              editOrAdd : "edit"
          })
          
        },
        // 删除
        trDelete(index){
            if(confirm('确定删除账户“'+this.account.pageData[index].logonname+'”吗？')){
                // 向后台发送数据
                this.$http.get('/api/gl/delacc', {
                    params: {
                        // 参数 下标
                        'accid' : this.account.pageData[index].id
                    }
                },{
                    credentials: true,
                    emulateJSON: true
                }).then(function(data) {
                    console.log(data.body.data)
                    // 更改后台数据
                    this.$store.commit('userSettingsData',{
                        pageData : data.body.data
                    })
                },function(err){
                    console.log(err.status)
                })
            }
        },
        // 添加
        addItem(){
            this.account.modalData[0].choseValue = ''
            this.account.modalData[1].choseValue = ''
            this.account.modalData[2].choseValue = ''
            this.account.modalData[3].choseValue = '协作'
            this.account.modalData[4].choseValue = ''
            this.account.modalData[5].choseValue = ''
            this.account.modalData[6].choseValue = ''
            this.account.modalData[7].id = ''

            this.$store.commit('userSettingsData',{
                modalData : this.account.modalData,
                editOrAdd : "add"
            })
        },
        // 判断用户当前可用权限
        flag(data){
            var curLevelArr = [];
            for (var i = 0; i < this.curLevel.length; i++) {
                curLevelArr.push(this.curLevel[i].abbilitiesdesc)
            }
            if (curLevelArr.indexOf(data) >=0) {
                return true
            }else{
                return false
            }

        },
        // 更改nav显示
        navIndex(data){
            this.$store.commit('itemIndex',{
                itemIndex:5
            })
        },
    },
    components:{
        userSettingsModal : userSettingsModal
    }
}
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .userSettings{
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
    .userSpan{
        margin-right: 5px;
        display: inline-block;
        margin-bottom: 5px;
        font-size: 12px;
        padding-top: 5px;
    }
    #id-level{
        padding-top: 5px;
    }
    .addBtn{
        color:#fff;
    }
</style>
