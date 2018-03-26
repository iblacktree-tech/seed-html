<template>
    <div class="userSettingsModal container">
        <!-- 添加一个账号 -->
        <div class="modal fade userSettings-modal" tabindex="-1" role="dialog" id="id-modal-addacc">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-show="modalData.editOrAdd=='add'">添加账号</h4>
                <h4 class="modal-title" v-show="modalData.editOrAdd=='edit'">编辑账号</h4>
              </div>
              <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group" v-for="(item,index) in modalData.modalData">
                        <label for="" class="col-sm-3 control-label" v-show="index!=7">{{item.name}}</label>
                        <div class="col-sm-8" v-show="index!=7">

                            <input type="text" class="form-control" v-model="item.choseValue" placeholder="" v-show = "index!=3&&index!=1&&index!=2">
                            <input type="password" class="form-control" v-model="item.choseValue" placeholder="" v-show = "index==1||index==2">
                            <select class="form-control" v-model="item.choseValue" v-show = "index==3">
                                <option value="协作">协作</option>
                                <!-- <option value="主账号">主账号</option> -->
                            </select>
                            
                        </div>
                        
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="modelSure">保存</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>

</template>

<script>
export default {
    name : 'userSettingsModal',
    data() {
        return {

        }
    },
    computed:{
        modalData(){
            return this.$store.state.userSettings;
        }
    },
    methods:{
        // 点击确定按钮
        modelSure(){
            // console.log(this.modalData)
            // 表单验证
            // 登录名
            if (this.modalData.modalData[0].choseValue=='') {
                alert('登录名不能为空！');
                $('#id-modal-addacc').modal('show')
                return false;
            }
            // 密码
            if (this.modalData.modalData[1].choseValue=='') {
                alert('密码名不能为空！');
                $('#id-modal-addacc').modal('show')
                return false;
            }
            // 请确认密码
            if (this.modalData.modalData[2].choseValue !=this.modalData.modalData[1].choseValue) {
                alert('两次密码不一致！');
                $('#id-modal-addacc').modal('show')
                return false;
            }
            // 姓名
            if (this.modalData.modalData[4].choseValue=='') {
                alert('姓名名不能为空！');
                $('#id-modal-addacc').modal('show')
                return false;
            }
            // 邮箱
            if (this.modalData.modalData[5].choseValue=='') {
                alert('邮箱不能为空！');
                $('#id-modal-addacc').modal('show')
                return false;
            }else{
                //对电子邮件的验证
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!myreg.test(this.modalData.modalData[5].choseValue)){
                    alert('请输入有效的邮箱！');
                    return false;
                }
            }
            // 手机
            if (this.modalData.modalData[6].choseValue=='') {
                alert('手机号不能为空！');
                $('#id-modal-addacc').modal('show')
                return;
            }else{
                var reg = /^1[0-9]{10}$/;
                if (!reg.test(this.modalData.modalData[6].choseValue)) {
                    alert('手机号码错误！');
                    $('#id-modal-addacc').modal('show')
                    return false;
                }
            }
            if (this.modalData.editOrAdd =="add") {
                if(confirm('确定添加这个账户？')){
                    // 发送数据到后台
                    this.addItem();
                    $('#id-modal-addacc').modal('hide')
                } 
            } else{// 编辑
                if(confirm('确定修改这个账户？')){
                    // 发送数据到后台
                    this.editItem();
                    $('#id-modal-addacc').modal('hide')
                }
            }
               
        },
        // 编辑
        editItem(){
            // 编辑
            this.$http.get('/api/gl/editacc', {
                params: {
                    // 参数 修改的元素整体
                    accountid : this.modalData.modalData[7].id,
                    logonname : this.modalData.modalData[0].choseValue,
                    logonpwd : this.modalData.modalData[1].choseValue, 
                    accounttype : this.modalData.modalData[3].choseValue,
                    accountname : this.modalData.modalData[4].choseValue,
                    accountemail : this.modalData.modalData[5].choseValue,
                    accountmobile : this.modalData.modalData[6].choseValue
                }
            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data) {
                // console.log(data.body)
                // 更改后台数据
                this.$store.commit('userSettingsData',{
                    pageData : data.body.data
                })
            },function(err){

                if (err.msg =="操作失败，请重试") {
                  alert("操作失败，请重试")
                }
                console.log(err.status)
            });

        },
        // 添加
        addItem(){
            this.$http.get('/api/gl/addacc', {
                params: {
                    logonname : this.modalData.modalData[0].choseValue,
                    logonpwd : this.modalData.modalData[1].choseValue, 
                    accounttype : this.modalData.modalData[3].choseValue,
                    accountname : this.modalData.modalData[4].choseValue,
                    accountemail : this.modalData.modalData[5].choseValue,
                    accountmobile : this.modalData.modalData[6].choseValue
                }
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
                if (err.status =='添加失败，登录名不能重复') {
                    alert('添加失败，登录名不能重复')
                }
                console.log(err.status)
            });
        }
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
    .userSettingsModal{
        margin-top: 90px;
    }
</style>
