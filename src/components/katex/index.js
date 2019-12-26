import Katex from 'vue-katex-auto-render';

Katex.install = function(Vue) {
  Vue.directive('katex', Katex);
};

export default Katex;
