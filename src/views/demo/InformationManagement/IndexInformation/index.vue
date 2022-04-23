<template>
  <PageWrapper contentBackground>
    <template #footer>
      <a-tabs default-active-key="FoodAccommodationArrangements" v-model:activeKey="currentKey">
        <a-tab-pane key="FoodAccommodationArrangements" tab="食宿安排" />
        <a-tab-pane key="TravelArrangements" tab="行程安排" />
        <a-tab-pane key="SpeechActivities" tab="演讲活动" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'FoodAccommodationArrangements'">
        <a-tabs default-active-key="DiningArrangements">
          <a-tab-pane key="DiningArrangements" tab="用餐安排">
            <DiningArrangements />
          </a-tab-pane>
          <a-tab-pane key="AccommodationArrangements" tab="住宿安排" force-render>
            <AccommodationArrangements />
          </a-tab-pane>
          <a-tab-pane key="RideArrangements" tab="乘车安排">
            <RideArrangements />
          </a-tab-pane>
          <template #leftExtra>
            <span class="pt-4 m-4">分类：</span>
          </template>
        </a-tabs>
      </template>
      <template v-if="currentKey == 'TravelArrangements'"> <TravelArrangements /> </template>
      <template v-if="currentKey == 'SpeechActivities'"> <SpeechActivities /> </template>
    </div>
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { Tabs } from 'ant-design-vue';

  import DiningArrangements from './DiningArrangements.vue';
  import AccommodationArrangements from './AccommodationArrangements.vue';
  import RideArrangements from './RideArrangements.vue';
  import TravelArrangements from './TravelArrangements.vue';
  import SpeechActivities from './SpeechActivities.vue';

  export default defineComponent({
    name: 'IndexInformation',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      DiningArrangements,
      AccommodationArrangements,
      RideArrangements,
      TravelArrangements,
      SpeechActivities,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('FoodAccommodationArrangements');

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>
