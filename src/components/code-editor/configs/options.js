export default {
  styleActiveLine   : true,
  lineNumbers       : true,
  matchBrackets     : true,
  foldGutter        : true,
  autoCloseBrackets : true,
  matchTags         : { bothTags: true },
  gutters           : [
                        'CodeMirror-breakpoints',
                        'CodeMirror-feedback-notes',
                        'CodeMirror-linenumbers',
                        'CodeMirror-foldgutter'
                      ],
  tabindex          : 0,
  theme             : 'eclipse',
  scrollbarStyle    : 'overlay',
  styleSelectedText : true,
  lineWrapping      : true,
  indentWithTabs    : false,
  vimMode           : false,
  keyMap            : 'sublime',
  indentUnit        : 4,
  tabSize           : 4,
  smartIndent       : true,
  autoCloseTags     : true,
  extraKeys         : {
                        Tab: (cm) => {
                          if (cm.getMode().name === 'null') {
                            cm.execCommand('insertTab');
                          } else {
                            if (cm.somethingSelected()) {
                              cm.execCommand('indentMore');
                            } else {
                              cm.execCommand('insertSoftTab');
                            }
                          }
                        },
                        'Shift-Tab': (cm) => cm.execCommand('indentLess')
                      }
};
