SUBSCRIPTIONS = new SubsManager();

FlowRouter.route('/', {
  name: "home",
  action: function(){
    BlazeLayout.render("mainLayout", {top: "main", area: "view"})
  }
});

FlowRouter.route('/user/:userId', {
  name: "userTimes",
  action: function(params){
    BlazeLayout.render("mainLayout", {top: "user", area: "view"});
  }
})

FlowRouter.route('/time/:timeId', {
  name: "timeDetails",
  action: function(params){
    BlazeLayout.render("mainLayout", {top: "timeDesc", area: "time"});
  }
});
