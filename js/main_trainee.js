  // mq(ws)
  var wsUri = "ws://172.16.128.113:8081/voice";
  var connected = false;

  // stt: These will be initialized later
  var recognizer, recorder, callbackManager, audioContext, outputContainer, grammar_id;
  // stt: Only when both recorder and recognizer do we have a ready application
  var recorderReady = recognizerReady = false;
 
  // mq,tts
  var output, operator;

  // send timer
  var send_interval, send_to = send_to_nominal = 3;

  // original send inner html
  var send_inner = document.getElementById("sendBtn").innerHTML;


  function init()
  {
    // document.getElementById("server").innerHTML=wsUri;

    update_ws_buttons();

    output = document.getElementById("output");

    // start the workers for stt
    init_stt();
	
    // load tts stuff
    meSpeak.loadConfig("public/mespeak_config.json");
    meSpeak.loadVoice("public/voices/en/en.json");

    // connect the loop
    openWebSocket();

  }

function updateStatus() {
	return true;
};

  function openWebSocket(andSend)
  {
    writeStatus("connecting...");
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt, andSend) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt, andSend)
  {
    writeStatus("connected");

    connected = true;
	restart(); // d3
    	update_ws_buttons();

    if (andSend) {
	onSend();
    }
  }

  function onClose(evt)
  {
    writeStatus("DISCONNECTED");
    operator = null;
    connected = false;
	restart(); // d3
        update_ws_buttons();
  }

  function onMessage(evt)
  {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    var act = JSON.parse(evt.data);
    if (act ) {
	if ( act.speaker && act.content ) { 
		playSpeechAct(act); 
		display_speechact(act);
	}
    } else {
	playError("Ooops!");
    }
  }

  function onError(evt)
  {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message)
  {
    sendBtn_clear();
    websocket.send(message);
    writeToScreen("SENT: " + message); 


  }

  function onSend()
  {
	if (!connected) {
		console.log("onSend: connect first...");
		openWebSocket(true); // open register and send
		return;
	}

	if (!operator) {
		console.log("onSend: restester first...");
		onRegister(true); // register and send
		return;
	}

	var _text = document.getElementById("msg").value;
	var _to = document.getElementById("to").value;
	var _intent = document.getElementById("intent").value;
	var _from = document.getElementById("id").value;
	var msg = new SpeechAct(_intent, _from, _to, _text);

        // playSpeechAct(msg);
	display_speechact(msg);

	doSend( JSON.stringify(msg) );
  }

  // ws -- stt interface
  function onFinalRecognition(rec)
  {
	var _from = "SOM";
	if (operator) {
		_from = operator.toUpperCase();
	}
	
	var re_speechact = new RegExp("([A-Z]*) " + _from + " (.+)");
	var re_speechact_loop = new RegExp(_from + " ON (LOOP) ONE (.+) EVERYONE");

	var _act; // an array to be filled by either re, if it matches

	if ( ( re_speechact.test(rec) && (_act = re_speechact.exec(rec)) )  || 
	     ( re_speechact_loop.test(rec) && (_act = re_speechact_loop.exec(rec)) )
           )
	{

		console.log('ok rec: ' + JSON.stringify(_act) );

		var _to = _act[1].toLowerCase();
		var _msg = _act[2].toLowerCase();

		document.getElementById("to").value = _to;
		document.getElementById("msg").value = _msg;
	
		send_interval = setInterval(function(){sendBtn_countDown()},1000);

	} else {
		console.log('bad rec: "' + rec + '"');
	}
  }

  function onMicOk()
  {
	console.log("On mic ok...");
	if (! operator) onRegister();
  }

  // mq do- & on-register
  function onRegister(andSend)
  {
	// these two ... 
	operator = document.getElementById("id").value;
        update_ws_buttons();
	// ... should be done uppon succes response to these actions
	var msg = new Registration(operator);
	doSend( JSON.stringify(msg) );

	display_speechact(
		{ intent: '', speaker: operator, recipient: 'everyone', content: '' }
	);

	console.log("onRegister: " + andSend);

	if (andSend) {
		onSend();
	}
  }


  function writeToScreen(message)
  {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
  }

  function writeStatus(message)
  {
    // document.getElementById("status").innerHTML = message;
    updateStatus("ws status: " + message);
  }

  function playSpeechAct(act)
  {
	
	console.log("play act: " + JSON.stringify(act) );
	meSpeak.speak( ( act.content.length < 80) ? act.content : act.content.substr(0,20) + ' and so on', mespeakSpeakers[act.speaker]);
  }

  function playError(msg)
  {
	console.log("play error: " + msg);
	meSpeak.speak( msg, { variant: 'whisper'} );
  }

  window.addEventListener("load", init, false);

  // constructors
	function SpeechAct(intent, speaker, recipient, content) {

		var self = this;
	
		self.intent = intent;
		self.speaker = speaker;
		self.recipient = recipient;
		self.content = content;
	
	}

	function Registration(role) {

		var self = this;
	
		self.operator = role;
	}

   // voice setup
	var mespeakSpeakers = {
		som: { variant: 'h5'},
		spacon: { variant: 'h1'},
		soe: { variant: 'f1'}
	}

   // ui updates
	function update_ws_buttons() {
		var registered = false;
		if ( operator ) registered = true;
		console.log("bools reg: " + registered  + " cn: " + connected );
		sendBtn_clear();
		// do not disable send btn: document.getElementById('sendBtn').disabled = ( ! connected || ! registered );
	}

	function sendBtn_countDown() {
	    console.log("send_to: " + send_to);
            document.getElementById("sendBtn").innerHTML =  send_inner + send_to;
	    if (send_to == 0) {
		return onSend();
	    } else if (send_to == send_to_nominal) {
		console.log("send_to is nominal: " + send_to);

		document.getElementById("startBtn-div").style.display = 'none';
		document.getElementById("stopBtn-div").style.display = 'none';

		document.getElementById("startStopBtn-div").style.display = 'none';
		document.getElementById("interruptBtn-div").style.display = 'inline-block';


		send_to-=1;
	    } else {
		send_to-=1;
	    }
	}

	function onInterrupt() {
		console.log("interrupt auto send!");
		sendBtn_clear();
	}

	function sendBtn_clear() {
		send_to = send_to_nominal;
		clearInterval(send_interval);

		document.getElementById("startBtn-div").style.display = 'inline-block';
		document.getElementById("stopBtn-div").style.display = 'inline-block';

		document.getElementById("startStopBtn-div").style.display = 'inline-block';
		document.getElementById("interruptBtn-div").style.display = 'none';
                document.getElementById("sendBtn").innerHTML = send_inner;
	}





