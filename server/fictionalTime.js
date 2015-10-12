//methods for fictional time collection
Meteor.methods({
  saveTime:function(timeObj){
    //add current users
    if(Meteor.userId())
    {
      timeObj.set({
        user: Meteor.userId()
      });
    } else {
      return false;
    }

    //check values
    if(timeObj.validate())
    {
      console.log("Saving new time.");
      return timeObj.save();
    } else {
      console.log(timeObj);
      console.log(timeObj.getValidationErrors());
      return timeObj.getValidationErrors();
    }
  }
});

Meteor.publish("allTimes", function(limit){
  return FictionalTimeCollection.find({}, {limit: limit, fields: {name: 1, user: 1, description: 1}});
});

Meteor.publish("getTime", function(timeId){
  return FictionalTimeCollection.find({_id: timeId});
});

Meteor.publish("userTimes", function(userId){
  return FictionalTimeCollection.find({user: userId});
});
