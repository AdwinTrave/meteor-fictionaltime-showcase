Template.user.onCreated(function(){
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function(){
    SUBSCRIPTIONS.subscribe("userDetails", FlowRouter.getParam("userId"));
  });
});

Template.user.helpers({
  user: function(){
    return Meteor.users.findOne({_id: FlowRouter.getParam("userId")});
  }
});
