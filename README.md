MATES web client
=====================

Based on Gumby Framework which is published under MIT license (see below) and has following dependencies:

- [Sass](https://github.com/nex3/sass) - Nathan Weizenbaum
- [Compass](https://github.com/chriseppstein/compass) - Chris Eppstein
- [Modular Scale](https://github.com/Team-Sass/modular-scale) - Scott Kellum  *Note: Please use modular scale 1.0.6, 2.x has not been integrated yet*
- [FitText](http://fittextjs.com/) - Paravel
- [jQuery](http://jquery.com/)
- [Modernizr](http://modernizr.com/)
- ./import - Which is a direcotry that needs to contain definitions for the voiceloop grammar (an FST as a json object), the used words and a list of core utterences in /import/core/voiceloop.examples.count.txt. It is by default filled with a snapshot of the export directory created by running make un the voiceloop grammar definition in the mates-grammars module. Easiest way to obtain the files is to copy the export folder from the desired grammar (see mates-grammars). However, the repo contains a fully functional scenario (with core, fst and wordlist).

Further, the following js libs are heavily used:
- [pocketsphinx.js](http://syl22-00.github.io/pocketsphinx.js/) *for stt*
- [mespeak.js](http://www.masswerk.at/mespeak/) *for tts*
- [d3.js](http://www.http://d3js.org/) *for data-driven visualization*

The web client itself is a plain html/js/*css* bundle, where only the *css* part is dynamically compiled from the *sass* sources. The most important files are probably these two:
- **js/config.js** *Configuration, currently contains the websocket address (for the backend) and parameters for the voices.*
- **js/main_trainee.js** *The main js script (defines onload(), establishes connections, simply the main entry point.*

To modify the look and feel have a look at **sass/**_**custom.scss** as a starting point. Note that so far for the color-agent assignments we use also direct gumby presets (like info or warn color/class), so you need to know what you are doing and possibly update the **.js** files as well.

*The main source for this text is README.md, please modify it and run make to update the documentation (possibly cut&paste to internal wiki pages from README.wiki).*

*This project itself, though open for anyone who looks for inspiration is not "published" yet as the licensing is not clear yet (in other words look but don't touch or copy yet, please).*

**MIT Open Source License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
