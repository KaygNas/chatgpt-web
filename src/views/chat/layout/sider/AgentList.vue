<script lang='ts' setup>
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
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
  <NMenu :value="agentStore.state.active" :options="menuOptions" @update:value="handleAgentChange" />
</template>

<style lang="scss" scoped></style>
