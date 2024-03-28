const {src, dest, watch, series} = require ('gulp');
// css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano')

// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done) {
    src('./src/scss/app.scss')
        .pipe (sourcemaps.init())
        .pipe (sass())
        .pipe (postcss([autoprefixer(), cssnano()]))
        .pipe (sourcemaps.write('.'))
        .pipe (dest('./build/css'))

    done()        
}

function image(done) {
    src('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe( dest('./build/img'))

    done()        
}

function versionWebp (done) {
    src('./src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('./build/img'))

    done()        
}

function versionavif (done) {
    const option = {quality:50}

    src('./src/img/**/*.{png,jpg}')
        .pipe(avif(option))
        .pipe(dest('./build/img'))

    done()        
}

function dev(done) {
    watch('./src/img/**/*', image)
    watch('./src/scss/**/*.scss', css)

    done()
}


exports.css = css;
exports.dev = dev;
exports.image = image;
exports.versionWebp = versionWebp;
exports.versionavif = versionavif;
exports.default = series(image, versionWebp, versionavif, css, dev);