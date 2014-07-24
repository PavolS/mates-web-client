  // mq(ws)
  var wsUri = 'ws://' + wsHost +':' + wsPort + '/voice';
  var connected = false;

  // stt: These will be initialized later
  var recognizer, recorder, callbackManager, audioContext, outputContainer, grammar_id;
  // stt: Only when both recorder and recognizer do we have a ready application
  var recorderReady = recognizerReady = false;
  // stt: finally find the best fitting "core" speech act
  var core_speechacts = [];
 
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

    // read the core speechacts
    read_core_grammar();

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

	console.log("on final...");

	var _from = "SOM";
	if (operator) {
		_from = operator.toUpperCase();
	}

	// TODO: this is one of the things which needs to be shared across MATES
	var _to_opts = '(SOM|SOE|SPACON)';

	// TODO: These ought to be parsed from the grammars somehow
	var re_speechact = new RegExp(".*" + _to_opts + " .*" + _from + " (.+)");
	var re_speechact_loop = new RegExp(".*" + _from + ".* ON (LOOP) ONE (.+) EVERYONE.*");
	console.log('About to test regex fit for msg: ' + JSON.stringify(rec));

	// TODO: Primitive workaround as NLP simulation
	if ( re_speechact.test(rec) || re_speechact_loop.test(rec) ) { 
		console.log('Original msg\n' + rec + '\nroughly fits expected recognition...');

		var best_fit = get_best_core_fit(rec);

		console.log('Best fit:\n' + best_fit);

		var _act = []; // an array to be filled by either re, if it still matches

		if ( ( re_speechact.test(best_fit) && (_act = re_speechact.exec(best_fit)) )  || 
		     ( re_speechact_loop.test(best_fit) && (_act = re_speechact_loop.exec(best_fit)) )
		   )
		{

			console.log('ok rec: ' + JSON.stringify(_act) );

			var _to = _act[1].toLowerCase();
			var _msg = _act[2].toLowerCase();

			document.getElementById("to").value = _to;
			document.getElementById("msg").value = _msg;
	
			send_interval = setInterval(function(){sendBtn_countDown()},1000);
			return true;
		};
	};

	console.log('bad rec: "' + rec + ', adding dummy for testing"');
	// too dangerous onFinalRecognition("SOM ON LOOP ONE HELLO-TEST EVERYONE");
	display_speechact(
		{ intent: '', speaker: _from.toLowerCase(), content: 'hello-forced' }
	);
	return false;
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
		document.getElementById("stopBtn-div").style.display = 'none';

		document.getElementById("startStopBtn-div").style.display = 'inline-block';
		document.getElementById("interruptBtn-div").style.display = 'none';
                document.getElementById("sendBtn").innerHTML = send_inner;
	}

   // scenario control
	function onScenario(action) {
		console.log('Send ' + action + ' to supervisor.');
		var msg = new SpeechAct('tell', 'som', 'supervisor', action);
		doSend( JSON.stringify(msg) );
	}

	function read_core_grammar() {
		var lines;
		jQuery.get('shared/core/voiceloop.examples.count.txt', function(data) {
			console.log("CORE SPEECHACTs:\n" + data);
			lines = jQuery.map( data.toUpperCase().replace(/\r\n\s*$|\r\s*$|\n\s*$/g, '').split(/\r\n|\r|\n/g), function( n, i ) {
			  return [ n.replace(/\d/g,'').replace(/\s\s*/g, ' ').replace(/^ | $/g, '').split(/ /g) ];
			});
			console.log(JSON.stringify(lines));
			core_speechacts = lines;

			get_best_core_fit("This is a silly test for the investigate parameter es pi ell ee nn gg");
		});
	}

	function get_best_core_fit(msg) {
		var top_score = 0, core_fit = null, buf = [];

		if ( core_speechacts.length <= 0 ) return msg;

		jQuery.map( core_speechacts, function( act, i ) {
			  var score_obj = _get_score(act, msg.toUpperCase() );
			  var new_score = score_obj.score;
			  console.log(JSON.stringify(act) + ' scored ' + new_score + ' buf: ' +  score_obj.buf.join(' ') );
			  if ( new_score > top_score ) {
				console.log( 'New best!');
				core_fit = act;
				top_score = new_score;
				buf = score_obj.buf;
			  }
		});
			
		var i = core_fit.indexOf('SPELLING');
		if ( i > -1 && buf.length > 0 ) {
			core_fit[i] = buf.join(' ');
		}

		console.log('Final fit: ' + core_fit.join(' ') );


		return core_fit.join(' ');
	}

	function _get_score(act, msg) {
		var hits = 0, buf = msg.split(' '), ind = 0;

		jQuery.map( act, function( word, i ) {
			var j = buf.indexOf(word);
			if ( j > -1 ) {
				hits++;
				buf.splice(0,j+1);
			}
		});

		return { 'score': hits/act.length - buf.length/1e5, 'buf': buf };
	}



