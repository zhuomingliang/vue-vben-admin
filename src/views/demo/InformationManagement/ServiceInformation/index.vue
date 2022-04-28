<template>
  <PageWrapper contentBackground>
    <template #footer>
      <Tabs default-active-key="HotelInformation" v-model:activeKey="currentKey">
        <TabPane key="HotelInformation" tab="酒店信息" />
        <TabPane key="TrafficInformation" tab="交通信息" />
        <TabPane key="EpidemicPreventionInstructions" tab="防疫须知" />
      </Tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'HotelInformation'">
        <Tabs default-active-key="HotelInformation">
          <TabPane key="HotelInformation" tab="酒店信息">
            <HotelInformation />
          </TabPane>
          <TabPane key="VehicleSafeguard" tab="车辆保障" force-render>
            <VehicleSafeguard />
          </TabPane>
          <TabPane key="MedicalSecurity" tab="医疗保障">
            <MedicalSecurity />
          </TabPane>
          <template #leftExtra>
            <span class="pt-4 m-4">分类：</span>
          </template>
        </Tabs>
      </template>
      <template v-if="currentKey == 'VehicleSafeguard'"> <VehicleSafeguard /> </template>
      <template v-if="currentKey == 'MedicalSecurity'"> <MedicalSecurity /> </template>
    </div>
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { Tabs } from 'ant-design-vue';

  import HotelInformation from './HotelInformation.vue';
  import VehicleSafeguard from './VehicleSafeguard.vue';
  import MedicalSecurity from './MedicalSecurity.vue';
  import VehicleSafeguard from './VehicleSafeguard.vue';
  import MedicalSecurity from './MedicalSecurity.vue';

  export default defineComponent({
    name: 'IndexInformation',
    components: {
      PageWrapper,
      Tabs: Tabs,
      TabPane: Tabs.TabPane,
      HotelInformation,
      VehicleSafeguard,
      MedicalSecurity,
      VehicleSafeguard,
      MedicalSecurity,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('HotelInformation');

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>
