declare namespace Agent {
	interface Agent {
		uuid: number;
		name: string;
		icon: string;
	}
	interface AgentState {
		active: number;
		agentList: Agent[];
	}
}
