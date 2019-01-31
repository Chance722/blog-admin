<template>
  <section class="_dashboard">
    <div class="echarts_container">
      <div class="echarts_header">
        <p>
          <label>{{ dateTitle }}</label>
          <span class="blue">3</span>
        </p>
        <p>
          <label>{{ totalTitle }}</label>
          <span class="orange">102</span>
        </p>
        <el-select class="date-select" v-model="value" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <i class="refresh-icon el-icon-refresh" />
      </div>
      <v-chart :options="bar"/>
    </div>
  </section>
</template>

<script>
import Echarts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import api from '@/api'
import utils from '@/utils'
import { DATE_STAT_TYPE } from '@/config/const'
export default {
  components: {
    'v-chart': Echarts
  },
  data () {
    return {
      statisticsData: [],
      value: 1,
      options: [
        {
          label: '最近1周',
          value: 1
        },
        {
          label: '最近1月',
          value: 2
        },
        {
          label: '最近3月',
          value: 3
        },
        {
          label: '最近半年',
          value: 4
        }
      ],
      dateTitle: '新增用户数：',
      totalTitle: '总用户数：',
      bar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      }
    }
  },
  computed: {
    newUsers () {
      // let users = this.statisticsData.length ? this.statisticsData.filter(item => item.name === 'NEW_USERS') : []
      // let stamps = this.getAxisData('RECENT_WEEK')
      // let xAxis = stamps.map(item => utils.formatDate(item, true))
      // let yData = xAxis.map(item => {
      //   let value = 0
      //   // 如果没有统计数据 则均返回0
      //   if (!users.length) return value
      //   let beginStamp = new Date(`${item} 00:00:00`).getTime()
      //   let endStamp = new Date(`${item} 23:59,59`).getTime()
      //   users.filter(item =>)
      // })

      // return {
      //   xAxis: {
      //     type: 'category',
      //     data: xAxis
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [{
      //     data: [820, 932, 901, 934, 1290, 1330, 1320],
      //     type: 'line',
      //     areaStyle: {}
      //   }]
      // }
    }
  },
  created () {
    api.getDataByDate(DATE_STAT_TYPE['RECENT_MONTH']).then(res => {
       if (res.code === 200 && res.data.length) {
         this.statisticsData = res.data
       }
    }).catch(err => this.$message.error(err.message))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.echarts_container {
  position: relative;

  border: 1px solid #d7d7d7;
  width: 550px;
  height: 360px;

  .echarts_header {
    padding: 10px 20px;

    font-weight: 400;
    line-height: 30px;

    span,
    label {
      display: inline-block;

      vertical-align: middle;
    }

    span {
      font-weight: bold;
      font-size: 20px;
    }

    .orange {
      color: #ff9500;
    }

    .blue {
      color: #03a9f4;
    }

    .date-select {
      position: absolute;
      top: 20px;
      right:60px;

      width: 100px;
    }

    .refresh-icon {
      position: absolute;
      top: 26px;
      right: 20px;

      font-size: 21px;

      color: #999;
      cursor: pointer;

      transition: all ease .5s;
    }
    .refresh-icon:hover {
      color: #2b2b2b;
    }
  }

  .echarts {
    position: absolute;
    left: 50%;
    top: 58%;

    width: 90%;
    height: 90%;

    transform: translate(-50%, -50%);
  }
}

</style>
