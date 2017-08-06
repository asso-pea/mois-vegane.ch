/* eslint-env node */
const argv = require('yargs').argv;

module.exports = {
  optimize: argv.production,
  src: {
    sass: 'static/sass/**/*.scss',
    images: 'static/images/**/*.{gif,jpg,jpeg,png,svg}',
    javascripts: 'static/javascripts/**/*.js',
    templates: '**/*.html',
  },
  dest: {
    css: 'static/stylesheets',
    images: 'static/images',
  },
  browserSync: {
    proxy: 'mois-vegane.lo',
    open: false,
    notify: false,
    plugins: ['bs-pretty-message'],
  },
  sass: {
    outputStyle: 'compressed',
  },
  autoprefixer: {
    cascade: false,
  },
};
