Template.time.onCreated(function(){
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function(){
    //creaet sessions for the needed variables
    Session.set("timeElapsed", 0);
    Session.set("time", null);
    Session.set("initTime", null);

    Meteor.subscribe("getTime", FlowRouter.getParam("timeId"), function(){
      //initialize the FictionalTime
      var time = FictionalTimeCollection.findOne({_id: FlowRouter.getParam("timeId")});

      //put the time variables into session so it is easily accessible to the rest of the page
      Session.set("time", time);

      //get user information
      Meteor.subscribe("userDetails", time.user);
    });
  });
});

Template.timeDesc.helpers({
  time: function(){
    return Session.get("time");
  },
  user: function(){
    return Session.get("time").user;
  },
  username: function(){
    var author = Meteor.users.findOne({_id: Session.get("time").user});
    return author.username;
  },
  owner: function(){
    if(Session.get("time") !== null)
    {
      if(Session.get("time").user === Meteor.userId()){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
});

Template.timeDesc.events({
  "click [data-action='deleteTime']": function(event, template){
     if(Session.get("time").user === Meteor.userId()){
       //call server method
       Meteor.call("deleteTime", Session.get("time")._id, function(error, result){
         if(error){
           console.log("error", error);
         }
         if(result){
            FlowRouter.go("/");
         }
       });
     } else {
       return false;
     }
  }
});


Template.time.helpers({
  time: function(){
    return Session.get("time");
  },
  jsonCode: function(){
    var time = Session.get("time");
    var timeJson = null;
    return timeJson;
  }
});

Template.time.onRendered(function(){
  var time = null;

  var loading = Meteor.setInterval(function(){
    time = Session.get("time");
    if(time === null){
      this.$("#sincePageEntry").text("Loading...");
    } else {
      Meteor.clearInterval(loading);
      var initTime = new FictionalTime(time);
      var minUnit = time.units[time.separators.length]; //separators are always -1 length of units

      Meteor.setInterval(function () {
        var timeElapsed = Session.get("timeElapsed");
        this.$("#sincePageEntry").text(initTime.toDate(timeElapsed));
        Session.set("timeElapsed", (timeElapsed + minUnit));
      }, minUnit);
    }
  }, 1000);
});


/*
1) initialize the time - OK
2) show details about the time - OK
3) sample clock counting how much time has passed since the person entered the page - OK
4) if linked to ET show current time/countdown - waiting for 0.2 of package
5) JSON code of the time for others to copy - needs improvement
6) "Dynamic" form where visitors can choose from which Earth time unit they want to transfer to in the FictionalTime and vise versa
*/
