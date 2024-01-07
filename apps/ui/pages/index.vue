<template>
  <n-layout class="content" position="absolute" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="COLLAPSED_WIDTH"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      :native-scrollbar="false"
      content-style="display: flex; flex-direction: column; height:100%;"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="COLLAPSED_WIDTH"
        :collapsed-icon-size="COLLAPSED_ICON_SIZE"
        :options="sidebarMenuOptions"
      />
    </n-layout-sider>

    <n-layout content-style="height: 100%;">
      <NuxtPage />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface';

import { NIcon } from 'naive-ui';

definePageMeta({
  middleware: ['auth'],
});

const COLLAPSED_WIDTH = 58;
const COLLAPSED_ICON_SIZE = 26;
const collapsed = ref(true);
const activeKey = ref('');

const sidebarMenuOptions: MenuMixedOption[] = [];

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>

<style lang="sass" scoped>
// $HEADER_HEIGHT: 42px
$HEADER_HEIGHT: 0px
$FOOTER_HEIGHT: 0px

.header
  height: $HEADER_HEIGHT

.content
  top: $HEADER_HEIGHT
  bottom: $FOOTER_HEIGHT
</style>
