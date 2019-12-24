const gulp = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')


gulp.task('default', () => {
  return gulp.src('src/index.styl')
    .pipe(stylus())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('lib'))
})
