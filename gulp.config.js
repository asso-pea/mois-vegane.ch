/* eslint-env node */
const argv = require('yargs').argv;

module.exports = {
  optimize: argv.production,
  src: {
    sass: 'assets/sass/**/*.scss',
    images: 'assets/images/**/*.{gif,jpg,jpeg,png,svg}',
    javascripts: 'assets/javascripts/**/*.js',
    templates: '**/*.html',
  },
  dest: {
    css: 'assets/static/stylesheets',
    images: 'assets/static/images',
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
