const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('./src/tsconfig.json')

async function main () {
  gulp.src('./src/ImagePreviewer.tsx')
    .pipe(tsProject())
    .js.pipe(gulp.dest('./src'))
}

exports.default = gulp.series(main)
