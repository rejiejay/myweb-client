window.onload = function (){
  main.init();
}

var main = {
  'VueData': null,

  init: function () {
    this.VueData = new Vue(count.init());
  }
}

var count = {
  'Vue': {
    'el': '#main',

    'data': {
      'countSelect': null,
      'btnList': []
    },

    'watch': {
      countSelect: function (newSelect, oldSelect) {
        this.btnList = this.selectToList(parseInt(newSelect));
        this.saveToLocalStorage(parseInt(newSelect), this.btnList);
      }
    },
    
    'methods': {
      saveToLocalStorage: function (countSelect, btnList) {
        var newCount = JSON.stringify({
          'countSelect': countSelect,
          'btnList': btnList
        });
        
        localStorage.setItem('RejiejayCount', newCount);
      },

      selectToList: function (target) {
        target = parseInt(target);
    
        var countArray = [];
        var targetArray = [];

        for (var i = 0; i < target; i++) {
          targetArray.push(i + 1);
        }
    
        targetArray.map(function (value, index) {
          var valueArray = [];
          for (var i = 0; i < value; i++) {
            valueArray.push(i + 1);
          }
          
          valueArray.reverse().map(function (val, key) {
            countArray.push(val);
          })
        });

        countArray.concat([]).map(function (value, index) {
          countArray.push(target - value + 1);
        });
    
        return countArray.map(function (val, key) {
          return {
            'id': key, 
            'name': val, 
            'isSelect': false
          }
        });
      },

      select: function (id) {
        var newBtnList = this.btnList.concat([]).map(function (value, index) {
          value.isSelect = index === id ? true : false;
          return value
        });
        this.btnList = newBtnList
        
        this.saveToLocalStorage(parseInt(this.countSelect), newBtnList);
      }
    }
    
  },

  init: function () {
    var RejiejayCount = JSON.parse(localStorage.getItem('RejiejayCount'));
    var countSelect = RejiejayCount ? RejiejayCount.countSelect : 3;
    
    this.Vue.data.countSelect = RejiejayCount ? 
      RejiejayCount.countSelect : 3;

    this.Vue.data.btnList = RejiejayCount ? 
      RejiejayCount.btnList : 
      this.Vue.methods.selectToList(3);

    return this.Vue;
  }
}
