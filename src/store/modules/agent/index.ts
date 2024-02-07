import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { defaultState } from './helper'

export const useAgentStore = defineStore('agent-store', () => {
  const state = reactive< Agent.AgentState>(defaultState())

  async function setActive(uuid: number) {
    state.active = uuid
  }

  return { state, setActive }
})
