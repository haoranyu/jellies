if (process.env.NODE_ENV === 'production') {
  require('./element.css');
  require('./jellies-icons/index.css');
} else {
  require('./element.scss');
  require('./jellies-icons/index.scss');
}
