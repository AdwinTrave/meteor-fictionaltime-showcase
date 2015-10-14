//TODO figure out how to do editing nicely
Template.create.helpers({
  unitsAndSeparators: function(){
    var insert = "";
    if( FlowRouter.getRouteName() === "timeDetails" ){
      //we are on a specific time, so get the time details
      var time = FictionalTimeCollection.findOne({_id: FlowRouter.getParam("timeId")});
      var totalLength = time.units.length;

    } else {
      //create the intial units and dividers
    }
    //insert the units and separators into the right place, ie. return
    return insert;
  }
});

Template.create.events({
  "click [data-action='addUnit']": function(event,template){
    event.preventDefault();
    //find the latest unit
    var addPoint = $("[class^=unit]").last();
    //console.log(addPoint);

    //determine the latest unit
    var latest = addPoint.attr("id").split("-");
    latest = latest[1];
    addPoint = addPoint.parent().parent();
    var unitNew = parseInt(latest) + 1;

    //for now limit to 9 units in order to prevent too much craziness
    if(unitNew < 10)
    {
      //add separator and unit
      addPoint.after('<div class="uk-form-row"><label>Separator '+ (unitNew) +'</label><div class="uk-form-controls"><input id="separator-' + (unitNew - 1) + '" class="separator" type="text" value=":" max="3" required><div class="uk-form-row"><label>Unit ' + (unitNew+1) + '</label><div class="uk-form-controls"><input id="unit-'+ unitNew +'" class="unit" type="number" step="1" min="1" value="1000" required></div></div>');
    }
    else
    {
      addPoint.after('<div data-alert class="alert-box warning">That is enough for now. If you really have such complex time, contact me (@storyteller_cz) to get around this.</div>');
    }
  },
  "click [data-action='removeUnit']": function(event,template){
    event.preventDefault();

    var addPoint = $("[class^=unit]").last();
    addPoint = addPoint.parent().parent();

    //TODO
  },
  //TODO selection of both in time declaration
  "submit #editTimeForm": function(event, template){
    event.preventDefault();

    //get the data
    //find the total number of units
    var units = $("[class^=unit]");
    var separators = $("[class^=separator]");
    var totalUnits = units.last().attr("id").split("-");
    totalUnits = parseInt(totalUnits[1]);

    //get units
    var unitsArray = new Array(totalUnits + 1)
    //get all the units and separators into arrays
    units.each(function(index, item){
      unitsArray[totalUnits - index] = parseInt($(item).val());
    });

    //get separators
    var separatorsArray = new Array(totalUnits);
    separators.each(function(index, item){
      separatorsArray[(totalUnits-1) - index] = $(item).val();
    });

    //get the remaining values
    //var beginning = $("#beginning").val();
    //console.log(beginning);

    //name
    var name = event.target.name.value;

    //description
    var description = event.target.description.value;

    //time declaration
    var declarationLocation = event.target.declarationLocation.value;

    var declaration;
    if(declarationLocation !== "none"){
      if(declarationLocation !== "both"){
        declaration = event.target.declarator.value;
      } else {
        declaration[0] = event.target.declarator1.value;
        declaration[1] = event.target.declarator2.value;
      }
    }

    //TODO ET start date

    //check the data

    //create the document
    var ficTime = new fictionalTime();
    ficTime.set({
      name: name,
      description: description,
      connectedToET: false,
      beginning: false,
      units: unitsArray,
      separators: separatorsArray,
      declaration: declaration,
      declarationLocation: declarationLocation
    });

    //send to server to save
    var result = Meteor.call("saveTime", ficTime, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         if(result === false){
           console.log("There was an error writing to the DB.");
         }
      }
    });
    if(result !== false){
      //reset the form
      event.target.reset();

      //close the modal
      var modal = UIkit.modal("#editTime");
      modal.hide();

      //TODO show a confirmation message
    }
  },
  //TODO removing of units
  "click [data-action='removeUnit']": function(){
    //minimum is 2 units
  }
});
