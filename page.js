// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6rlNjOHp-JxqSsQlC67TSJiiMm3hHGLI",
    authDomain: "train-schedule-47080.firebaseapp.com",
    databaseURL: "https://train-schedule-47080.firebaseio.com",
    projectId: "train-schedule-47080",
    storageBucket: "train-schedule-47080.appspot.com",
    messagingSenderId: "1081529561648"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrn = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
  var frequency = moment($("#frequency-input").val().trim(),"mm").format("mm");
  console.log("first train" + firstTrn);
  // Creates local "temporary" object for holding employee data
  var newTrn = {
    name: trnName,
    dest: destination,
    start: firstTrn,
    freq: frequency
  };
  
  console.log("first train" + firstTrn);
  // Uploads employee data to the database
  database.ref().push(newTrn);
  
    // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrn = childSnapshot.val().start;
  var frequency = childSnapshot.val().freq;

  // Employee Info
  console.log(trnName);
  console.log(destination);
  console.log(firstTrn);
  console.log(frequency);

  console.log(nextArr + " this is the next arrival")
    var firstTimeConverted = moment(firstTrn, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    // Next Train
    var nextArr = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArr).format("hh:mm"));

  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + destination + "</td><td>" +
  firstTrn + "</td><td>" + frequency + "</td><td>" + moment(nextArr).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});