var config = {
    apiKey: "AIzaSyByO99rbXpml66bPP3k9RQz9xPux1j2xy4",
    authDomain: "traintimers.firebaseapp.com",
    databaseURL: "https://traintimers.firebaseio.com",
    storageBucket: "traintimers.appspot.com",
    messagingSenderId: "538570974880"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".input-group-button").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#new-train").val().trim();
    var destination = $("#destiny").val().trim();
    var firsTrain = $("#first-train").val();
    var frequency = $("#frequency").val();

    var addTrain = {
        name: trainName,
        local: destination,
        first: firsTrain,
        frequency: frequency
    };
    
    database.ref().push(addTrain);

    alert("Stop Added");
    
    $("#new-train").val("");
    $("#destiny").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    
    console.log(childSnapshot.val());
    console.log(prevChildKey);
    
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().local;
    var firsTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
    
    var firstTrainConverted = moment(firsTrain, "hh:mm").subtract(1, "years");
    
    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minsAway = frequency - remainder;
    var nextArrival = moment().add(minsAway,"minutes").format("hh:mm a");
    
    $("#schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firsTrain + "</td><td>" + frequency + " mins" + "</td><td>" + minsAway + "</td><td>" + nextArrival + "</td></tr>");
});   