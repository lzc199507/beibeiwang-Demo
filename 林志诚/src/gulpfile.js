//引入gulp
var gulp=require("gulp");
gulp.task("default",function(){
 console.log("default完成了");
});
var cssmin=require("gulp-cssmin");
var rename=require("gulp-rename");
gulp.task("cssmin",function(){
   return gulp.src("css/index.css")
              .pipe(cssmin())
              .pipe(rename("index.min.css"))
              .pipe(gulp.dest("../dist"));
});
var jsmin=require("gulp-uglify");
gulp.task("jsmin",function(){
  return gulp.src("js/drag.js")
             .pipe(jsmin())
             .pipe(rename("drag.min.js"))
             .pipe(gulp.dest("../dist"));
});
var imagesmin=require("gulp-imagemin");
gulp.task("imagesmin",function(){
  return gulp.src("img/*")
             .pipe(imagesmin())
             .pipe(gulp.dest("../dist/imagesmin"));
});
var concat=require("gulp-concat");
gulp.task("concat",function(){
  return gulp.src(['js/login.js','js/reg.js'])
             .pipe(concat('all.js'))
             .pipe(gulp.dest("../dist"));
});