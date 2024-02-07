import { defineStore } from 'pinia'
import { computed, reactive, toRefs, watch } from 'vue'
import { useAgentStore } from '../agent'
import { defaultState, getLocalState, setLocalState } from './helper'
import { router } from '@/router'
import { t } from '@/locales'

export const useChatStore = defineStore('chat-store', () => {
  const agentStore = useAgentStore()
  const state = reactive<Chat.ChatState>(getLocalState(agentStore.state.active))
  watch(
    () => agentStore.state.active,
    () => {
      Object.assign(state, getLocalState(agentStore.state.active))
      reloadRoute(state.active)
    },
  )

  const getChatHistoryByCurrentActive = computed(() => {
    const index = state.history.findIndex(item => item.uuid === state.active)
    if (index !== -1)
      return state.history[index]
    return null
  })

  const getChatByUuid = computed(() => {
    return (uuid?: number) => {
      if (uuid)
        return state.chat.find(item => item.uuid === uuid)?.data ?? []
      return state.chat.find(item => item.uuid === state.active)?.data ?? []
    }
  })

  function setUsingContext(context: boolean) {
    state.usingContext = context
    recordState()
  }

  function addHistory(history: Chat.History, chatData: Chat.Chat[] = []) {
    state.history.unshift(history)
    state.chat.unshift({ uuid: history.uuid, data: chatData })
    state.active = history.uuid
    reloadRoute(history.uuid)
  }

  function updateHistory(uuid: number, edit: Partial<Chat.History>) {
    const index = state.history.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      state.history[index] = { ...state.history[index], ...edit }
      recordState()
    }
  }

  async function deleteHistory(index: number) {
    state.history.splice(index, 1)
    state.chat.splice(index, 1)

    if (state.history.length === 0) {
      state.active = null
      reloadRoute()
      return
    }

    if (index > 0 && index <= state.history.length) {
      const uuid = state.history[index - 1].uuid
      state.active = uuid
      reloadRoute(uuid)
      return
    }

    if (index === 0) {
      if (state.history.length > 0) {
        const uuid = state.history[0].uuid
        state.active = uuid
        reloadRoute(uuid)
      }
    }

    if (index > state.history.length) {
      const uuid = state.history[state.history.length - 1].uuid
      state.active = uuid
      reloadRoute(uuid)
    }
  }

  async function setActive(uuid: number) {
    state.active = uuid
    return await reloadRoute(uuid)
  }

  function getChatByUuidAndIndex(uuid: number, index: number) {
    if (!uuid || uuid === 0) {
      if (state.chat.length)
        return state.chat[0].data[index]
      return null
    }
    const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
    if (chatIndex !== -1)
      return state.chat[chatIndex].data[index]
    return null
  }

  function addChatByUuid(uuid: number, chat: Chat.Chat) {
    if (!uuid || uuid === 0) {
      if (state.history.length === 0) {
        const uuid = Date.now()
        state.history.push({ uuid, title: chat.text, isEdit: false })
        state.chat.push({ uuid, data: [chat] })
        state.active = uuid
        recordState()
      }
      else {
        state.chat[0].data.push(chat)
        if (state.history[0].title === t('chat.newChatTitle'))
          state.history[0].title = chat.text
        recordState()
      }
    }

    const index = state.chat.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      state.chat[index].data.push(chat)
      if (state.history[index].title === t('chat.newChatTitle'))
        state.history[index].title = chat.text
      recordState()
    }
  }

  function updateChatByUuid(uuid: number, index: number, chat: Chat.Chat) {
    if (!uuid || uuid === 0) {
      if (state.chat.length) {
        state.chat[0].data[index] = chat
        recordState()
      }
      return
    }

    const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
    if (chatIndex !== -1) {
      state.chat[chatIndex].data[index] = chat
      recordState()
    }
  }

  function updateChatSomeByUuid(uuid: number, index: number, chat: Partial<Chat.Chat>) {
    if (!uuid || uuid === 0) {
      if (state.chat.length) {
        state.chat[0].data[index] = { ...state.chat[0].data[index], ...chat }
        recordState()
      }
      return
    }

    const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
    if (chatIndex !== -1) {
      state.chat[chatIndex].data[index] = { ...state.chat[chatIndex].data[index], ...chat }
      recordState()
    }
  }

  function deleteChatByUuid(uuid: number, index: number) {
    if (!uuid || uuid === 0) {
      if (state.chat.length) {
        state.chat[0].data.splice(index, 1)
        recordState()
      }
      return
    }

    const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
    if (chatIndex !== -1) {
      state.chat[chatIndex].data.splice(index, 1)
      recordState()
    }
  }

  function clearChatByUuid(uuid: number) {
    if (!uuid || uuid === 0) {
      if (state.chat.length) {
        state.chat[0].data = []
        recordState()
      }
      return
    }

    const index = state.chat.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      state.chat[index].data = []
      recordState()
    }
  }

  function clearHistory() {
    Object.assign(state, defaultState())
    recordState()
  }

  async function reloadRoute(uuid?: number | null) {
    recordState()
    await router.push({ name: 'Chat', params: { uuid } })
  }

  function recordState() {
    setLocalState(state, agentStore.state.active)
  }
  return { ...toRefs(state), getChatByUuid, getChatHistoryByCurrentActive, setUsingContext, addHistory, updateHistory, deleteHistory, setActive, getChatByUuidAndIndex, addChatByUuid, updateChatByUuid, updateChatSomeByUuid, deleteChatByUuid, clearChatByUuid, clearHistory }
})
