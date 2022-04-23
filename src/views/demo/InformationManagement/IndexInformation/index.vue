<template>
  <PageWrapper contentBackground>
    <template #footer>
      <a-tabs default-active-key="AccommodationArrangements" v-model:activeKey="currentKey">
        <a-tab-pane key="AccommodationArrangements" tab="食宿安排" />
        <a-tab-pane key="TravelArrangements" tab="行程安排" />
        <a-tab-pane key="SpeechActivities" tab="演讲活动" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'AccommodationArrangements'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}资料Tab</div>
      </template>
      <template v-if="currentKey == 'TravelArrangements'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}操作日志Tab</div>
      </template>
      <template v-if="currentKey == 'SpeechActivities'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}操作日志Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { Tabs } from 'ant-design-vue';
  export default defineComponent({
    name: 'IndexInformation',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('AccommodationArrangements');

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>
