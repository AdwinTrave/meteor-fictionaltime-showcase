Template.view.onCreated(function(){
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function(){
    if(FlowRouter.getRouteName() === "home"){
      //subscription
      SUBSCRIPTIONS.subscribe("allTimes", 10);
    }
    if(FlowRouter.getRouteName() === "userTimes"){
      //subscription
      SUBSCRIPTIONS.subscribe("userTimes", FlowRouter.getParam("userId"));
    }
  });
});

Template.view.helpers({
  fictionalTimes: function(){
    if(FlowRouter.getRouteName() === "userTimes"){
      return FictionalTimeCollection.find({user: FlowRouter.getParam("userId")});
    }
    else {
      //home page
      return FictionalTimeCollection.find();
    }
  },
  shortenTo: function(text, limit){
    if(text.length > limit){
      var result = text.substring(0, limit);
      //add "..."
      return result + '...';
    } else {
      return text;
    }
  }
});

Template.view.events({
  "click [data-action='timeDetails']": function(event, template){
    event.preventDefault();
    FlowRouter.go('/time/' + this._id);
  },
  "click [data-action='moreTimes']": function(event, template){

  }
});
