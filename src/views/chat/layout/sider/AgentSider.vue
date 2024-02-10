<script lang='ts' setup>
import Header from './AgentSiderHeader.vue'
import Footer from './AgentSiderFooter.vue'
import List from './AgentList.vue'
</script>

<template>
  <div class="flex flex-col flex-shrink-0 h-full border-r w-[180px]">
    <Header />
    <main class="flex flex-col flex-1 min-h-0">
      <List />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped></style>
