import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

const tsProject = ts.createProject('tsconfig.json');

function compileTypescript() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
}

function watchFiles() {
    gulp.watch('src/**/*.ts', compileTypescript);
}

const build = gulp.series(compileTypescript);
const watch = gulp.series(build, watchFiles);

export {
    build,
    watch,
    compileTypescript,
    watchFiles
};

gulp.task('default', build);