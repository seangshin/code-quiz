//Accesses element by id using jQuery
var buttonStart = $("#start-button");
var timerEl = $(".timer");
var startEl = $("#start");
var quizEl = $("#quiz");
var headingEl = $(".heading");
var answersEl = $("#answers");
var paragraphEl = $(".paragraph");
var containerEl = $(".container");
var resultEl = $("#result");
var formEl = $("#submit-form");

//Global variables
var questionIndex = 0;
var secondsLeft = 75;

//Hard coded Q&A
var questions = [
    "Question 1: What language is used to style a webpage?",
    "Question 2: What is my name?",
    "Question 3: Insert question 3",
    "Question 4: Insert question 4",
    "Question 5: Insert question 5",
];
var answers = [["HTML","CSS","Javascript","jQuery"],
                ["Sean","Bob","Steve","Jim"],
                ["Sean","Bob","Steve","Jim"],
                ["Sean","Bob","Steve","Jim"],
                ["Sean","Bob","Steve","Jim"]];


/*Functions*/

//function to intially render page
function init() {

}
//function to manage the timer
function setTime() {
    var timer = setInterval(function() {
        if(secondsLeft === 0) {
            clearInterval(timer);
            gameOver();
        }
        if(questionIndex===4) {
            clearInterval(timer);
        }
        secondsLeft--;
        timerEl.text("Time: " + secondsLeft);
    }, 1000)
}
//function to start the quiz by calling initial functions
function startQuiz() {
    paragraphEl.hide(); //uses jQuery to hide start section
    buttonStart.hide();
    setTime();//begins timer
    renderQuiz();//dynamically renders quiz container and shows first question

}
//function to render quiz container and dynamic button elements
function renderQuiz() {
    containerEl.css("align-items", "flex-start");//change css style
    headingEl.text(questions[questionIndex]);

    //for loop used to append answer buttons
    for (var i=0; i<answers[questionIndex].length; i++) {
        var answerBtn = $("<button>"); //create button element
        answerBtn.addClass("user-button");//add class user-button
        answerBtn.attr("a-button", i);//add attribute a-button with value of i
        answerBtn.text(answers[questionIndex][i]);//add text to element
        answersEl.append(answerBtn);//append element to <div id="answers"><div>
    }
}
//refreshes questions and answers, passes in answer arrays
function nextQuestion(currentArray) {
    headingEl.text(questions[questionIndex]);//refreshes question text
    //for loop used to display answer buttons
    for (var i=0; i<currentArray.length; i++) {
        var answerEl = $("[a-button=" + i + "]")//access element by attribute 
        answerEl.text(currentArray[i]);//add text to element
    }
}

function gameOver() {
    timerEl.text("Time: " + secondsLeft);
    headingEl.text("All done!");
    paragraphEl.show();
    paragraphEl.text("Your final score is: " + secondsLeft);
    answersEl.hide();
    resultEl.hide();

    //create and append form and submit button
    var myForm = $("<input>");
    var myBtn = $("<button>");
    myForm.addClass("form-input");
    myForm.attr("type='text'");
    myForm.attr("name='Initials'");
    myForm.attr("placeholder='Type here'");
    formEl.text("Enter Initials: ");
    formEl.append(myForm);
    myBtn.addClass("user-button");
    myBtn.text("Submit");
    formEl.append(myBtn);
}

function handleSubmitForm(event) {
    event.preventDefault();
    window.alert("Submitted!");
    
    //use local storage to save high scores
}

//Event listeners
buttonStart.on("click", startQuiz);//listens for start button click
answersEl.on("click", ".user-button", function (event) { //listens for answer button clicks
    //if statements to check verify if user selected the correct answer for the current question
    if(questionIndex===0) {
        if($(event.target).attr("a-button")==1) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
    }
    if(questionIndex===1) {
        if($(event.target).attr("a-button")==0) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
    }
    if(questionIndex===2) {
        if($(event.target).attr("a-button")==0) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
    }
    if(questionIndex===3) {
        if($(event.target).attr("a-button")==0) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
    }
    if(questionIndex===4) {
        if($(event.target).attr("a-button")==0) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
        gameOver();//end the game after final question
    } else {//if not last question, move to next question
        questionIndex++;
        nextQuestion(answers[questionIndex]);
    }
});

formEl.on("submit", handleSubmitForm);
