var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  addItem: function(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  }
}

module.exports = AppActions;