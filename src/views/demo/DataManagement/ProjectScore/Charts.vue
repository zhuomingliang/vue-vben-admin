<template>
  <div>
    <div class="button">
      <RadioButtonGroup
        :options="[
          { label: '按县（市、区）', value: 0 },
          { label: '按项目', value: 1 },
        ]"
        v-model:value="radio"
      />
    </div>
    <div ref="chartRef" :style="{ height, width }"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted, watch } from 'vue';

  import { RadioButtonGroup } from '/@/components/Form';
  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    components: { RadioButtonGroup },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: 'calc(100vh - 78px)',
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const radio = ref(0);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const dataAll = [
        9.76, 9.64, 9.32, 9.31, 9.3, 9.23, 9.11, 8.82, 8.74, 8.55, 8.44, 8.25, 8.12, 8.11, 8.01,
        7.9, 7.87, 7.84, 7.45, 7.3,
      ];

      watch(
        () => radio.value,
        (value) => {
          console.log(value);
          if (value === 0) setBar0();
          else setBar1();
        },
        {
          immediate: false,
        },
      );
      const yAxisData = [
        '原因1原因1',
        '原因1原因1原因原因1原因1原原因11原因1原因1原因1原原因11原因1',
        '原因3',
        '原因4',
        '原因5',
        '原因6',
        '原因7',
        '原因8',
        '原因9',
        '原因10',
        '原因1原因1',
        '原因2',
        '原因3',
        '原因4',
        '原因5',
        '原因6',
        '原因7',
        '原因8',
        '原因9',
        '原因10',
      ];

      function setBar0() {
        setOptions({
          backgroundColor: '#fff',
          tooltip: {
            formatter: '{b} ({c})',
          },
          grid: { left: '1%', right: '1%', top: '5%', bottom: '1%', containLabel: true },
          xAxis: {
            type: 'category',
            data: [
              '原因1原因1原因1',
              '原因1原因1原原因11原因1',
              '原因3',
              '原因4',
              '原因5',
              '原因6',
              '原因7',
              '原因8',
              '原因9',
              '原因10',
              '原因1原因1原因1',
              '原因2',
              '原因3',
              '原因4',
              '原因5',
              '原因6',
              '原因7',
              '原因8',
              '原因9',
              '原因10',
            ],
            interval: 1,
            axisTick: { show: false },
            axisLabel: { show: true, rotate: 90, overflow: 'break', width: '120' },
            splitLine: { show: false },
            axisLine: { show: true, lineStyle: { color: '#62C6BA' } },
          },
          yAxis: {
            type: 'value',
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            axisLine: { show: true, lineStyle: { color: '#62C6BA' } },
          },
          series: [
            {
              type: 'bar',
              data: [
                9.76, 9.64, 9.32, 9.31, 9.3, 9.23, 9.11, 8.82, 8.74, 8.55, 8.44, 8.25, 8.12, 8.11,
                8.01, 7.9, 7.87, 7.84, 7.45, 7.3,
              ],
              itemStyle: { color: '#62C6BA' },
              label: { show: true, position: 'top', color: '#62C6BA' },
            },
          ],
          legend: {
            show: true,
          },
        });
      }
      function setBar1() {
        setOptions({
          backgroundColor: '#fff',
          grid: [
            { left: '12%', top: '7%', width: '15%', height: '90%' },
            { left: '38%', top: '7%', width: '15%', height: '90%' },
            { left: '66%', top: '7%', width: '15%', height: '90%' },
          ],
          tooltip: {
            formatter: '{b} ({c})',
          },
          xAxis: [
            {
              gridIndex: 0,
              axisTick: { show: false },
              axisLabel: { show: false },
              splitLine: { show: false },
              axisLine: { show: false },
            },
            {
              gridIndex: 1,
              axisTick: { show: false },
              axisLabel: { show: false },
              splitLine: { show: false },
              axisLine: { show: false },
            },
            {
              gridIndex: 2,
              axisTick: { show: false },
              axisLabel: { show: false },
              splitLine: { show: false },
              axisLine: { show: false },
            },
          ],
          yAxis: [
            {
              gridIndex: 0,
              interval: 0,
              data: yAxisData.reverse(),
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true, lineStyle: { color: '#60A4E3' } },
            },
            {
              gridIndex: 1,
              interval: 0,
              data: yAxisData.reverse(),
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true, lineStyle: { color: '#60A4E3' } },
            },
            {
              gridIndex: 2,
              interval: 0,
              data: yAxisData.reverse(),
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '100' },
              splitLine: { show: false },
              axisLine: { show: true, lineStyle: { color: '#60A4E3' } },
            },
          ],
          series: [
            {
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              label: { show: true, position: 'right', color: '#60A4E3' },
              data: dataAll.sort(),
            },
            {
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              label: { show: true, position: 'right', color: '#60A4E3' },
              data: dataAll.sort(),
            },
            {
              type: 'bar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              label: { show: true, position: 'right', color: '#60A4E3' },
              data: dataAll.sort(),
            },
          ],
        });
      }
      onMounted(() => {
        setBar0();
      });
      return { radio, chartRef };
    },
  });
</script>
<style scoped>
  .button {
    z-index: 9999;
    position: fixed;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>
