var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');


gulp.task('build', function(done) {
  runSequence(
    'lint:ts',
    'clean:ts',
    'build:ts', 
    'build:static',
    done);    
})

gulp.task('build:ts', compileTypescript({
  src: './src/**/*.ts',
  dest: './dist'
}));

gulp.task('build:static', copyStaticFiles({
  src: './src/**/*.json',
  dest: './dist'
}));

gulp.task('lint:ts', lintTypescript({
  src: './src/**/*.ts',
}))

gulp.task('clean:ts', cleanFiles({
  src: './dist/**/*.*'
}));

function copyStaticFiles(opts) {
  return function() {
    return gulp.src(opts.src)
      .pipe(gulp.dest(opts.dest));
  }
}

var tsProject = ts.createProject('tsconfig.json');

function compileTypescript(opts) {
   return function () {
      return gulp.src(opts.src)
         .pipe(tsProject())
         .pipe(gulp.dest(opts.dest));
   };
}

function lintTypescript(opts) {
   return function () {
      return gulp.src(opts.src)
         .pipe(tslint({
            configuration: 'tslint.json',
            formatter: 'verbose',
         }))
         .pipe(tslint.report({
            emitError: false,
         }));
   };
}

function cleanFiles(opts) {
  return function () {
    return gulp.src(opts.src)
      .pipe(clean());
  };
}