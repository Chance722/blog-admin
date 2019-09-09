<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off, } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null,
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
  },
  mounted () {
    const option = {
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {
            color: '#9a66e4',
          },
          itemStyle : {
            normal : {
              lineStyle:{
                color: '#9a66e4',
              }
            }
          }
      }]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  },
}
</script>
