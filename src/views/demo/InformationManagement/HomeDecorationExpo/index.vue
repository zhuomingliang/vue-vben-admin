<template>
  <PageWrapper contentBackground>
    <template #footer>
      <a-tabs default-active-key="HomeDecorationExpoInfo" v-model:activeKey="currentKey">
        <a-tab-pane key="HomeDecorationExpoInfo" tab="展会信息" />
        <a-tab-pane key="AdvertisingVideo" tab="宣传片介绍" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'HomeDecorationExpoInfo'">
        <HomeDecorationExpoInfo />
      </template>
      <template v-if="currentKey == 'AdvertisingVideo'"> <AdvertisingVideo /> </template>
    </div>
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { Tabs } from 'ant-design-vue';

  import AdvertisingVideo from './AdvertisingVideo.vue';
  import HomeDecorationExpoInfo from './HomeDecorationExpo.vue';

  export default defineComponent({
    name: 'HomeDecorationExpo',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      AdvertisingVideo,
      HomeDecorationExpoInfo,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('HomeDecorationExpoInfo');

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>
