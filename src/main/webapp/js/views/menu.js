define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/menu.html'
], function($, _, Backbone, menuTemplate){

  var Menu = Backbone.View.extend({
    
    el: $('#header'),

    initialize: function() {
      console.log('Menu: initialize');
      _.bindAll(this,'render', 'showMenu', 'hideMenu', 'onVisble', 'onHidden');
      console.log('Menu: initialized');
      this._visible = false;
    },
     
    render: function() {
      console.log('Menu: render');
      $.tmpl(menuTemplate, {}).appendTo(this.el);
      $('.menu-button').button();
      $('#header-display-zone').mouseenter(this.showMenu);
      this.$el.mouseleave(this.hideMenu);
      console.log('Menu: rendered');
      return this;  
    },

    events: {
      "click #settings-button": "displaySettings",
      "click #about-button": "displayAbout"
    },

    showMenu: function() {
      if (!this._visible) {
        this.$el.slideDown('fast', this.onVisble);
      }
    },

    hideMenu: function() {
      if (this._visible) {
        this.$el.slideUp('fast', this.onHidden);
      }
    },

    onVisble: function() {
      this._visible = true;
    },

    onHidden: function() {
      this._visible = false;
    },

    displaySettings: function(event) {
      console.log('Menu: displaySettings');
      this.trigger('menu:settings');
    },

    displayAbout: function(event) {
      console.log('Menu: displayAbout');
      this.trigger('menu:about');
    }

  });

  return Menu;

});