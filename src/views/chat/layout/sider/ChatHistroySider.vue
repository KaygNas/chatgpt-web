<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, useDialog } from 'naive-ui'
import List from './ChatHistoryList.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore, SvgIcon } from '@/components/common'
import { t } from '@/locales'

const appStore = useAppStore()
const chatStore = useChatStore()

const dialog = useDialog()

const { isMobile } = useBasicLayout()
const show = ref(false)

function handleAdd() {
  chatStore.addHistory({ title: t('chat.newChatTitle'), uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleClearAll() {
  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.clearHistoryConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.clearHistory()
      if (isMobile.value)
        appStore.setSiderCollapsed(true)
    },
  })
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
      <div class="flex items-center p-4 space-x-4">
        <div class="flex-1">
          <NButton block @click="show = true">
            {{ $t('store.siderButton') }}
          </NButton>
        </div>
        <NButton @click="handleClearAll">
          <SvgIcon icon="ri:close-circle-line" />
        </NButton>
      </div>
    </main>
  </div>
  <PromptStore v-model:visible="show" />
</template>
