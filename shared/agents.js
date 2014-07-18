var agent_i = 'SOM';

var predefined_agents = ['SOM', 'SOE', 'SPACON'];

var known_agents = [];

function add_agent(agent) {
	if ( ! d3.set(known_agents).has(agent) ) {
		known_agents.push(agent);
	}
}
