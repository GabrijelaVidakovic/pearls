var sassImport 	= require('gulp-sass-import'),
    sass = require('gulp-sass');

    rename 		= require('gulp-rename');
var gulp = require('gulp');
// var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
// var useref = require('gulp-useref');
// var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
var del = require('del');


gulp.task('default', ['sass']);


gulp.task('sass', function() {
  return gulp.src('app/scss/**/styles.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('sass', function() {
//     gulp.src('./styles.scss')
//         .pipe(sassImport({
//             filename : '_file',
//             marker : '/*'
//         }))
//         .pipe(sass())
//         .pipe(rename('styles.css'))
//         .pipe(gulp.dest('app/css'));
// });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    port: 7410
  })
})

gulp.task('watch', ['sass', 'browserSync'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp.task('useref', function(){
//   return gulp.src('app/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))
//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

// gulp.task('images', function(){
//   return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
//   // Caching images that ran through imagemin
//   .pipe(cache(imagemin({
//       interlaced: true
//     })))
//   .pipe(gulp.dest('dist/images'))
// });

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})
