const gulp = require('gulp')
const { watch, series } = require('gulp')
const imagemin = require('gulp-imagemin')

async function image() {
    gulp.src('src/images/*')
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [
                    {
                        removeViewBox: true,
                    },
                ],
            })
        )
        .pipe(gulp.dest('dist/images'))
}

function watches() {
    watch('src/images/*', series(image))
}

exports.default = series(image, watches)
