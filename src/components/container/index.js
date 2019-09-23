import Container from './Container';


Container.install = function(Vue) {
  Vue.component(Container.name, Container);
};

export default Container;
