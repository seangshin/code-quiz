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
var highscoresEl = $(".highscores");
var highscoresCardEl = $("#highscores");
var listEl = $("#list");

var state = {
    quiz: false,
    highscores: false,
    gameover: false,
};

//Global variables
var questionIndex = 0;
var secondsLeft = 75;

//Hard coded Q&A
var questions = [
    "Question 1: What language is used to style a webpage?",
    "Question 2: What primitive data type is used to describe true or false?",
    "Question 3: What object is used to store a collection of multiple items under a single variable name?",
    "Question 4: What operator is used for not equal value or type?",
    "Question 5: What keyword refers to an object?",
];
var answers = [["HTML","CSS","Javascript","jQuery"],
                ["Number","String","Boolean","Null"],
                ["Array","Function","Events","Numbers"],
                ["!=","===","?","!=="],
                ["class","break","this","var"]];


/*Functions*/

//function to intially render page
function init() {

}

//function to manage the timer
function setTime() {
    var timer = setInterval(function() {
        if(secondsLeft < 0) {
            secondsLeft = 0;
        }

        if(secondsLeft === 0) {
            clearInterval(timer);
            gameOver();
        } else if (questionIndex===5) {
            clearInterval(timer);
            gameOver();
        } 
        else {
            secondsLeft--;
            timerEl.text("Time: " + secondsLeft);
        }
    }, 1000)
}
//function to start the quiz by calling initial functions
function startQuiz() {
    paragraphEl.hide(); //uses jQuery to hide start section
    buttonStart.hide();
    answersEl.show();
    resultEl.show();
    listEl.hide();
    setTime();//begins timer
    if (state.quiz === false) {
        renderQuiz();//dynamically renders quiz container and shows first question
    } else {
        questionIndex = 0;
        secondsLeft = 75;
        nextQuestion(answers[0]);
    }
    headingEl.text(questions[questionIndex]);
    resultEl.text("");
    

}
//function to render quiz container and dynamic button elements
function renderQuiz() {
    containerEl.css("align-items", "flex-start");//change css style
    

    //for loop used to append answer buttons
    for (var i=0; i<answers[questionIndex].length; i++) {
        var answerBtn = $("<button>"); //create button element
        answerBtn.addClass("user-button");//add class user-button
        answerBtn.attr("a-button", i);//add attribute a-button with value of i
        answerBtn.text(answers[questionIndex][i]);//add text to element
        answersEl.append(answerBtn);//append element to <div id="answers"><div>
    }
    state.quiz=true;
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
//function used to move to game over container
function gameOver() {
    timerEl.text("Time: " + secondsLeft);
    headingEl.text("All done!");
    paragraphEl.show();
    paragraphEl.text("Your final score is: " + secondsLeft);
    formEl.show();
    answersEl.hide();
    listEl.hide();
    if (state.gameover === false) {
        renderGameover();
    }

}
//function used to render game over container
function renderGameover() {
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

    state.gameover = true;
}
//function to append user inputted highscore
function handleSubmitForm(event) {
    event.preventDefault();

    var inputEl = $(".form-input");
    var newScoreEl = $("<li>");
    newScoreEl.text(inputEl.val() + " - " + secondsLeft);
    listEl.append(newScoreEl);

    viewHighscores();
    
    //use local storage to save high scores
}
//function to view high scores
function viewHighscores() {
    headingEl.text("Highscores");
    if (state.highscores === false) {
        renderHighscores();
    } else {
        highscoresCardEl.show();
    }
    listEl.show();
    paragraphEl.hide();
    answersEl.hide();
    resultEl.hide();
    formEl.hide();
    buttonStart.hide();
}
//function to render highscore container
function renderHighscores() {
    var scoreEl = $("<ul>");
    listEl.append(scoreEl);

    var backBtn = $("<button>");
    backBtn.addClass("user-button");
    backBtn.attr("id", "back");
    backBtn.text("Go Back");
    highscoresCardEl.append(backBtn);

    var clearBtn = $("<button>");
    clearBtn.addClass("user-button");
    clearBtn.attr("id", "clear");
    clearBtn.text("Clear Highscores");
    highscoresCardEl.append(clearBtn);

    state.highscores=true;
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
        if($(event.target).attr("a-button")==2) {
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
        if($(event.target).attr("a-button")==3) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
    }
    if(questionIndex===4) {
        if($(event.target).attr("a-button")==2) {
            resultEl.text("Correct!");
        } else {
            secondsLeft=secondsLeft-15;
            resultEl.text("Wrong!");
        }
        questionIndex++;
    } else {//if not last question, move to next question
        questionIndex++;
        nextQuestion(answers[questionIndex]);
    }
});

formEl.on("submit", handleSubmitForm);//event listener for form submission

highscoresEl.on("click", viewHighscores);//event listener for view highscores

highscoresCardEl.on("click", function(event) { //event listener for buttons on view highscore container
    if($(event.target).attr("id")=="back") {
        highscoresCardEl.hide();
        listEl.hide();
        headingEl.text("Coding Quiz Challenge");
        paragraphEl.show();
        paragraphEl.text("Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by ten seconds!");
        buttonStart.show();
    }

    if($(event.target).attr("id")=="clear") {
        listEl.children("li").remove();
    } 
});
