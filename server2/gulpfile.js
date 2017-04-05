var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
  runSequence(
    'clean:js',
    'build:js',
    done
  );
})

gulp.task('build:js', buildFiles({
  src: './src/**/*.js',
  dest: './dist'
}));

gulp.task('clean:js', cleanFiles({
  src: './dist/**/*.*'
}));

function buildFiles(opts) {
  return function() {
    return gulp.src(opts.src)
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest(opts.dest));
  };
};

function cleanFiles(opts) {
  return function() {
    return gulp.src(opts.src)
      .pipe(clean());
  };
};
