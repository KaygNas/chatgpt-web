<script lang='ts' setup>
import type { MenuOption } from 'naive-ui'
import { NMenu, NScrollbar } from 'naive-ui'
import { computed } from 'vue'
import { useIconRender } from '@/hooks/useIconRender'
import { useAgentStore } from '@/store'
const { iconRender } = useIconRender()
const agentStore = useAgentStore()
const menuOptions = computed<MenuOption[]>(() => {
  return agentStore.state.agentList.map((agent) => {
    return {
      label: agent.name,
      key: agent.uuid,
      icon: iconRender({ icon: agent.icon }),
    }
  })
})
const handleAgentChange = (uuid: number) => {
  agentStore.setActive(uuid)
}
</script>

<template>
  <NScrollbar>
    <NMenu :value="agentStore.state.active" :options="menuOptions" :root-indent="16" @update:value="handleAgentChange" />
  </NScrollbar>
</template>

<style lang="scss" scoped></style>
