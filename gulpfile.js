var gulp    = require('gulp'),
    sass    = require('gulp-sass')(require('sass')),
    connect = require('gulp-connect'),
    pug     = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

function reload(done) {
    connect.server({
        root: 'public',
        livereload: true,
        port: 8080
    });
    done();
}

function styles() {
    return (
        gulp.src('src/sass/sassy.sass')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('public/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('sassy.min.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload())
    );
}

function scripts() {
    return (
        gulp.src('src/js/magic.js')
        .pipe(plumber())
        .pipe(gulp.dest('public/js'))
        .pipe(uglify())
        .pipe(rename('magic.min.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload())
    );
}

function html() {
    return (
        gulp.src('src/views/html/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('public/'))
        .pipe(connect.reload())
    );
}

function views() {
    return (
        gulp.src('src/views/pages/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public/'))
        .pipe(connect.reload())
    )
}

function watchTask(done) {
    gulp.watch('src/**/**/*.html', html);
    gulp.watch('src/sass/**/**/*.sass', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/views/**/**/*.pug', views);
    done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(styles, scripts, html, views));

exports.reload = reload;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.views = views;
exports.watch = watch;
exports.build = build;
exports.default = watch;