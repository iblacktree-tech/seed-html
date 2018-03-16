<template>
    <!-- 网站布局说明 -->
    <div class="webManagesLayout container">
      <div class="modal fade" tabindex="-1" role="dialog" id="id-modal-jsdeploy">
        <div class="modal-dialog" role="document" style="width: 900px;">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">部署说明</h4>
            </div>
            <div class="modal-body">
              <div class="alert alert-info">
                  <span v-show ="message.editOrAdd=='add'">离部署完成还差一步；</span>
                  <br>
                  1. 请将下面的这段代码，添加到网站页面的&lt;/head&gt;标签之前。
                  <br>
                  2. 如果您拥有网站CMS系统， 建议您使用其中的模板页面来安装，以达到一处安装，全站监测的效果。
              </div>
              <pre style="height: 310px; text-align:left">{{message.copydata}}</pre>
              <textarea class="hidden" cols="20" rows="10" id="id-pre-copy"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary copyBtn" data-clipboard-action="copy" data-clipboard-target="#id-modal-jsdeploy .modal-body pre" :data-clipboard-text = "message.copydata"
                v-clipboard:copy="message.copydata"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">复制代码</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import overviewTop from '@/components/main/overview/overview-top'
// import Clipboard from 'clipboard'
// let clipboard = new Clipboard('.copyBtn');
export default {
    name : 'webManagesLayout',
    data() {
        return {
        }
    },
    computed:{
        message(){
            return this.$store.state.webManages;
        }
    },
    created(){
       
    },
    methods:{
        // 复制成功
        onCopy: function (e) {
          // console.log(this.webModalData)
          console.log('你刚刚复制: ' + e.text)
        },
        onError: function (e) {
          console.log('无法复制文本！')
        }
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
    .alert{
      text-align: left;
    }
</style>