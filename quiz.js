// Global variables
let COUNT = 1;
let array;
let timeinterval; // Declare timeinterval outside the functions

// Main function
document.addEventListener("DOMContentLoaded", function () {
  console.log("fun called");
  getJSON();
  result();
});

// Result function
function result() {
  let marksession = sessionStorage.getItem("mark");
  let mark1 = parseInt(marksession, 10) || 0;
  console.log(mark1);
  let resultField = document.getElementById("result");
  if (resultField) {
    resultField.innerText = mark1;
  }
}

// Function to get data from JSON file using fetch
function getJSON() {
  fetch("ques-db.json")
    .then((response) => response.json())
    .then((json) => {
      array = json;
      result(); // Display initial result
      let mark = 0;
      sessionStorage.setItem("mark", mark);
      getFunction(); // Start the first question
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Function to print question and start timer
function getFunction() {
  // Reset the existing timer before moving to the next question
  resetTimer();

  if (COUNT <= 10) {
    const keys = Object.values(array || []);
    let randIndex = Math.floor(Math.round(Math.random() * 6));
    if (randIndex == null) {
      randIndex = 1;
    } else {
      let value = keys[randIndex];
      document.getElementById("queno").innerText = COUNT;
      document.getElementById("que").innerText = keys[randIndex]?.question;
      document.getElementById("value1").innerText = value["options"][0];
      document.getElementById("value2").innerText = value["options"][1];
      document.getElementById("value3").innerText = value["options"][2];
      document.getElementById("value4").innerText = value["options"][3];
      sessionStorage.setItem("que", keys[randIndex].question);
      sessionStorage.setItem("ans", keys[randIndex].answer);

      // Determine the level of the question
      let questionLevel = value["level"];
      let timerDuration = getTimerDuration(questionLevel);

      // Display the initial timer value before starting the timer
      displayTimer(timerDuration);

      // Start timer with the corresponding duration
      startTimer(timerDuration);
    }
  } else {
    document.getElementById("value1").disabled = true;
    document.getElementById("value2").disabled = true;
    document.getElementById("value3").disabled = true;
    document.getElementById("value4").disabled = true;

    // Display final result
    
    result();
  }
  COUNT++;
}

// Function to check answers
function process(value) {
  selectedValue = value.innerText;
  let ans = sessionStorage.getItem("ans");
  if (ans == selectedValue) {
    let mark = sessionStorage.getItem("mark");
    let mark1 = parseInt(mark, 10) || 0;;
    mark1++;
    sessionStorage.setItem("mark", mark1);

    // Update result in real-time
    result();
  }
  getFunction(); // Move to the next question
}

// Function to display initial timer value
function displayTimer(duration) {
  var minutes = Math.floor(duration / 60);
  var seconds = duration % 60;
  document.getElementById("timer").innerHTML =
    ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timeinterval);
}

// Function to set timer based on question level
function getTimerDuration(level) {
  switch (level) {
    case "easy":
      return 10;
    case "medium":
      return 20;
    case "difficult":
      return 30;
    default:
      return 20; // Default to 20 seconds for unknown levels
  }
}

// Function to set timer
function startTimer(duration) {
  var current_time = Date.parse(new Date());
  var deadline = new Date(current_time + duration * 1000);

  function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return { total: t, minutes: minutes, seconds: seconds };
  }

  function update_clock() {
    var t = time_remaining(deadline);
    document.getElementById("timer").innerHTML =
      ("0" + t.minutes).slice(-2) + ":" + ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);

      // Check if it's the last question
      if (COUNT <= 10) {
        getFunction(); // Move to the next question
      } else {
        location.replace("index2.html"); // Redirect to index2.html
      }
    }
  }

  // Clear the previous interval before setting a new one
  clearInterval(timeinterval);

  update_clock();
  timeinterval = setInterval(update_clock, 1000);
}
 document.addEventListener("DOMContentLoaded", function () {
   // Add an event listener to the submit button
   document
     .getElementById("submitButton")
     .addEventListener("click", function () {
       // Call the function to submit the quiz and display an alert
       submitQuiz();
     });
 });

   // Function to submit the quiz
  function submitQuiz() {
   

    // Display a confirmation dialog
    var userResponse = window.confirm("Are you sure you want to close the quiz?");

    // Proceed with submitting the test only if the user clicks 'OK'
    if (userResponse) {
      window.location.href = "index2.html";
    } else {
      // If user clicks 'Cancel' or dismisses the confirmation, stay on "/index1.html"
      window.location.href = "/index1.html";
    }
  }