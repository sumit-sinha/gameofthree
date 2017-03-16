System.config({
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    'app': '/app',
    '@angular/core': '/app/node_modules/@angular/core/bundles/core.umd.js',
    '@angular/router': '/app/node_modules/@angular/router/bundles/router.umd.js',
    '@angular/common': '/app/node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '/app/node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': '/app/node_modules/@angular/http/bundles/http.umd.js',
    '@angular/platform-browser': '/app/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '/app/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'rxjs': '/app/node_modules/rxjs',
  },
  packages: {
    app: {
      main: 'module.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});