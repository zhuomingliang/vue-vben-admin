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
  import { defineComponent, PropType, unref, ref, Ref, onMounted, watch } from 'vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getProjectScore } from '/@/api/demo/project';

  import { getAreaScore } from '/@/api/demo/project';
  import { useIntervalFn } from '@vueuse/core';

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

      watch(
        () => radio.value,
        (value) => {
          if (value === 0) fetchAreaScore();
          else fetchProjectScore();
        },
        {
          immediate: false,
        },
      );

      function setAreaScore(data: any) {
        setOptions({
          backgroundColor: '#fff',
          tooltip: {
            formatter: '{b} ({c})',
          },
          grid: { left: '1%', right: '1%', top: '5%', bottom: '1%', containLabel: true },
          xAxis: {
            type: 'category',
            data: data.label,
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
              data: data.value,
              itemStyle: { color: '#62C6BA' },
              label: { show: true, position: 'top', color: '#62C6BA' },
            },
          ],
          legend: {
            show: true,
          },
        });
      }
      function setProjectScore(data: any) {
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
              data: data[0].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true, lineStyle: { color: '#60A4E3' } },
            },
            {
              gridIndex: 1,
              interval: 0,
              data: data[1].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true, lineStyle: { color: '#60A4E3' } },
            },
            {
              gridIndex: 2,
              interval: 0,
              data: data[2].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
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
              data: data[0].value,
            },
            {
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              label: { show: true, position: 'right', color: '#60A4E3' },
              data: data[1].value,
            },
            {
              type: 'bar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              label: { show: true, position: 'right', color: '#60A4E3' },
              data: data[2].value,
            },
          ],
        });
      }

      async function fetchAreaScore() {
        const data = await getAreaScore();
        setAreaScore(data);
      }

      async function fetchProjectScore() {
        const labels: Array<String> = [];
        const values: Array<Number> = [];
        const r: Array<Object> = [];

        const data = await getProjectScore();

        data.map((v: any) => {
          labels.push(v.project);
          values.push(v.project_score);
        });

        r.push({ label: labels.slice(0, 20), value: values.slice(0, 20) });
        r.push({ label: labels.slice(21, 40), value: values.slice(21, 40) });
        r.push({ label: labels.slice(41, 60), value: values.slice(41, 60) });

        setProjectScore(r);
      }

      function fetch() {
        const select = unref(radio);
        if (select === 0) fetchAreaScore();
        else fetchProjectScore();
      }
      onMounted(() => {
        fetchAreaScore();
        useIntervalFn(fetch, 3000);
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
