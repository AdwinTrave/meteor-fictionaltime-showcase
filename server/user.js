Meteor.publish("userDetails", function(userId){
  return Meteor.users.find({_id: userId}, {fields: {username: 1, profile: 1}});
});
