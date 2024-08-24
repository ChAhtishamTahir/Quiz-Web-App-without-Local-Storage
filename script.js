// ! Variables
const firstPageButton = document.querySelector(".firstPage .greenBackground");
const firstPage = document.querySelector(".firstPage");
const body = document.body;
const questionNumber = document.querySelector(".questionNumber");
const main = document.querySelector("main");
const timer = document.querySelector(".timer");
const questionInput = document.querySelector(".questionInput");
const options = document.querySelector(".options");
const nextButton = document.querySelector(".lastPart .nextButton");
const resultPageButton = document.querySelector(".lastPart .resultPageBtn");
const resultPage = document.querySelector(".resultPage");
const correctAnswerSound = new Audio("Resources/Correct Answer sound.mp3");
const wrongAnswerSound = new Audio("Resources/Incorrect  Answer Sound.mp3");
const soundOffBtn = document.querySelector(".soundOff");
const soundOnBtn = document.querySelector(".soundOn");
const correctPercentage = document.querySelector(".score span:nth-child(1)");
const wrongPercentage = document.querySelector(".score span:nth-child(3)");
const correctQuestions = document.querySelector(".score span:nth-child(2)");
const innerCircle = document.querySelector(".resultPage .innerCircle");
const quote = document.querySelector(".resultPage p");
let counter = 30;
let score = 0;
let index = 0;
let setTimeoutId;
let soundOffState = false;
let flag;
let setIntervalId;
//! Questions...

const questions = [
  {
    question: "Which company developed JavaScript?",
    options: ["Meta", "Netscape", "Google", "Microsoft"],
    correct: "Netscape",
  },
  {
    question: "What is the purpose of the meta charset='UTF-8' tag in HTML?",
    options: [
      "To define a hyperlink.",
      "To set the character encoding of the webpage.",
      "To specify the document language",
      "To include external JavaScript files.",
    ],
    correct: "To set the character encoding of the webpage.",
  },
  {
    question: "What is the default HTTP request method when submitting a form?",
    options: ["POST", "Delete", "Get", "Put"],
    correct: "Get",
  },
  {
    question: "Which of these is a valid Boolean value?",
    options: ["'true'", "true", "`true`", '"true"'],
    correct: "true",
  },
  {
    question: "Which of these is a CSS pseudo-class?",
    options: [":current", ":link", ":bold", ":class"],
    correct: ":current",
  },
  {
    question: "How do you add a comment in CSS?",
    options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
    correct: "/* comment */",
  },
  {
    question:
      "Which of the following is true about event delegation in JavaScript?",
    options: [
      "It prevents event bubbling.",
      "It allows handling events at a higher level in the DOM.",
      "It slows down performance due to multiple event handlers.",
      "It bypasses the need for event capturing.",
    ],
    correct: "It allows handling events at a higher level in the DOM.",
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "=== compares values, ignoring type.",
      " == compares values and types strictly.",
      "=== compares values and types strictly.",
      "== compares values but not type.",
    ],
    correct: "=== compares values and types strictly.",
  },
  {
    question:
      "Which of these values can be used as property keys in JavaScript objects?",
    options: [
      " Strings and Numbers",
      "Only Strings",
      "Symbols and Strings",
      "Symbols and Numbers",
    ],
    correct: "Symbols and Strings",
  },
  {
    question: "In CSS, what does the z-index property do?",
    options: [
      "Changes the background color of an element.",
      "Alters the position of an element relative to its container.",
      "Controls the stacking order of overlapping elements.",
      "Rotates an element along the z-axis.",
    ],
    correct: "Controls the stacking order of overlapping elements.",
  },
  {
    question: "Which HTML element is used for a clickable hyperlink?",
    options: ["<anchor>  ", "<link>", "<href>", "<a>"],
    correct: "<a>",
  },
  {
    question: "What does the transform: translateX(50px) property do in CSS?",
    options: [
      "Moves an element 50px up.",
      "Moves an element 50px to the left.",
      "Moves an element 50px down.",
      "Moves an element 50px to the right.",
    ],
    correct: "Moves an element 50px to the right.",
  },
  {
    question: "What does the data-* attribute in HTML5 allow you to do?",
    options: [
      "Store metadata on an HTML element.",
      "Define custom CSS styles.",
      "Add additional JavaScript functionality.",
      "Change the default behavior of form elements.",
    ],
    correct: "Store metadata on an HTML element.",
  },
  {
    question: "Which attribute is used to specify a form’s action URL in HTML?",
    options: ["action-url", "url", "action", "method"],
    correct: "action",
  },
  {
    question: "What does the :root pseudo-class in CSS represent?",
    options: [
      "The top-level parent element of the document.",
      "The element with the highest specificity.",
      "The highest-level element in the document tree",
      "The last child element of the document.",
    ],
    correct: "The highest-level element in the document tree",
  },
  {
    question:
      "Which CSS property is used to control the visibility of an element without removing it from the document flow?",
    options: [" visibility", "opacity", "display", "visibility: hidden"],
    correct: "visibility",
  },
  {
    question: `What will be the output of the following code?
    const arr = [1, 2, 3, 4, 5];
const result = arr.reduce((a, b) => a + b, 0);
console.log(result);
`,
    options: ["10", "15", "NaN", "Error"],
    correct: "15",
  },
  {
    question: `What will be the output of the following code?
    console.log(2 + true);
`,
    options: ["2", "3", "NaN", "'2true'"],
    correct: "3",
  },
  {
    question:
      "How do you apply a CSS class to every div element within a specific container?",
    options: [
      "#container div { }",
      ".container div { }",
      "div.container { }",
      ".container > div { }",
    ],
    correct: "#container div { }",
  },
  {
    question: "What does the calc() function do in CSS?",
    options: [
      "Performs arithmetic calculations to set CSS property values.",
      "Calculates the layout of an element.",
      " Converts percentages to pixel values.",
      "Defines the color of an element.",
    ],
    correct: "Performs arithmetic calculations to set CSS property values.",
  },
  {
    question:
      "Which HTML element is used for specifying a block of code in a document?",
    options: ["<code>", "<pre>", "<script>", "<block>"],
    correct: "<pre>",
  },
  {
    question: "What is the use of the hidden attribute in HTML5?",
    options: [
      "To apply hidden styling to an element.",
      "To prevent an element from being rendered.",
      "To disable an element.",
      "To hide an element from users but keep it in the DOM.",
    ],
    correct: "To hide an element from users but keep it in the DOM.",
  },
  {
    question:
      "Which of these options is not a method for creating JavaScript objects?",
    options: [
      "Factory function",
      "Object literal",
      "Constructor function",
      "Object.create()",
    ],
    correct: "Factory function",
  },
  {
    question: `What is the output of the following code?
    console.log(Number.isNaN("NaN"));
`,
    options: ["true", "false", "Error", "Undefined"],
    correct: "false",
  },
  {
    question: `What is the output of the following code? (function(){
    var a = b = 3;
})();
console.log(typeof a);
console.log(typeof b);
`,
    options: [
      "undefined, undefined",
      "undefined, number",
      "number, number",
      "ReferenceError, ReferenceError",
    ],
    correct: "undefined, number",
  },
];
//! Sound on/Off Mechanism
soundOffBtn.addEventListener("click", () => {
  soundOffState = true;
  soundOffBtn.style.display = "none";
  soundOnBtn.style.display = "block";
});
soundOnBtn.addEventListener("click", () => {
  soundOffState = false;
  soundOffBtn.style.display = "block";
  soundOnBtn.style.display = "none";
});

//! Change Question Function along with Mcq
// First Making handleClick Function (Because removeEventListener do not work on Arrow Function and we have to remove this to prevent clicks once ans is revealed when time out happened.)
function handleClick(e) {
  if (e.target.contains(options)) return;
  else {
    flag = true;
    if (e.target.innerText === questions[index].correct) {
      e.target.classList.add("correctOption");
      if (soundOffState === true) {
      } else {
        correctAnswerSound.play();
      }
      score++;
    } else {
      e.target.classList.add("wrongOption");
      if (soundOffState === true) {
      } else {
        wrongAnswerSound.play();
      }
      for (let i = 0; i < options.children.length; i++) {
        if (options.children[i].innerText === questions[index].correct) {
          options.children[i].classList.add("revealAns");
          break;
        }
      }
    }
  }
}
// Changing Questions
function changeQuestion() {
  flag = false;
  questionInput.innerText = questions[index].question;
  options.children[0].innerText = questions[index].options[0];
  options.children[1].innerText = questions[index].options[1];
  options.children[2].innerText = questions[index].options[2];
  options.children[3].innerText = questions[index].options[3];

  options.addEventListener("click", handleClick, { once: true });
  setTimeoutId = setTimeout(() => {
    if (flag === false) {
      for (let i = 0; i < options.children.length; i++) {
        if (options.children[i].innerText === questions[index].correct) {
          options.children[i].classList.add("revealAns");
          options.removeEventListener("click", handleClick);
          break;
        }
      }
    }
  }, 31000);
}
correctAnswerSound.muted;
//! Event Listener of First Page and timer function Implementation...

firstPageButton.addEventListener("click", (e) => {
  e.stopPropagation();
  setIntervalId = setInterval(() => {
    if (counter > 0) {
      counter--;
      timer.innerText = `00:${counter}`;
      if (counter > 15) {
        body.style.backgroundColor = "#cce2c2";
        timer.style.backgroundColor = "#fec33d";
      } else if (counter === 15) {
        body.style.backgroundColor = "#D4D69F8C";
        timer.style.backgroundColor = "#ffcc00";
      } else if (counter === 5) {
        body.style.backgroundColor = "#DBADAD";
        timer.style.backgroundColor = "red";
      }
    }
  }, 1000);
  firstPage.style.display = "none";
  main.style.display = "block";
  changeQuestion();
});

//! Managing Question Number and Question

nextButton.addEventListener("click", () => {
  for (let i = 0; i < options.children.length; i++) {
    options.children[i].classList.remove("correctOption");
    options.children[i].classList.remove("wrongOption");
    options.children[i].classList.remove("revealAns");
  }
  if (parseInt(questionNumber.innerText) < questions.length) {
    questionNumber.innerText = `${parseInt(questionNumber.innerText) + 1}/25`;
    clearTimeout(setTimeoutId);
    counter = 31;
    index++;
    changeQuestion();
  }
  //! Result Page Button Shown

  if (parseInt(questionNumber.innerText) === 25) {
    nextButton.style.display = "none";
    resultPageButton.style.display = "block";
  }
});

//! Showing Result Page

resultPageButton.addEventListener("click", () => {
  main.style.display = "none";
  correctQuestions.innerText = `${score}/25`;
  const percentage = Math.floor((score / 25) * 100);
  correctPercentage.innerText = `${percentage}%`;
  wrongPercentage.innerText = `${100 - percentage}%`;
  innerCircle.style.width = `${percentage}%`;
  body.style.backgroundColor = "white";
  resultPage.style.display = "flex";
  clearInterval(setIntervalId);
  if (percentage === 0) {
    quote.innerText = `“Failure is simply the opportunity to start again, this time more intelligently!”`;
  } else if (percentage < 10) {
    quote.innerText = `“Great things take time, and this is just the beginning!”`;
  } else if (percentage > 10 && percentage < 25) {
    quote.innerText = `“Every mistake you make is progress. Don’t give up!”`;
  } else if (percentage > 25 && percentage < 40) {
    quote.innerText = `“Progress is progress, no matter how small. Keep going!”`;
  } else if (percentage > 40 && percentage < 50) {
    quote.innerText = `“Success is not final, failure is not fatal: it is the courage to continue that counts.”`;
  } else if (percentage > 50 && percentage < 60) {
    quote.innerText = `“Believe you can, and you're halfway there!”`;
  } else if (percentage > 60 && percentage < 70) {
    quote.innerText = `“Great effort leads to great results. You're almost there!”`;
  } else if (percentage > 70 && percentage < 85) {
    quote.innerText = `“You’re just a few steps away from excellence. Keep going strong!”`;
  } else if (percentage > 85 && percentage < 100) {
    quote.innerText = `“Outstanding performance! The sky’s the limit for you!”`;
  }
});

document.querySelector(".retry").addEventListener("click", () => {
  resultPage.style.display = "none";
  firstPage.style.display = "flex";
  index = 0;
  score = 0;
  counter = 31;
  clearTimeout(setTimeoutId);
  clearInterval(setIntervalId);
  questionNumber.innerText = `1 / 25`;
  resultPageButton.style.display = "none";
  nextButton.style.display = "block";
});

// ! Share Result to Social Media
const linkedin = document.querySelector(".linkedin");
const twitter = document.querySelector(".twitter");
const facebook = document.querySelector(".facebook");
const shareLink = encodeURI(window.location.href);
const shareMsg = encodeURIComponent("Hey Checkout My Scores");

twitter.href = `http://twitter.com/share?&url=${shareLink}&text=${shareMsg}`;
linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url${shareLink}&title=${shareMsg}`;
facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${shareMsg}`;
