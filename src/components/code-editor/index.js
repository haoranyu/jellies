import CodeEditor from './CodeEditor';

CodeEditor.install = function(Vue) {
  Vue.component(CodeEditor.name, CodeEditor);
};

export default CodeEditor;
