<template>
  <div style="height:100%">
    <div class="header">
      <div class="selectRange">
        <!-- 水平菜单 点击后跳转 并active-->
        <Menu mode="horizontal" @on-select="(name) =>$route.name !== name && $router.push(name)"
              :active-name="$route.name">
          <MenuItem name="page1">
            page1
          </MenuItem>
        </Menu>
      </div>
      <div class="header-title">
        Vue3.0大屏显示模板设计
      </div>
      <div class="selectRange">
        <Menu mode="horizontal" @on-select="handleSelect" :active-name="activeName">
          <MenuItem name="day">
            昨日
          </MenuItem>
          <MenuItem name="week">
            近一周
          </MenuItem>
          <MenuItem name="month">
            近一月
          </MenuItem>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-settings-outline" size="24" color="#60C2D4"/>
            </template>
            <MenuItem name="filter">筛选</MenuItem>
          </Submenu>

        </Menu>
      </div>
    </div>
    <!--Modal对话框打开 选择时间 是否允许点击遮罩层关闭-->
    <Modal
        v-model="modal"
        title="选择时间"
        :mask-closable="false"
        @on-ok="getMonthBetween(startTime,endTime)"
    >
      <!--日期选择器-->
      <DatePicker @on-change="pickStartDate" :options="optionStart" type="date" placeholder="选择开始日期"
                  style="width: 200px"></DatePicker>
      <span style="padding:0 20px;color:#75deef">至</span>
      <DatePicker @on-change="pickEndDate" :options="optionEnd" type="date" placeholder="选择结束日期"
                  style="width: 200px"></DatePicker>
    </Modal>

    <div class="page">
      <!--默认选中的month flag永远都是true-->
      <router-view v-if="flag" :selectRangeDate='selectRangeDate'></router-view>
    </div>

  </div>
</template>

<script>

import {ref, onMounted, onBeforeUnmount} from 'vue';
import {DatePicker, Icon, MenuItem, Modal, Submenu} from "view-ui-plus";

export default {
  name: 'App',
  components: {Icon, Submenu, Modal, DatePicker, MenuItem},
  setup() {
    const activeName = ref('month'); // 默认显示近一月
    const modal = ref(false);
    const flag = ref(false);
    const selectRangeDate = ref([]);
    const startTime = ref('');
    const endTime = ref('');
    const optionStart = ref({
      //设置属性 options 对象中的 disabledDate 可以设置不可选择的日期。
      disabledDate(date) { // 禁止选择今天之后的日期
        return date && date.valueOf() > Date.now() - 86400000;
      }
    });
    const optionEnd = ref({});
    const resizeFn = ref(null);

    const pickStartDate = (date) => { // 选择开始时间的回调
      startTime.value = date;
      optionEnd.value = {
        disabledDate(d) { // 禁止选择开始时间之前的日期
          return d && d.valueOf() < new Date(date).valueOf() - 86400000;
        }
      };
    };

    const pickEndDate = (date) => { // 选择结束时间的回调
      endTime.value = date;
    };

    const getMonthBetween = (start, end) => {  // 获取开始时间和结束时间之内的所有月份
      selectRangeDate.value = [];
      let s = start.split("-");  // 字符串转换数组
      let e = end.split("-");
      let date = new Date();
      let min = new Date(date.setFullYear(s[0], s[1] - 1)); // 设置最小时间
      let max = new Date(date.setFullYear(e[0], e[1] - 1)); // 设置最大时间

      let curr = new Date(min);
      while (curr <= max) {  // 循环添加月份
        let month = curr.getMonth();
        let arr = [curr.getFullYear(), month + 1];
        selectRangeDate.value.push(arr);
        curr.setMonth(month + 1);
      }
    };

    const getDays = (day) => { // 获取天数
      let arr = [];
      for (let i = -day; i < 0; i++) { // 循环添加天数
        let today = new Date(); // 获取今天
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * i;
        today.setTime(targetday_milliseconds); // 设置i天前的时间
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        let date = [tYear, tMonth + 1, tDate];
        arr.push(date);
      }
      return arr;
    };

    const handleSelect = (name) => {
      switch (name) {
        case 'day':
          break;
        case 'week':
          selectRangeDate.value = getDays(7); // 获取近一周的天数
          flag.value = true;
          break;
        case 'month':
          selectRangeDate.value = getDays(30); // 获取近一个月的天数
          flag.value = true;
          break;
        case 'filter':
          modal.value = true;
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      handleSelect(activeName.value); // 默认显示近一个月
    });

    return {
      activeName,
      modal,
      flag,
      selectRangeDate,
      startTime,
      endTime,
      optionStart,
      optionEnd,
      pickStartDate,
      pickEndDate,
      getMonthBetween,
      getDays,
      handleSelect
    };
  }
};
</script>

<style lang="less">
.ivu-modal {
  .ivu-modal-content {
    background: #071332;

    .ivu-modal-header {
      border-bottom: 1px solid #1a3c58;

      .ivu-modal-header-inner {
        color: #75deef;
      }
    }

    .ivu-modal-body {
      text-align: center;

      .ivu-icon {
        color: #75deef
      }

      .ivu-modal-confirm-body {
        padding-left: 0;
        color: #75deef
      }

      .ivu-input {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #1a3c58;
        color: #75deef;

        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color: #75deef;
        }

        &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #75deef;
        }

        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #75deef;
        }

        &::-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #75deef;
        }
      }

      .ivu-picker-panel-body {
        background: #071332;

        .ivu-date-picker-header {
          color: #75deef;
          border-bottom: 1px solid #1a3c58
        }

        .ivu-date-picker-cells-cell {
          color: #75deef;

          &:hover em {
            background: #1a3c58;
          }
        }

        .ivu-date-picker-cells-cell-disabled {
          background: rgba(0, 0, 0, 0);
          color: #eee
        }

        .ivu-date-picker-cells-focused em {
          box-shadow: 0 0 0 1px #1a3c58 inset;

          &::after {
            background: #1a3c58;
          }
        }
      }
    }

    .ivu-modal-footer {
      border-top: 1px solid #1a3c58;

      .ivu-btn-primary {
        color: #75deef;
        background: #1a3c58;
      }

      .ivu-btn-text {
        color: #ddd;

        &:hover {
          color: #75deef;
          background: #1a3c58;
        }
      }
    }
  }

}

.header {
  height: 80px;
  background: #03044A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //border: 1px solid red;

  &-title {
    color: #75deef;
    font-size: 30px;
    letter-spacing: 10px;
    padding-left: 10%;
    //border: 1px solid red;
  }

  .selectRange {
    height: 100%;
    //border: 1px solid orange;

    .ivu-menu-horizontal {
      background: rgba(255, 255, 255, 0);

      &::after {
        height: 0;
      }

      .ivu-menu-item-active {
        border-bottom: 2px solid #264e5e;

      }

      .ivu-menu-item, .ivu-menu-submenu {
        color: #75deef;

        &:hover {
          border-bottom: 2px solid #264e5e;
        }
      }

      .ivu-select-dropdown {
        background: #09102E;

        .ivu-menu-item {
          color: #75deef;

          &:hover {

            border-bottom: 2px solid #264e5e;
            background-color: rgba(255, 255, 255, 0);
          }
        }
      }

      .ivu-menu-submenu-title {
        i {
          margin-right: 0;
        }

        .ivu-icon-ios-arrow-down {
          display: none;
        }
      }
    }
  }
}

.page {
  height: calc(~ '100% - 80px');

}
</style>
