var grammarvoiceloop = {
	numStates: 15,
	start: 0, end: 14,
	transitions: [
		{from: 0, to: 2, word: "SOE" },
		{from: 0, to: 2, word: "SPACON" },
		{from: 0, to: 1, word: "SOM" },
		{from: 1, to: 3, word: "ON" },
		{from: 2, to: 5, word: "SOM" },
		{from: 3, to: 4, word: "LOOP" },
		{from: 4, to: 6, word: "ONE" },
		{from: 5, to: 9, word: "CHANGE" },
		{from: 5, to: 8, word: "PLEASE" },
		{from: 5, to: 13, word: "HI" },
		{from: 5, to: 13, word: "HELLO" },
		{from: 5, to: 7, word: "GOOD" },
		{from: 6, to: 11, word: "HI" },
		{from: 6, to: 11, word: "HELLO" },
		{from: 6, to: 10, word: "GOOD" },
		{from: 7, to: 13, word: "MORNING" },
		{from: 8, to: 12, word: "INVESTIGATE" },
		{from: 9, to: 13, word: "LIMITS" },
		{from: 10, to: 11, word: "MORNING" },
		{from: 11, to: 14, word: "EVERYONE" },
		{from: 12, to: 13, word: "PARAMETER" },
		{from: 13, to: 14, logp: 0}
	]
};
