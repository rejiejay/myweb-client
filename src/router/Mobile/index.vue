<template>
  <div class="Mobile">

    <div class="navbar">
      <div>
        <div class="navbar-heard-item" 
          @click="changeTab('home')"
        >主页</div>
        <div class="navbar-heard-item" 
          @click="changeDynamicTab('dynamic')"
        >动态 ({{sortByDynamic}})</div>
        <div class="navbar-heard-item" 
          @click="changeTab('group')"
        >分组</div>
      </div>
    </div>

    <div class="tab-container">
      <div>
        <div class="tab-item" v-if="navSelected === 'home'">
          
        </div>
        <div class="tab-item" v-if="navSelected === 'dynamic'">
          
        </div>
        <div class="tab-item" v-if="navSelected === 'group'">
          
        </div>
      </div>

    </div>

    <mt-actionsheet
      :actions="sortDynamiAactions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>

import Vue from 'vue';
import { Actionsheet } from 'mint-ui';
import 'mint-ui/lib/actionsheet/style.css';

Vue.component(Actionsheet.name, Actionsheet);

export default {
  name: 'Mobile',
  
  components: { },

  data () {
    return {
      navSelected: 'dynamic',
      sortByDynamic: '时间↓', // 时间↑ 时间↓ 赞同 乱序
      sheetVisible: false,
      sortDynamiAactions: [
        {name: '按照最久远时间↑', method: () => this.changeSortDynamic('timeUp')},
        {name: '按照最新时间↓', method: () => this.changeSortDynamic('timeDowm')},
        {name: '按照赞同量', method: () => this.changeSortDynamic('approval')},
        {name: '乱序', method: () => this.changeSortDynamic('shuffle')},
      ],
    }
  },

  methods: {
    changeTab: function (newnavSelected) {
      this.navSelected = newnavSelected;
    },

    changeSortDynamic: function(sortWay) {
      let sortList = {
        'timeUp': '时间↑',
        'timeDowm': '时间↓',
        'approval': '赞同',
        'shuffle': '乱序',
      };
      this.sortByDynamic = sortList[sortWay];
    },

    changeDynamicTab: function () {
     if (this.navSelected === 'dynamic') {
      this.sheetVisible = true;
     } else {
      this.navSelected = 'dynamic';
     }
    }
  },

  mounted: function() {
    window.myVue = this;
  }
}

</script>

<style scoped lang="less">

</style>
