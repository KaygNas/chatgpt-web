export function defaultState(): Agent.AgentState {
  const uuid = 0
  const agentList: Agent.AgentState['agentList'] = Array.from({ length: 7 }).map((_, i) => {
    return {
      uuid: i,
      name: `Agent${String(i)}`,
      icon: 'ri:collage-fill',
    }
  })
  return {
    active: uuid,
    agentList,
  }
}
