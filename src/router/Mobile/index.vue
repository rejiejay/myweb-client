<template>
  <div class="Mobile">
    <h1>手机端</h1>
    <div>

    <div style="padding:15px;">
      <x-button type="primary" plain @click.native="showPlugin">Used as a plugin</x-button>
    </div>

    <group title="1">
      <datetime
        title="1"
        v-model="value1"
        @on-change="change"
        @on-cancel="log('cancel')"
        @on-confirm="log('confirm')"
        @on-hide="log('hide', $event)"></datetime>
    </group>
     
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import { Datetime, Group, XButton, LoadingPlugin } from 'vux';

Vue.use(Datetime);
Vue.use(Group);
Vue.use(XButton);
Vue.use(LoadingPlugin)

export default {
  name: 'Mobile',
  
  components: {
    Datetime,
    Group,
    XButton
  },

data () {
    return {
      value1: '2015-11-12',
    }
  },

  methods: {
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    change (value) {
      console.log('change', value)
    },
    showPlugin () {
      this.$vux.loading.show({
 text: 'Loading'
})
      // this.$vux.datetime.show({
      //   cancelText: '取消',
      //   confirmText: '确定',
      //   format: 'YYYY-MM-DD HH',
      //   value: '2017-05-20 18',
      //   onConfirm (val) {
      //     console.log('plugin confirm', val)
      //   },
      //   onShow () {
      //     console.log('plugin show')
      //   },
      //   onHide () {
      //     console.log('plugin hide')
      //   }
      // })
    },
  },

  mounted: function() {
    console.log(1)
  }
}

</script>

<style scoped lang="less">

</style>
