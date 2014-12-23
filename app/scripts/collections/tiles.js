define([
  'jquery',
	'backbone', 
  'models/tile'
], function($, Backbone, TileModel){
  var ColorsCollection = Backbone.Collection.extend({
    url: 'http://127.0.0.1:5000/board',
    protocol: 'http://',
    domain: '127.0.0.1:5000', //localhost
    path: '/board/save',
    model: TileModel,
    
    /**
    * Save board
    */
    saveBoard: function(){
      var self = this;
      var payload = JSON.stringify(this.toJSON());
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
          console.log(data);
        }
      });
    }

  });
  
  return ColorsCollection;
});
