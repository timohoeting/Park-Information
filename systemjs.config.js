System.config({
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true},
    map: {
      '@angular'              : 'node_modules/@angular',
      'rxjs'                  : 'node_modules/rxjs',
      'angular2-google-maps'  : 'node_modules/angular2-google-maps',
      'ng2-charts'            : 'node_modules/ng2-charts',
      'angularfire2'          : 'node_modules/angularfire2',
      'firebase'          : 'node_modules/firebase'
    },
    paths: {
      'node_modules/@angular/*': 'node_modules/@angular/*/bundles'
    },
    meta: {
      '@angular/*': {'format': 'cjs'}
    },
    packages: {
      'app'                              : {main: 'main', defaultExtension: 'ts'},
      'rxjs'                             : {main: 'Rx'},
      '@angular/core'                    : {main: 'core.umd.min.js'},
      '@angular/common'                  : {main: 'common.umd.min.js'},
      '@angular/compiler'                : {main: 'compiler.umd.min.js'},
      '@angular/platform-browser'        : {main: 'platform-browser.umd.min.js'},
      '@angular/platform-browser-dynamic': {main: 'platform-browser-dynamic.umd.min.js'},
      '@angular/http'                    : {main: 'http.umd.min.js'},
      '@angular/router'                  : {main: 'router.umd.min.js'},
      '@angular/forms'                   : {main: 'forms.umd.min.js'},
      'angular2-google-maps/core'        : {main: 'index.js'},
      'ng2-charts'                       : {main: 'ng2-charts.js'},
      'angularfire2'                     : {main: 'angularfire2.js'},
      'firebase'                         : {main: 'firebase.js'}
    }
});
