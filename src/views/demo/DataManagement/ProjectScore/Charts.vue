<template>
  <div>
    <div class="button">
      <RadioButtonGroup
        :options="[
          { label: '按县（市、区）', value: 0 },
          { label: '按项目', value: 1 },
        ]"
        :value="radio"
        @change="(e) => (radio = e.target ? e.target.value : e)"
      />
    </div>
    <div ref="chartRef" :style="{ height, width }"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, unref, ref, Ref, onMounted, watch } from 'vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getProjectScoreRank } from '/@/api/demo/project';

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

      const { getInstance, setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      let isFirstSetArea = 1;
      let isFirstSetProject = 1;
      watch(
        () => radio.value,
        (value) => {
          if (value === 0) {
            isFirstSetArea = 1;
            fetchAreaScore();
          } else {
            isFirstSetProject = 1;
            fetchProjectScore();
          }
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
          grid: { left: '1%', right: '1%', top: '7%', bottom: '2%', containLabel: true },
          xAxis: {
            type: 'category',
            data: data.label,
            axisTick: { show: false },
            axisLabel: { show: true, overflow: 'break', width: '120' },
            splitLine: { show: false },
            axisLine: { show: true },
            animationDuration: 300,
            animationDurationUpdate: 300,
          },
          yAxis: {
            type: 'value',
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            axisLine: { show: true },
          },
          series: [
            {
              realtimeSort: true,
              type: 'bar',
              data: data.value,
              itemStyle: { color: '#62C6BA' },
              label: { show: true, position: 'top', valueAnimation: true },
            },
          ],
          legend: {
            show: true,
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear',
        });
      }

      function setAreaScoreData(data: any) {
        getInstance()?.setOption({
          xAxis: {
            type: 'category',
            data: data.label,
          },
          series: [
            {
              type: 'bar',
              data: data.value,
            },
          ],
        });
      }

      function setProjectScore(data: any) {
        setOptions({
          backgroundColor: '#fff',
          grid: [
            { left: '14%', top: '7%', width: '15%', height: '90%' },
            { left: '43%', top: '7%', width: '15%', height: '90%' },
            { left: '71%', top: '7%', width: '15%', height: '90%' },
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
              inverse: true,
              data: data[0].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true },
              animationDuration: 300,
              animationDurationUpdate: 300,
            },
            {
              gridIndex: 1,
              interval: 0,
              inverse: true,
              data: data[1].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true },
              animationDuration: 300,
              animationDurationUpdate: 300,
            },
            {
              gridIndex: 2,
              interval: 0,
              inverse: true,
              data: data[2].label,
              axisTick: { show: false },
              axisLabel: { show: true, overflow: 'break', width: '150' },
              splitLine: { show: false },
              axisLine: { show: true },
              animationDuration: 300,
              animationDurationUpdate: 300,
            },
          ],
          series: [
            {
              realtimeSort: true,
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              data: data[0].value,
              label: { show: true, position: 'right' },
            },
            {
              realtimeSort: true,
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              data: data[1].value,
              label: { show: true, position: 'right' },
            },
            {
              realtimeSort: true,
              type: 'bar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              barWidth: '33%',
              itemStyle: { color: '#60A4E3' },
              data: data[2].value,
              label: { show: true, position: 'right' },
            },
          ],
        });
      }

      function setProjectScoreData(data: any) {
        getInstance()?.setOption({
          yAxis: [
            {
              data: data[0].label,
            },
            {
              data: data[1].label,
            },
            {
              data: data[2].label,
            },
          ],
          series: [
            {
              type: 'bar',
              data: data[0].value,
              label: { valueAnimation: true },
            },
            {
              type: 'bar',
              data: data[1].value,
              label: { valueAnimation: true },
            },
            {
              type: 'bar',
              data: data[2].value,
              label: { valueAnimation: true },
            },
          ],
        });
      }

      async function fetchAreaScore() {
        const data = await getAreaScore();
        if (isFirstSetArea) {
          isFirstSetArea = 0;
          setAreaScore(data);
        } else setAreaScoreData(data);
      }

      async function fetchProjectScore() {
        const labels: Array<String> = [];
        const values: Array<Number> = [];
        const r: Array<Object> = [];

        const data = await getProjectScoreRank();

        data.map((v: any) => {
          labels.push(v.project);
          values.push(v.project_score);
        });

        r.push({ label: labels.slice(0, 20), value: values.slice(0, 20) });
        r.push({ label: labels.slice(21, 40), value: values.slice(21, 40) });
        r.push({ label: labels.slice(41, 60), value: values.slice(41, 60) });

        if (isFirstSetProject) {
          isFirstSetProject = 0;
          setProjectScore(r);
        } else setProjectScoreData(r);
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
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>
