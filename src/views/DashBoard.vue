<template>
  <section class="_dashboard">
    <div class="echarts_container">
      <div class="echarts_header">
        <p>
          <label>{{ commentOpts.dateTitle }}</label>
          <span class="blue">{{ commentOpts.dateNums }}</span>
        </p>
        <p>
          <label>{{ commentOpts.totalTitle }}</label>
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
      <v-chart :options="commentOpts.opts"/>
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
// import utils from '@/utils'
import { DATE_STAT_TYPE } from '@/config/const'
export default {
  components: {
    'v-chart': Echarts
  },
  data () {
    return {
      statisticsData: [],
      xAxisData: [],
      yAxisData: [],
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
      commentOpts: {
        dateTitle: '新增评论数：',
        totalTitle: '总评论数：',
        dateNums: 0,
        opts: {
          tooltip: {
            formatter: (params) => {
              return `${this.xAxisData[params.dataIndex]}<br> 新增用户数：${params.data}`
            }
          },
          xAxis: {
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 10,
              textStyle: {
                color: '#222'
              }}
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true,
            areaStyle: {}
          }]
        }
      }
    }
  },
  computed: {
    commentsData () {
      let ydata = this.getYaxisData('NEW_COMMENTS')
      return {
        yaxisData: ydata,
        dateNums: ydata.reduce((a, b) => a + b)
      }
    }
  },
  created () {
    api.getDataByDate(DATE_STAT_TYPE['RECENT_WEEK']).then(res => {
      if (res.code === 200 && res.data.length) {
        this.statisticsData = res.data
        this.xAxisData = this.statisticsData.map(item => item.date)
        this.yAxisData = this.statisticsData.map(item => item.list)
        this.initChartsData()
      }
    }).catch(err => this.$message.error(err.message))
  },
  methods: {
    getYaxisData (type) {
      let yaxisData = this.yAxisData.slice()
      yaxisData.forEach(item => {
        item.filter(citem => citem.name === type)
      })
      return yaxisData.map(item => item.length)
    },
    initChartsData () {
      this.commentOpts.opts.series[0].data = this.commentsData.yaxisData
      this.commentOpts.dateNums = this.commentsData.dateNums
    }
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
