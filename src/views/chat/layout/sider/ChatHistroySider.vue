<script setup lang='ts'>
import { computed } from 'vue'
import { NButton } from 'naive-ui'
import List from './ChatHistoryList.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { t } from '@/locales'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()

function handleAdd() {
  chatStore.addHistory({ title: t('chat.newChatTitle'), uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})
</script>

<template>
  <div v-bind="$attrs" class="flex flex-col h-full" :style="mobileSafeArea">
    <main class="flex flex-col flex-1 min-h-0">
      <div class="p-4">
        <NButton dashed block @click="handleAdd">
          {{ $t('chat.newChatButton') }}
        </NButton>
      </div>
      <div class="flex-1 min-h-0 pb-4 overflow-hidden">
        <List />
      </div>
    </main>
  </div>
</template>
