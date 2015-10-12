Template.nav.helpers({
  currentPage: function(page){
    if (page === FlowRouter.getRouteName()) {
      if( (page === "userTimes") && (Meteor.userId() === FlowRouter.getParam(userId)) ) {
        return 'uk-active';
      }

      if ((page === "userTimes") && (Meteor.userId() !== FlowRouter.getParam(userId))) {
        return null;
      }
      else {
        return 'uk-active';
      }

    }
  },
  currentUser: function(){
    return Meteor.userId();
  }
});
