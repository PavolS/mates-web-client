      // A convenience function to post a message to the recognizer and associate
      // a callback to its response
      function postRecognizerJob(message, callback) {
        var msg = message || {};
        if (callbackManager) msg.callbackId = callbackManager.add(callback);
        if (recognizer) recognizer.postMessage(msg);
      };

      // This function initializes an instance of the recorder
      // it posts a message right away and calls onReady when it
      // is ready so that onmessage can be properly set
      function spawnWorker(workerURL, onReady) {
          recognizer = new Worker(workerURL);
          recognizer.onmessage = function(event) {
            onReady(recognizer);
          };
          recognizer.postMessage('');
      };

      // To display the hypothesis sent by the recognizer
      function updateHyp(hyp) {
        if (outputContainer) outputContainer.innerHTML = hyp;
      };

      // This updates the UI when the app might get ready
      // Only when both recorder and recognizer are ready do we enable the buttons
      function updateUI() {
        if (recorderReady && recognizerReady) {
		startStopBtn.disabled = false;
		startBtn.disabled = false;
		document.getElementById('startStopBtn-div').classList.toggle("success",true);
		document.getElementById('startBtn-div').classList.toggle("success",true);
		onMicOk(); // callback to the main js handler
	};
      };

      // This is just a logging window where we display the status
      function updateStatus(newStatus) {
        var current_st = document.getElementById('current-status');
	current_st.innerHTML += "<br/>" + newStatus;
    	current_st.scrollTop = current_st.scrollHeight;
      };

      // A not-so-great recording indicator
      function displayRecording(display) {
	var btn =  document.getElementById('startStopBtn-div');
        if (display) {
		btn.classList.toggle("danger", true);
	} else {
		btn.classList.toggle("danger", false);
	}
      };

      // Callback function once the user authorises access to the microphone
      // in it, we instanciate the recorder
      function startUserMedia(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        // Firefox hack https://support.mozilla.org/en-US/questions/984179
        window.firefox_audio_hack = input; 
        var audioRecorderConfig = {errorCallback: function(x) {updateStatus("Error from recorder: " + x);}};
        recorder = new AudioRecorder(input, audioRecorderConfig);
        // If a recognizer is ready, we pass it to the recorder
        if (recognizer) recorder.consumers = [recognizer];
        recorderReady = true;
        updateUI();
        updateStatus("Audio recorder ready");
      };

      // This starts recording. We first need to get the id of the grammar to use
      var startRecording = function() {

		document.getElementById("startBtn-div").style.display = 'none';
		document.getElementById("stopBtn-div").style.display = 'inline-block';

        if (recorder && recorder.start(grammar_id)) displayRecording(true);
      };

      // Stops recording
      var stopRecording = function() {

		document.getElementById("startBtn-div").style.display = 'inline-block';
		document.getElementById("stopBtn-div").style.display = 'none';

        recorder && recorder.stop();
        displayRecording(false);
      };

      // Called once the recognizer is ready
      // We then add the grammars to the input select tag and update the UI
      var recognizerReady = function(id) {
           recognizerReady = true;
	   grammar_id = id;
           updateUI();
           updateStatus("Recognizer ready");
      };

      // We get the grammars defined below and fill in the input select tag
      var updateGrammars = function() {
        var selectTag = document.getElementById('grammars');
        for (var i = 0 ; i < grammarIds.length ; i++) {
            var newElt = document.createElement('option');
            newElt.value=grammarIds[i].id;
            newElt.innerHTML = grammarIds[i].title;
            selectTag.appendChild(newElt);
        }                          
      };

      // This adds a grammar, once we are done, we can call
      // recognizerReady(id)
      var feedGrammar = function() {

	postRecognizerJob(
		{command: 'addGrammar', data: grammarvoiceloop}, // grammarvoiceloop comes from voiceloop*.js
                function(id) {
			recognizerReady(id);
		}
	);

      };

      // This adds words to the recognizer. When it calls back, we add grammars
      var feedWords = function(words) {
           postRecognizerJob({command: 'addWords', data: words},
                        function() {feedGrammar();});
      };

      // This initializes the recognizer. When it calls back, we add words
      var initRecognizer = function() {
          // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
          postRecognizerJob({command: 'initialize'},
                            function() {
                                        if (recorder) recorder.consumers = [recognizer];
                                        feedWords(wordList);}); 	   // wordList comes from voiceloop*.js
      };

      // spawn a new recognizer worker and call getUserMedia to
      // request access to the microphone
      function init_stt() {
      		outputContainer = document.getElementById("rec-output");
        	updateStatus("Initializing web audio and speech recognizer, waiting for approval to access the microphone");
        	callbackManager = new CallbackManager();
		
		// here we spawn the recognizer worker
		//
		spawnWorker("js/recognizer.js", function(worker) {
		    // This is the onmessage function, once the worker is fully loaded
		    worker.onmessage = function(e) {
		        // This is the case when we have a callback id to be called
		        if (e.data.hasOwnProperty('id')) {
		          var clb = callbackManager.get(e.data['id']);
		          var data = {};
		          if ( e.data.hasOwnProperty('data')) data = e.data.data;
		          if(clb) clb(data);
		        }
		        // This is a case when the recognizer has a new hypothesis
		        if (e.data.hasOwnProperty('hyp')) {
		          var newHyp = e.data.hyp;
		          if (e.data.hasOwnProperty('final') && e.data.final) {
				onFinalRecognition(newHyp);
				newHyp = "Final: " + newHyp;
			  }
		          updateHyp(newHyp);
		        }
		        // This is the case when we have an error
		        if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
		          updateStatus("Error in " + e.data.command + " with code " + e.data.code);
		        }
		    };
		    // Once the worker is fully loaded, we can call the initialize function
		    initRecognizer();
		});

		// The following is to initialize Web Audio
		//
		try {
		  window.AudioContext = window.AudioContext || window.webkitAudioContext;
		  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		  window.URL = window.URL || window.webkitURL;
		  audioContext = new AudioContext();
		} catch (e) {
		  updateStatus("Error initializing Web Audio browser");
		}

		if (navigator.getUserMedia) 
			navigator.getUserMedia(
				{audio: true}, 
				startUserMedia, 
				function(e) {
	                                updateStatus("No live audio input in this browser");
	                        }
			);
		else
			updateStatus("Sorrry, no web audio support in this browser :(");

	      // Wiring JavaScript to the UI
	      var startStopBtn = document.getElementById('startStopBtn');

	      startStopBtn.disabled = true;
	      startStopBtn.onmousedown = startRecording;
	      startStopBtn.onmouseup = stopRecording;

	      document.getElementById('startBtn').disabled = true;
	      document.getElementById('startBtn').onclick = startRecording;
	      document.getElementById('stopBtn').onclick = stopRecording;
      };

