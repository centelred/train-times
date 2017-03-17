  var config = {
      apiKey: "AIzaSyDeXaWQpXKKkKsU2bBbdsg4zlNp43Bfwik"
      , authDomain: "traintimes-7ec9d.firebaseapp.com"
      , databaseURL: "https://traintimes-7ec9d.firebaseio.com"
      , storageBucket: "traintimes-7ec9d.appspot.com"
      , messagingSenderId: "177418539"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var currentTime = moment();
  $(".input-group-button").on("click", function (event) {
      event.preventDefault();
      var trainName = $("#new-train").val().trim();
      var destination = $("#destiny").val().trim();
      var firsTrain = moment($("#first-train").val(), "HHmm");
      var frequency = $("#frequency").val();
      var addTrain = {
          name: trainName
          , local: destination
          , first: firsTrain
          , frequency: frequency
      };
      database.ref().push(addTrain);
      $("#new-train").val("");
      $("#destiny").val("");
      $("#first-train").val("");
      $("#frequency").val("");
  });
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().local;
      var firsTrain = childSnapshot.val().first;
      var frequency = childSnapshot.val().frequency;
      var firstTrainConverted = moment(firsTrain, "hh:mm").subtract("1, years");
      var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
      var remainder = difference % frequency;
      var minsAway = frequency - remainder;
      var nextArrival = moment().add(minsAway, "minutes").format("hh:mm a");
      $("#schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firsTrain + "</td><td>" + frequency + "mins" + "</td><td>" + minsAway + "</td><td>" + nextArrival + "</td></tr>");
  });