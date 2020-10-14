'use strict';

const { parallel, src, dest } = require('gulp');
const sass = require('gulp-sass');
const packageImporter = require('node-sass-package-importer');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/theme/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./src/components/theme'));
}

function compileElement() {
  return src('./src/plugins/element.scss')
    .pipe(sass.sync({
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    }))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./src/plugins'));
}

function compileJelliesIcons() {
  return src('./src/plugins/jellies-icons/index.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./src/plugins/jellies-icons'));
}

function icons() {
  return src('./src/plugins/jellies-icons/fonts/**').pipe(
    dest('./src/components/theme/fonts')
  );
}

exports.build = parallel(
  compile,
  compileElement,
  compileJelliesIcons,
  icons
);
