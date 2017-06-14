var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

gulp.task('build', function(done) {
  runSequence(
    'lint:ts',
    'clean:ts',
    ['build:ts', 'build:static'],
    done);    
})

gulp.task('build:ts', compileTypescript({
  src: './src/**/*.ts',
  dest: './dist'
}));

gulp.task('build:ts:release', compileTypescript({
  src: ['./src/**/*.ts', '!./src/**/*.spec.ts'],
  dest: './dest'
}))

gulp.task('build:static', ['build:static:docs']);

gulp.task('build:static:docs', copyStaticFiles({
  src: './src/docs/**/*',
  dest: './dist/docs'
}));

gulp.task('lint:ts', lintTypescript({
  src: './src/**/*.ts',
}))

gulp.task('clean:ts', cleanFiles({
  src: './dist/**/*.*'
}));

gulp.task('test', runTests({
  src: './dist/**/*.spec.js'
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
         .pipe(babel({
           presets: ['es2015']
         }))
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

function runTests(opts) {
  return function() {
    return gulp.src(opts.src, {read: false})
      .pipe(mocha({reporter: 'list'}))
  }
}