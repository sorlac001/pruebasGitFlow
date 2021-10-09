const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const addsrc = require('gulp-add-src');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const runSequence = require('gulp4-run-sequence');

gulp.task('browserSync', () => {
	browserSync.init({
		server: true,
		port: 7788
	})
});

gulp.task('sass', () => {
	return gulp.src('src/styles/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
	.on('error', function (err) {
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('public/assets/styles'))
	.pipe(browserSync.reload({
		stream: true
	}).on('error', sass.logError));
});

gulp.task('js', () => {
	return gulp.src('src/scripts/vendor/*.js')
	.pipe(plumber(function (err) {
		console.log(err.toString());
		this.emit('end');
	}))
	.pipe(addsrc.append('src/scripts/main.js'))
    .pipe(concat('main.min.js'))
	.pipe(gulpIf('main.min.js', uglify({
		compress: { hoist_funs: false }
	 })))
    .pipe(gulp.dest('public/assets/scripts'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('images', () => {
	return gulp.src(['public/assets/images/**/*'])
	.pipe(changed('public/assets/images'))
	.pipe(gulp.dest('public/assets/images'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch', gulp.parallel('browserSync', (done) => {
	gulp.watch(['src/styles/**/*.scss'], gulp.series('sass'));
	gulp.watch(['public/assets/images/**/*'], gulp.series('images'));
	//gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch(['src/scripts/**/*.js'], gulp.series('js'));
	done();
}));

gulp.task('default', async (done) => {
	runSequence(['sass', 'js'], 'watch', () => {});
	done();
});