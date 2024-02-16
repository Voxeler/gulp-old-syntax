const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

const { parallel, series } = require('gulp');

gulp.task(
  'default',
  series(
    'clean:dev',
    parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
    parallel('server:dev', 'watch:dev')
  )
);

gulp.task(
	'docs',
	series(
		'clean:docs',
		parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
		parallel('server:docs')
	)
);