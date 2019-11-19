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
                        'CodeMirror-foldgutter',
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
                        Backspace: (cm) => {
                          if (!cm.somethingSelected()) {
                            let cursorsPos = cm.listSelections().map((selection) => selection.anchor);
                            let indentUnit = cm.options.indentUnit;
                            let shouldDelChar = false;
                            cursorsPos.forEach((cursorPos) => {
                              let indentation = cm.getStateAfter(cursorPos.line).indented;
                              if (!(indentation !== 0 &&
                                 cursorPos.ch <= indentation &&
                                 cursorPos.ch % indentUnit === 0)) {
                                shouldDelChar = true;
                              }
                            });
                            if (!shouldDelChar) {
                              cm.execCommand('indentLess');
                            } else {
                              cm.execCommand('delCharBefore');
                            }
                          } else {
                            cm.execCommand('delCharBefore');
                          }
                        },
                        'Shift-Tab': (cm) => cm.execCommand('indentLess')
                      }
};
