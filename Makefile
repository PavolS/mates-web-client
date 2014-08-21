grammarsRepository=../mates-grammars
grammarVersion=mike-voice-loop
grammarExport=$(grammarsRepository)/data/$(grammarVersion)/export

all: import css

import: $(grammarExport)
	rm -rf import && cp -rf $(grammarExport) import

sass/gumby.scss: sass
	compass compile

clean:
	rm -rf .sass-cache && find . -name '*~' | xargs rm -rf && echo "You may want to clean the import dir as well: 'rm -rf import'"
