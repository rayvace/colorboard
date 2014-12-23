define([
  'jquery',
  'underscore',
  'backbone',
  'models/tile',
  'collections/tiles'
], function($, _, Backbone, Tile, Tiles){
  var BoardView = Backbone.View.extend({
    elGrid: $('#grid'),
    elSaved: $("#saved"),
    events: {
      'click .tile': 'tileClicked',
      'click #clear': 'clearGrid',
      'click #save': 'saveColorBoard'
    },
    defaultRows: 15,
    defaultColumns: 10,
    
    initialize: function(options){
      var self = this;
      var key = window.location.hash.substr(1);

      self.collection = new Tiles([], {
        router: options.router
      });

      self.collection.fetch({ 
        data: $.param({ key: key})
      });

      self.listenTo(Backbone, 'BoardView:SaveSuccess', function(){
        self.showSuccessMsg();
      });

      self.listenTo(self.collection, 'change reset add remove', function(){
        self.updateBoard();
      });
    },

    /**
    * Renders grid
    */
    render: function () {
      this.buildGrid();
      return this;
    },

    /**
    * Clears grid by resetting colors
    */
    clearGrid: function(){
      $(this.elGrid).html('');
      this.buildGrid();
      this.collection.reset([], {silent: true});
    },
    
    /**
    * Builds 15 x 10 Grid
    */
    buildGrid: function(){
      var self = this;
      var grid = $(this.elGrid);
      var tile = '';

      for(var r = 0; r<self.defaultRows; r++){
        grid.append('<div class="row">');
        for(var c = 0; c<self.defaultColumns; c++){
          tile = '<div data-id="%s" class="col-md-1 tile"></div>'.replace('%s', r+'-'+c);
          grid.append(tile);
        }
        grid.append('</div>');
      }
    },

    /**
    * Handles click event and updates collection
    */
    tileClicked: function(e){
      var target = $(e.target);
      var pos = $(e.target).attr('data-id');
      var hex = this.changeColor();
      var tile = new Tile();
      
      if (this.isWhite(target)){
        tile.set({id: pos, position: pos, color: hex});
        this.collection.add(tile, {silent: true});
        $(e.target).css('background-color', hex);
      } else{
        $(e.target).css('background-color', '#fff');
      }
    },

    /**
    * Verify if color is white
    *
    * TODO: check for cross browser 
    * issues with detecting the color white.
    */
    isWhite: function(target){
      return (
        target.css('background-color')=='rgba(0, 0, 0, 0)' || target.css('background-color')=='rgb(255, 255, 255)'
      )
    },

    /**
    * Changes tile color
    */
    changeColor: function(){
      //
      // reference: http://www.paulirish.com/2009/random-hex-color-code-snippets/
      //
      var hex = '#'+Math.floor(Math.random()*16777215).toString(16);
      return hex;
    },

    /**
    * Save Board (no-op)
    */
    saveColorBoard: function(){
      var key = window.location.hash.substr(1);
      this.collection.saveBoard(key);
    },

    /**
    * Render success message
    */
    showSuccessMsg: function(){
      this.elSaved.show().delay(1500).fadeOut();
    },

    /**
    * Updates Board
    */
    updateBoard: function(){
      var self = this;
      
      _.each(self.collection.models, function(model){
        var pos = model.get('position');
        var tile = self.elGrid.find("div[data-id='"+pos+"']");
        tile.css('background-color', model.get('color'));
      });
    }
  });

  return BoardView;
});
