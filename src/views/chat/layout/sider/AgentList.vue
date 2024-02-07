<script lang='ts' setup>
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { useIconRender } from '@/hooks/useIconRender'
const { iconRender } = useIconRender()
const menuOptions: MenuOption[] = Array.from({ length: 7 }).map((_, i) => {
  return {
    label: `Agent${String(i)}`,
    key: i,
    icon: iconRender({ icon: 'ri:collage-fill' }),
  }
})
</script>

<template>
  <NMenu :options="menuOptions" />
</template>

<style lang="scss" scoped></style>
