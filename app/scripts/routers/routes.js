define([
    'backbone'
], function(
    Backbone
){
  var RoutesRouter = Backbone.Router.extend({
    routes: {
        '': 'colorboard',
        ':id': 'colorboard',
    },
    
    /**
    * Routes page and updates app state
    */
    colorboard: function(id) {
        console.log('fetch with id '+id);
    }
  });

  return RoutesRouter;
});
