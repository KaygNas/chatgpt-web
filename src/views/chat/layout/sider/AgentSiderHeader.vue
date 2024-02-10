<script setup lang='ts'>
import { UserAvatar } from '@/components/common'
</script>

<template>
  <header class="flex items-center min-w-0 p-4 overflow-hidden border-b dark:border-neutral-800">
    <div class="flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>
    <div class="flex-1 p-4 text-xl font-bold">
      问迪AI
    </div>
  </header>
</template>
