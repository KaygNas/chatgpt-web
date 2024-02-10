export function defaultState(): Agent.AgentState {
  const uuid = 0
  const agentNames = ['智能代码', '智能翻译', '采购业务', '新能源知识库', 'BOM知识库', 'PLM知识库', 'PMS知识库']
  const agentList: Agent.AgentState['agentList'] = agentNames.map((name, i) => {
    return {
      uuid: i,
      name,
      icon: 'ri:collage-fill',
    }
  })
  return {
    active: uuid,
    agentList,
  }
}
