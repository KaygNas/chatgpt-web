import { ss } from '@/utils/storage'
import { t } from '@/locales'

const LOCAL_NAME = 'chatStorage'

const getLocalName = (agentUuid: number) => `${LOCAL_NAME}-${agentUuid}`

export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: t('chat.newChatTitle'), isEdit: false }],
    chat: [{ uuid, data: [] }],
  }
}

export function getLocalState(agentUuid: number): Chat.ChatState {
  const localState = ss.get(getLocalName(agentUuid))
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState, agentUuid: number) {
  ss.set(getLocalName(agentUuid), state)
}
