var grammarvoiceloop = {
	numStates: 42,
	start: 0, end: 41,
	transitions: [
		{from: 0, to: 14, word: "ROLL" },
		{from: 0, to: 15, word: "REPEAT" },
		{from: 0, to: 16, word: "COPY" },
		{from: 0, to: 16, word: "PROCEED" },
		{from: 0, to: 16, word: "WILCO" },
		{from: 0, to: 17, word: "INVESTIGATE" },
		{from: 0, to: 18, word: "CHANGE" },
		{from: 0, to: 7, word: "SOE" },
		{from: 0, to: 7, word: "SPACON" },
		{from: 0, to: 9, word: "PLEASE" },
		{from: 0, to: 9, word: "KINDLY" },
		{from: 0, to: 6, word: "COULD" },
		{from: 0, to: 4, word: "SOM" },
		{from: 0, to: 3, word: "THIS" },
		{from: 0, to: 3, word: "HERE" },
		{from: 0, to: 2, word: "TO" },
		{from: 0, to: 2, word: "FOR" },
		{from: 0, to: 1, word: "ALL" },
		{from: 1, to: 13, word: "STATIONS" },
		{from: 2, to: 7, word: "SOE" },
		{from: 2, to: 7, word: "SPACON" },
		{from: 3, to: 4, word: "SOM" },
		{from: 3, to: 5, word: "IS" },
		{from: 4, to: 10, word: "ON" },
		{from: 5, to: 4, word: "SOM" },
		{from: 6, to: 9, word: "YOU" },
		{from: 7, to: 24, word: "SOM" },
		{from: 7, to: 21, word: "THIS" },
		{from: 7, to: 21, word: "HERE" },
		{from: 8, to: 11, word: "YOU" },
		{from: 9, to: 18, word: "CHANGE" },
		{from: 9, to: 17, word: "INVESTIGATE" },
		{from: 9, to: 16, word: "WILCO" },
		{from: 9, to: 16, word: "PROCEED" },
		{from: 9, to: 16, word: "COPY" },
		{from: 9, to: 15, word: "REPEAT" },
		{from: 9, to: 14, word: "ROLL" },
		{from: 10, to: 12, word: "LOOP" },
		{from: 11, to: 37, word: "WILCO" },
		{from: 11, to: 37, word: "PROCEED" },
		{from: 11, to: 37, word: "COPY" },
		{from: 11, to: 19, word: "REPEAT" },
		{from: 11, to: 36, word: "CHANGE" },
		{from: 11, to: 35, word: "INVESTIGATE" },
		{from: 11, to: 34, word: "ROLL" },
		{from: 12, to: 13, word: "ONE" },
		{from: 13, to: 34, word: "ROLL" },
		{from: 13, to: 35, word: "INVESTIGATE" },
		{from: 13, to: 36, word: "CHANGE" },
		{from: 13, to: 19, word: "REPEAT" },
		{from: 13, to: 37, word: "COPY" },
		{from: 13, to: 37, word: "PROCEED" },
		{from: 13, to: 37, word: "WILCO" },
		{from: 13, to: 11, word: "PLEASE" },
		{from: 13, to: 11, word: "KINDLY" },
		{from: 13, to: 8, word: "COULD" },
		{from: 14, to: 16, word: "CALL" },
		{from: 15, to: 29, word: "THANKS" },
		{from: 15, to: 27, word: "THANK" },
		{from: 15, to: 29, word: "PLEASE" },
		{from: 15, to: 23, word: "THAT" },
		{from: 15, to: 41, logp: 0},
		{from: 16, to: 29, word: "THANKS" },
		{from: 16, to: 27, word: "THANK" },
		{from: 16, to: 29, word: "PLEASE" },
		{from: 16, to: 41, logp: 0},
		{from: 17, to: 20, word: "PARAMETER" },
		{from: 18, to: 16, word: "LIMITS" },
		{from: 19, to: 39, word: "THANKS" },
		{from: 19, to: 28, word: "THANK" },
		{from: 19, to: 39, word: "PLEASE" },
		{from: 19, to: 40, word: "THAT" },
		{from: 19, to: 41, logp: 0},
		{from: 20, to: 29, word: "THANKS" },
		{from: 20, to: 27, word: "THANK" },
		{from: 20, to: 29, word: "PLEASE" },
		{from: 20, to: 30, word: "CAPITAL" },
		{from: 20, to: 30, word: "ALPHA" },
		{from: 20, to: 30, word: "JULIET" },
		{from: 20, to: 30, word: "SIERRA" },
		{from: 20, to: 30, word: "BRAVO" },
		{from: 20, to: 30, word: "KILO" },
		{from: 20, to: 30, word: "TANGO" },
		{from: 20, to: 30, word: "CHARLIE" },
		{from: 20, to: 30, word: "LIMA" },
		{from: 20, to: 30, word: "UNIFORM" },
		{from: 20, to: 30, word: "DELTA" },
		{from: 20, to: 30, word: "MIKE" },
		{from: 20, to: 30, word: "VICTOR" },
		{from: 20, to: 30, word: "ECHO" },
		{from: 20, to: 30, word: "NOVEMBER" },
		{from: 20, to: 30, word: "WHISKEY" },
		{from: 20, to: 30, word: "FOXTROT" },
		{from: 20, to: 30, word: "OSCAR" },
		{from: 20, to: 31, word: "X" },
		{from: 20, to: 30, word: "GOLF" },
		{from: 20, to: 30, word: "PAPA" },
		{from: 20, to: 30, word: "YANKEE" },
		{from: 20, to: 30, word: "HOTEL" },
		{from: 20, to: 30, word: "QUEBEC" },
		{from: 20, to: 30, word: "ZULU" },
		{from: 20, to: 30, word: "INDIA" },
		{from: 20, to: 30, word: "ROMEO" },
		{from: 20, to: 30, word: "ONE" },
		{from: 20, to: 30, word: "FIVE" },
		{from: 20, to: 30, word: "NINE" },
		{from: 20, to: 30, word: "TWO" },
		{from: 20, to: 30, word: "SIX" },
		{from: 20, to: 30, word: "ZERO" },
		{from: 20, to: 30, word: "THREE" },
		{from: 20, to: 30, word: "SEVEN" },
		{from: 20, to: 30, word: "DECIMAL" },
		{from: 20, to: 30, word: "FOUR" },
		{from: 20, to: 30, word: "ATE" },
		{from: 20, to: 30, word: "THOUSAND" },
		{from: 20, to: 26, word: "SPELLING" },
		{from: 20, to: 41, logp: 0},
		{from: 21, to: 24, word: "SOM" },
		{from: 21, to: 25, word: "IS" },
		{from: 22, to: 39, word: "THANKS" },
		{from: 22, to: 28, word: "THANK" },
		{from: 22, to: 39, word: "PLEASE" },
		{from: 22, to: 32, word: "CAPITAL" },
		{from: 22, to: 32, word: "ALPHA" },
		{from: 22, to: 32, word: "JULIET" },
		{from: 22, to: 32, word: "SIERRA" },
		{from: 22, to: 32, word: "BRAVO" },
		{from: 22, to: 32, word: "KILO" },
		{from: 22, to: 32, word: "TANGO" },
		{from: 22, to: 32, word: "CHARLIE" },
		{from: 22, to: 32, word: "LIMA" },
		{from: 22, to: 32, word: "UNIFORM" },
		{from: 22, to: 32, word: "DELTA" },
		{from: 22, to: 32, word: "MIKE" },
		{from: 22, to: 32, word: "VICTOR" },
		{from: 22, to: 32, word: "ECHO" },
		{from: 22, to: 32, word: "NOVEMBER" },
		{from: 22, to: 32, word: "WHISKEY" },
		{from: 22, to: 32, word: "FOXTROT" },
		{from: 22, to: 32, word: "OSCAR" },
		{from: 22, to: 33, word: "X" },
		{from: 22, to: 32, word: "GOLF" },
		{from: 22, to: 32, word: "PAPA" },
		{from: 22, to: 32, word: "YANKEE" },
		{from: 22, to: 32, word: "HOTEL" },
		{from: 22, to: 32, word: "QUEBEC" },
		{from: 22, to: 32, word: "ZULU" },
		{from: 22, to: 32, word: "INDIA" },
		{from: 22, to: 32, word: "ROMEO" },
		{from: 22, to: 32, word: "ONE" },
		{from: 22, to: 32, word: "FIVE" },
		{from: 22, to: 32, word: "NINE" },
		{from: 22, to: 32, word: "TWO" },
		{from: 22, to: 32, word: "SIX" },
		{from: 22, to: 32, word: "ZERO" },
		{from: 22, to: 32, word: "THREE" },
		{from: 22, to: 32, word: "SEVEN" },
		{from: 22, to: 32, word: "DECIMAL" },
		{from: 22, to: 32, word: "FOUR" },
		{from: 22, to: 32, word: "ATE" },
		{from: 22, to: 32, word: "THOUSAND" },
		{from: 22, to: 38, word: "SPELLING" },
		{from: 22, to: 41, logp: 0},
		{from: 23, to: 29, word: "PLEASE" },
		{from: 23, to: 27, word: "THANK" },
		{from: 23, to: 29, word: "THANKS" },
		{from: 23, to: 41, logp: 0},
		{from: 24, to: 14, word: "ROLL" },
		{from: 24, to: 15, word: "REPEAT" },
		{from: 24, to: 16, word: "COPY" },
		{from: 24, to: 16, word: "PROCEED" },
		{from: 24, to: 16, word: "WILCO" },
		{from: 24, to: 17, word: "INVESTIGATE" },
		{from: 24, to: 18, word: "CHANGE" },
		{from: 24, to: 9, word: "PLEASE" },
		{from: 24, to: 9, word: "KINDLY" },
		{from: 24, to: 6, word: "COULD" },
		{from: 25, to: 24, word: "SOM" },
		{from: 26, to: 29, word: "THANKS" },
		{from: 26, to: 27, word: "THANK" },
		{from: 26, to: 29, word: "PLEASE" },
		{from: 26, to: 41, logp: 0},
		{from: 27, to: 29, word: "YOU" },
		{from: 28, to: 39, word: "YOU" },
		{from: 29, to: 41, logp: 0},
		{from: 30, to: 29, word: "THANKS" },
		{from: 30, to: 27, word: "THANK" },
		{from: 30, to: 29, word: "PLEASE" },
		{from: 30, to: 30, word: "CAPITAL" },
		{from: 30, to: 30, word: "ALPHA" },
		{from: 30, to: 30, word: "JULIET" },
		{from: 30, to: 30, word: "SIERRA" },
		{from: 30, to: 30, word: "BRAVO" },
		{from: 30, to: 30, word: "KILO" },
		{from: 30, to: 30, word: "TANGO" },
		{from: 30, to: 30, word: "CHARLIE" },
		{from: 30, to: 30, word: "LIMA" },
		{from: 30, to: 30, word: "UNIFORM" },
		{from: 30, to: 30, word: "DELTA" },
		{from: 30, to: 30, word: "MIKE" },
		{from: 30, to: 30, word: "VICTOR" },
		{from: 30, to: 30, word: "ECHO" },
		{from: 30, to: 30, word: "NOVEMBER" },
		{from: 30, to: 30, word: "WHISKEY" },
		{from: 30, to: 30, word: "FOXTROT" },
		{from: 30, to: 30, word: "OSCAR" },
		{from: 30, to: 31, word: "X" },
		{from: 30, to: 30, word: "GOLF" },
		{from: 30, to: 30, word: "PAPA" },
		{from: 30, to: 30, word: "YANKEE" },
		{from: 30, to: 30, word: "HOTEL" },
		{from: 30, to: 30, word: "QUEBEC" },
		{from: 30, to: 30, word: "ZULU" },
		{from: 30, to: 30, word: "INDIA" },
		{from: 30, to: 30, word: "ROMEO" },
		{from: 30, to: 30, word: "ONE" },
		{from: 30, to: 30, word: "FIVE" },
		{from: 30, to: 30, word: "NINE" },
		{from: 30, to: 30, word: "TWO" },
		{from: 30, to: 30, word: "SIX" },
		{from: 30, to: 30, word: "ZERO" },
		{from: 30, to: 30, word: "THREE" },
		{from: 30, to: 30, word: "SEVEN" },
		{from: 30, to: 30, word: "DECIMAL" },
		{from: 30, to: 30, word: "FOUR" },
		{from: 30, to: 30, word: "ATE" },
		{from: 30, to: 30, word: "THOUSAND" },
		{from: 30, to: 41, logp: 0},
		{from: 31, to: 30, word: "RAY" },
		{from: 32, to: 39, word: "THANKS" },
		{from: 32, to: 28, word: "THANK" },
		{from: 32, to: 39, word: "PLEASE" },
		{from: 32, to: 32, word: "CAPITAL" },
		{from: 32, to: 32, word: "ALPHA" },
		{from: 32, to: 32, word: "JULIET" },
		{from: 32, to: 32, word: "SIERRA" },
		{from: 32, to: 32, word: "BRAVO" },
		{from: 32, to: 32, word: "KILO" },
		{from: 32, to: 32, word: "TANGO" },
		{from: 32, to: 32, word: "CHARLIE" },
		{from: 32, to: 32, word: "LIMA" },
		{from: 32, to: 32, word: "UNIFORM" },
		{from: 32, to: 32, word: "DELTA" },
		{from: 32, to: 32, word: "MIKE" },
		{from: 32, to: 32, word: "VICTOR" },
		{from: 32, to: 32, word: "ECHO" },
		{from: 32, to: 32, word: "NOVEMBER" },
		{from: 32, to: 32, word: "WHISKEY" },
		{from: 32, to: 32, word: "FOXTROT" },
		{from: 32, to: 32, word: "OSCAR" },
		{from: 32, to: 33, word: "X" },
		{from: 32, to: 32, word: "GOLF" },
		{from: 32, to: 32, word: "PAPA" },
		{from: 32, to: 32, word: "YANKEE" },
		{from: 32, to: 32, word: "HOTEL" },
		{from: 32, to: 32, word: "QUEBEC" },
		{from: 32, to: 32, word: "ZULU" },
		{from: 32, to: 32, word: "INDIA" },
		{from: 32, to: 32, word: "ROMEO" },
		{from: 32, to: 32, word: "ONE" },
		{from: 32, to: 32, word: "FIVE" },
		{from: 32, to: 32, word: "NINE" },
		{from: 32, to: 32, word: "TWO" },
		{from: 32, to: 32, word: "SIX" },
		{from: 32, to: 32, word: "ZERO" },
		{from: 32, to: 32, word: "THREE" },
		{from: 32, to: 32, word: "SEVEN" },
		{from: 32, to: 32, word: "DECIMAL" },
		{from: 32, to: 32, word: "FOUR" },
		{from: 32, to: 32, word: "ATE" },
		{from: 32, to: 32, word: "THOUSAND" },
		{from: 32, to: 41, logp: 0},
		{from: 33, to: 32, word: "RAY" },
		{from: 34, to: 37, word: "CALL" },
		{from: 35, to: 22, word: "PARAMETER" },
		{from: 36, to: 37, word: "LIMITS" },
		{from: 37, to: 39, word: "THANKS" },
		{from: 37, to: 28, word: "THANK" },
		{from: 37, to: 39, word: "PLEASE" },
		{from: 37, to: 41, logp: 0},
		{from: 38, to: 39, word: "THANKS" },
		{from: 38, to: 28, word: "THANK" },
		{from: 38, to: 39, word: "PLEASE" },
		{from: 38, to: 41, logp: 0},
		{from: 39, to: 41, logp: 0},
		{from: 40, to: 39, word: "PLEASE" },
		{from: 40, to: 28, word: "THANK" },
		{from: 40, to: 39, word: "THANKS" },
		{from: 40, to: 41, logp: 0}
	]
};
