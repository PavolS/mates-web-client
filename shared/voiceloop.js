var grammarvoiceloop = {
	numStates: 5,
	start: 0, end: 4,
	transitions: [
		{from: 0, to: 1, word: "JIM" },
		{from: 0, to: 1, word: "SCOTTY" },
		{from: 1, to: 2, word: "JIM" },
		{from: 1, to: 2, word: "SCOTTY" },
		{from: 2, to: 3, word: "LOAD" },
		{from: 3, to: 4, word: "SEQUENCE" },
		{from: 3, to: 4, word: "COMMAND" }
	]
};
