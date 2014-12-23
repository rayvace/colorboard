/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
        exports: '_'
    },
    backbone: {
        deps: [
            'underscore',
            'jquery'
        ],
        exports: 'Backbone'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap'
  }
});

require([
  'backbone',
  'views/board',
  'routers/routes',
  'collections/tiles'
], function (
  Backbone,
  Colorboard,
  ColorboardRouter,
  Tiles
) {
  var router = new ColorboardRouter();
  var colorboard = new Colorboard({
      el: $('.container'),
      router: router
  });
  colorboard.render();

  Backbone.history.start();
});
