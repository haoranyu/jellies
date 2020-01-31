"use strict";

const { series, src, dest } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function compile() {
  return src("./src/theme/*.scss")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest("./src/components/theme"));
}

function icons() {
  return src("./src/plugins/jellies-icons/fonts/**").pipe(
    dest("./src/components/theme/fonts")
  );
}

exports.build = series(compile, icons);
