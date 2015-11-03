var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var $ = require('jquery');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

// var _posts = [{_id: 1, title: "hey", body: "bodybodybody", pretty_url: "heyheyheyhey"}];
var _posts = [];

var AppStore = assign(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getPosts: function() {
    return $.get('/posts', function(data) { 
      data.forEach(function(item){_posts.push(item)});
    });
  },

  getPost: function(url) {
    return $.get('/posts/'+url);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction


    AppStore.emitChange();

    return true;
  })

});


module.exports = AppStore;