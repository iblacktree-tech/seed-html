<template>
    <!-- 网站应用管理弹框 -->
    <div class="webManagesModal container">

        <!-- 添加一个app -->
        <div class="modal fade" tabindex="-1" role="dialog" id="id-modal-addapp">
          <div class="modal-dialog" role="document" style="width: 900px;">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-show="webModalData.editOrAdd=='add'">添加网站应用</h4>
                <h4 class="modal-title" v-show="webModalData.editOrAdd=='edit'">编辑网站应用</h4>
              </div>
              <!-- <div class="modal-body">
              </div> --><!-- modal-body -->
              <div class="modal-footer">

                <div class="form-horizontal text-left">
                  <div class="form-group col-sm-6" v-for="(item,index) in webModalData.modalData" >
                      <label for="" class="col-sm-5 control-label" v-show = "index!=9">{{item.name}}</label>
                       <div class="col-sm-7" v-show = "index!=6&&index!=9">
                          <input type="text" class="form-control" v-model="item.choseValue" placeholder="" v-show = "index!=2&&index!=6&&index!=7&&index!=8">
                          <select class="form-control" v-model="item.choseValue" v-show = "index==2">
                              <option value="PC端">PC端</option>
                              <option value="移动端">移动端</option>
                          </select>
                          <select class="form-control" id="id-apptimezone" v-show = "index==7">
                              <option value="Asia/Shanghai">Asia/Shanghai</option>
                          </select>
                          <select class="form-control" id="id-currency" v-show = "index==8">
                              <option value="CNY">CNY</option>
                          </select>
                      </div>
                      <div class="col-sm-6" v-show = "index==6">
                          <div class="radio col-xs-5">
                            <label>
                              <input type="radio" name="insearchmonitor" value="是" checked v-model="item.choseValue">
                              是
                            </label>
                          </div>
                          <div class="radio col-xs-5">
                            <label>
                              <input type="radio" name="insearchmonitor" value="否" v-model="item.choseValue">
                              否
                            </label>
                          </div>
                      </div> 
                  </div>
                  <div class="form-group col-sm-12 text-right">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="modelSure">保存</button>
                  </div>
                </div>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
// import overviewTop from '@/components/main/overview/overview-top'
// import overviewMain from '@/components/main/overview/overview-main'

export default {
    name : 'webManagesModal',
    data() {
        return {
            
        }
    },
    computed:{
        webModalData(){
            return this.$store.state.webManages;
        }
    },
    methods:{
        // 点击确定按钮
        modelSure(){
          // console.log(this.webModalData)
            // 表单验证
            // 网站名称
            if (this.webModalData.modalData[0].choseValue=='') {
                alert('网站名称不能为空！');
                $('#id-modal-addapp').modal('show')
                return false;
            }
            // 网站地址
            if (this.webModalData.modalData[1].choseValue=='') {
                alert('网站地址不能为空！');
                $('#id-modal-addapp').modal('show')
                return false;
            }
            // 负责人姓名
            if (this.webModalData.modalData[3].choseValue=='') {
                alert('负责人姓名不能为空！');
                $('#id-modal-addapp').modal('show')
                return false;
            }
            // 负责人手机号
            if (this.webModalData.modalData[4].choseValue=='') {
                alert('负责人手机号不能为空！');
                $('#id-modal-addapp').modal('show')
                return;
            }else{
                var reg = /^1[0-9]{10}$/;
                if (!reg.test(this.webModalData.modalData[4].choseValue)) {
                    alert('手机号码错误！');
                    $('#id-modal-addapp').modal('show')
                    return false;
                }
            }
            // 负责人邮箱
            if (this.webModalData.modalData[5].choseValue=='') {
                alert('负责人邮箱不能为空！');
                $('#id-modal-addapp').modal('show')
                return false;
            }else{
                //对电子邮件的验证
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!myreg.test(this.webModalData.modalData[5].choseValue)){
                    alert('请输入有效的邮箱！');
                    return false;
                }
            }

            if (this.webModalData.editOrAdd =="add") {
                if(confirm('确定添加这个网站？')){
                    // 发送数据到后台
                    this.addItem();
                    $('#id-modal-addapp').modal('hide')
                } 
            } else{// 编辑
                if(confirm('确定修改这个网站？')){
                    // 发送数据到后台
                    this.editItem();
                    $('#id-modal-addapp').modal('hide')
                }
            }
        },
        // 添加
        addItem(index){
          this.$http.get('/api/gl/addapp', {
              params: {
                  appname : this.webModalData.modalData[0].choseValue,
                  weburl : this.webModalData.modalData[1].choseValue, 
                  apptype : this.webModalData.modalData[2].choseValue,
                  chargename : this.webModalData.modalData[3].choseValue,
                  chargemobile : this.webModalData.modalData[4].choseValue,
                  chargeemail : this.webModalData.modalData[5].choseValue,
                  insearchmonitor : this.webModalData.modalData[6].choseValue,
                  apptimezone : this.webModalData.modalData[7].choseValue,
                  currency : this.webModalData.modalData[8].choseValue
              }
          },{
              credentials: true,
              emulateJSON: true
          }).then(function(data) {
              // console.log(data.body)
              // 更改后台数据
              this.$store.commit('webManagesData',{
                  pageData : data.body.data,
                  copydata : data.body.web.trackjs
              })
              // 布局说明弹框弹出
              $('#id-modal-jsdeploy').modal('show');
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
        },
        // 请求后台数据
        editItem(){
          // console.log(this.webModalData.modalData)
            this.$http.get('/api/gl/editapp', { 
                params: {
                    id : this.webModalData.modalData[9].id,
                    appname : this.webModalData.modalData[0].choseValue,
                    apptype : this.webModalData.modalData[2].choseValue,
                    weburl : this.webModalData.modalData[1].choseValue,
                    apptimezone : this.webModalData.modalData[7].choseValue,
                    currency : this.webModalData.modalData[8].choseValue,
                    chargename : this.webModalData.modalData[3].choseValue,
                    chargemobile : this.webModalData.modalData[4].choseValue,
                    chargeemail : this.webModalData.modalData[5].choseValue,
                    insearchmonitor : this.webModalData.modalData[6].choseValue,
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
                // console.log(err.status)
                if (err.status ==500) {
                    if (confirm('登录超时，请重新登录！')==true){ 
                        this.$router.push({path:'/login'})  
                    }else{ 

                    } 
                }
                if (err.status =='保存失败，请重新登录后重试') {
                    alert('保存失败，请重新登录后重试')
                }
                console.log(err.status)
            });
        }
    },
    components:{
        // overviewTop : overviewTop,
        // overviewMain : overviewMain
    }
}
</script>

<style scoped>
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
</style>