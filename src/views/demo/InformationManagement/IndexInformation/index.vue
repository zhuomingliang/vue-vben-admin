<template>
  <PageWrapper contentBackground>
    <template #footer>
      <Tabs default-active-key="FoodAccommodationArrangements" v-model:activeKey="currentKey">
        <TabPane key="FoodAccommodationArrangements" tab="食宿安排" />
        <TabPane key="TravelArrangements" tab="行程安排" />
        <TabPane key="SpeechActivities" tab="演讲活动" />
      </Tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'FoodAccommodationArrangements'">
        <!-- <Tabs default-active-key="DiningArrangements">
          <TabPane key="DiningArrangements" tab="用餐安排">
            <DiningArrangements />
          </TabPane>
          <TabPane key="AccommodationArrangements" tab="住宿安排">
            <AccommodationArrangements />
          </TabPane>
          <TabPane key="RideArrangements" tab="乘车安排">
            <RideArrangements />
          </TabPane>
          <template #leftExtra>
            <span class="pt-4 m-4">分类：</span>
          </template>
        </Tabs> -->
        <AccommodationArrange />
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

  import AccommodationArrange from './AccommodationArrange.vue';

  import TravelArrangements from './TravelArrangements.vue';
  import SpeechActivities from './SpeechActivities.vue';

  export default defineComponent({
    name: 'IndexInformation',
    components: {
      PageWrapper,
      Tabs: Tabs,
      TabPane: Tabs.TabPane,
      AccommodationArrange,
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
