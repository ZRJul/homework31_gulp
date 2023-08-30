const { src, dest} = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


function HTMLTask() {
    return src('src/index.html')
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file'
            })
        )
        .pipe(dest('dist/'));
}

function stylesTask() {
    return src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css/'));
}

function JSTask() {
    return src('src/js/main.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'));
}




exports.HTMLTask = HTMLTask;
exports.stylesTask = stylesTask;
exports.JSTask = JSTask;