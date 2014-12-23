define([
  'backbone'
], function(Backbone){
  var TileModel = Backbone.Model.extend({
    host: '127.0.0.1:5000', //localhost
    url: '/save',
    defaults: {
      position: '',
      color: ''
    }
  });

  return TileModel;
});
