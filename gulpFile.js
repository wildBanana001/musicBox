var gulp = require('gulp'),
	connect = require('gulp-connect'),
	less = require('gulp-less');

//转移html到dist文件夹下
gulp.task('html',function() {
	//流
	gulp.src('./src/index.html')
	.pipe(connect.reload())
	.pipe(gulp.dest('./dist'));
})

//监听任务
gulp.task('watch',function() {
	gulp.watch('./src/index.html',['html']);
	gulp.watch('./src/less/*.less',['less']);
	gulp.watch('./src/js/*.js',['js']);
})

//服务器开启
gulp.task('server',function() {
	connect.server({
		root : './dist',
		livereload : true
	});
})

// 把less转化为css
gulp.task('less',function() {
	gulp.src('./src/less/*.less')
		.pipe(connect.reload())
		.pipe(less())
		.pipe(gulp.dest('./dist/css/'));
})

//把js转移到dist
gulp.task('js',function() {
	gulp.src('./src/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/js/'));
})

//默认任务
gulp.task('default',['html','watch','server','less','js']);