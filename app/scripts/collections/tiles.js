define([
  'jquery',
	'backbone', 
  'models/tile',
  'routers/routes'
], function($, Backbone, TileModel, ColorboardRouter){
  var ColorsCollection = Backbone.Collection.extend({
    url: 'http://127.0.0.1:5000/board',
    protocol: 'http://',
    domain: '127.0.0.1:5000', //localhost
    path: '/board/save',
    model: TileModel,
    
    initialize: function(models, options){
      this.router = options.router;
    },

    /**
    * Update models w/ persisted data
    */
    parse: function(response){
      return response.board;
    },

    /**
    * Save board
    */
    saveBoard: function(key){
      var self = this;
      var payload = JSON.stringify({tiles: this.toJSON(), key: key});
      var url = this.protocol + this.domain + this.path;
      
      $.ajax({
        type: 'POST',
        url: url,
        dataType: "json",
        data: payload,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: false
        },
        success: function(data){
          var url = '#' + data.key;
          
          self.router.navigate(url);
          Backbone.trigger('BoardView:SaveSuccess');
        }
      });
    }

  });
  
  return ColorsCollection;
});
