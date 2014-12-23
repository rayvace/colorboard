define([
  'jquery',
  'underscore',
  'backbone',
  'models/tile',
  'collections/tiles'
], function($, _, Backbone, Tile, Tiles){
  var BoardView = Backbone.View.extend({
    elGrid: $('#grid'),
    events: {
      'click .tile': 'tileClicked',
      'click #clear': 'clearGrid',
      'click #save': 'saveColorBoard'
    },
    defaultRows: 15,
    defaultColumns: 10,
    
    initialize: function(){
      this.collection = new Tiles();
      this.collection.fetch();
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
        this.collection.add(tile);
        $(e.target).css('background-color', hex);
      } else{
        $(e.target).css('background-color', '#fff');
      }
    },

    /**
    * Verify if color is white
    *
    * TODO: check for cross browser 
    * issues with detecting white.
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
      this.collection.saveBoard();
    }

  });

  return BoardView;
});
