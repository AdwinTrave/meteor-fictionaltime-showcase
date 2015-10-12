var initTime;

Template.time.onCreated(function(){
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function(){
    SUBSCRIPTIONS.subscribe("getTime", FlowRouter.getParam("timeId"), function(){
      //initialize the FictionalTime
      var time = FictionalTimeCollection.findOne({_id: FlowRouter.getParam("timeId")});
      //console.log(time);
      initTime = new FictionalTime(time);
      //console.log(initTime);
    });
  });
});

Template.timeDesc.helpers({
  time: function(){
    return FictionalTimeCollection.findOne({_id: FlowRouter.getParam("timeId")});
  }
});

Template.time.helpers({
  time: function(){
    return FictionalTimeCollection.findOne({_id: FlowRouter.getParam("timeId")});
  },
  jsoncode: function(){

  }
});

/*
1) initialize the time - OK
2) show details about the time
3) sample clock counting how much time has passed since the person entered the page
4) if linked to ET show current time/countdown
5) JSON code of the time for others to copy
6) Dynamic form where visitors can choose from which Earth time unit they want to transfer to in the FictionalTime and vise versa
*/
