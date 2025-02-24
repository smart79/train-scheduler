console.log("✅ script.js is connected and running!");

// Check if Firebase has already been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that one
}
const auth = firebase.auth();
const dataRef = firebase.database();

// Detect login state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User signed in:", user.email);
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    } else {
        console.log("No user signed in");
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }
});

// Google Login
function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        console.log("User logged in:", result.user);
    }).catch((error) => {
        console.error("Login failed:", error);
    });
}

// Logout
function googleSignOut() {
    auth.signOut().then(() => {
        console.log("User logged out");
    });
}

// Initial values
var name = "";
var destination = "";
var time = "";
var frequency = "";
var firstTimeConverted;
var clock;
var date;
var trainName;
var trainDes;
var trainFreq;
var nextTrainTime;
var minutesLeft;
var trainNames = [];
var trainDests = [];
var trainTimes = [];
var trainFreqs = [];

// Display current time
var updateClock = function() {
    clock = $('#current-time');
    date = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a');
    clock.html('<h3>' + date + '</h3>');
    var indCol = date.indexOf(':');
    var seconds = date.substring(indCol + 4, date.length - 3);

    if (seconds == '00') {
        updateTable();
    }
};

updateClock();
setInterval(updateClock, 1000);

// Calculate next train arrival
function showTrains() {
    var timeDiff = moment().diff(firstTimeConverted, 'minutes');
    var minutesAgo = timeDiff % trainFreq;
    minutesLeft = trainFreq - minutesAgo;
    var nextTrain = moment().add(minutesLeft, "minutes");
    nextTrainTime = moment(nextTrain).format("hh:mm");

    $("#table-body").append(`
        <tr class='table-row'>
            <td class='table-name'>${trainName}</td>
            <td class='table-desination'>${trainDes}</td>
            <td class='table-frequency'>${trainFreq}</td>
            <td class='next-train'>${nextTrainTime}</td>
            <td class='minutes-away'>${minutesLeft}</td>
        </tr>
    `);
}

// Updates train schedule
function updateTable() {
    $("#table-body").empty();

    for (let i = 0; i < trainNames.length; i++) {
        firstTimeConverted = moment(trainTimes[i], "hh:mm").subtract(1, "years");
        trainName = trainNames[i];
        trainDes = trainDests[i];
        trainFreq = trainFreqs[i];
        showTrains();
    }
}

// Capture form submission
$(document).on('click', '#add-train', function(event) {
    event.preventDefault();

    if (!auth.currentUser) {
        alert("Please sign in with Google to add a train.");
        return;
    }

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    if (name && destination && time && frequency) {
        dataRef.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
            userID: auth.currentUser.uid,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#name-input").val('');
        $("#destination-input").val('');
        $("#time-input").val('');
        $("#frequency-input").val('');
    } else {
        alert("Please fill out all fields.");
    }
});

// Firebase event listener
dataRef.ref().on("child_added", function(childSnapshot) {
    trainNames.push(childSnapshot.val().name);
    trainDests.push(childSnapshot.val().destination);
    trainTimes.push(childSnapshot.val().time);
    trainFreqs.push(childSnapshot.val().frequency);
    updateTable();
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

   
   