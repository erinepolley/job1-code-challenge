console.log("Hello world!")
// (function () {
//
// `randomizeTest` accepts and returns a `Test` object. The questions in the returned object should
// be in a random order. The order of the choices within each question should also be randomized.
//
function randomizeTest(test) {
    // This function is being called on line 25.
    // Your code to randomize questions and answers goes here
    // 
    console.log("TEST QUESTIONS!", test.questions, "TEST CHOICES", test.choices)
    console.log("TEST ANSWERS", test.answers)

    let currentIndex = test.questions.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex > 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex - 1;

        // And swap it with the current element.
        temporaryValue = test.questions[currentIndex];
        test.questions[currentIndex] = test.questions[randomIndex];
        test.questions[randomIndex] = temporaryValue;
    }

    console.log("RANDOM QUESTIONS?", test.questions);
}


//This looks like it's making an object with the arrays below.
function Test(questions, choices, answers) {
    //How can you do a this in a function? Isn't that more for an object?
    this.questions = questions;
    this.choices = choices;
    this.answers = answers;
}

//
// displays the sample test in the browser with the correct answer highlighted
//
function renderTest(test, parent) {
    const randomizedTest = randomizeTest(test);
    //this looks like it is looping through the array of test questions and creating a list item for each question.
    for (let i = 0; i < randomizedTest.questions.length; i += 1) {
        const qElement = document.createElement("li");
        let correctCount = 0;
        //Grabbing the list item from above and setting the class value to "question".
        qElement.setAttribute("class", "question");
        //Basically, insterting the test question into the list item. KIND OF like innerhtml? Never seen this before. Thanks, Google.
        qElement.appendChild(
            document.createTextNode(randomizedTest.questions[i])
        );

        for (let j = 0; j < randomizedTest.answers[i].length; j += 1) {
            if (randomizedTest.answers[i][j] === 1) {
                correctCount += 1;
            }
        }

        for (let j = 0; j < randomizedTest.choices[i].length; j += 1) {
            const choiceLabelElement = document.createElement("label"),
                choiceInputElement = document.createElement("input");

            choiceInputElement.setAttribute("name", (correctCount === 1 ? "radio" : "check") + i);
            choiceInputElement.setAttribute("type", correctCount === 1 ? "radio" : "checkbox");
            choiceInputElement.setAttribute("value", j);

            choiceLabelElement.classList.add("choice");
            if (randomizedTest.answers[i][j] === 1) {
                choiceLabelElement.classList.add("correct");
            }

            choiceLabelElement.appendChild(choiceInputElement);
            choiceLabelElement.appendChild(
                document.createTextNode(randomizedTest.choices[i][j])
            );

            qElement.appendChild(choiceLabelElement);
            parent.appendChild(qElement);
        }
    }
}

const questions = [
    "What can you find in Rustici Software's office?",
    "All of Rustici Software employees are expected to work no more than ____ hours per week.",
    "The end users of Rustici Software's products number in the _________",
    "Rustici Software is a (choose all that apply):",
    "Tim likes to wear:"
],
    choices = [
        [
            "Dart Board",
            "Ping Pong Table",
            "Cubicles",
            "Laptops with dual monitors",
            "TPS reports, ummm yeah"
        ],
        [
            "80",
            "40",
            "50",
            "60"
        ],
        [
            "Tens",
            "Hundreds",
            "Thousands",
            "Millions",
            "Billions"
        ],
        [
            "Great place to work",
            "Respected leader in its field",
            "Place where people don't matter, just results"
        ],
        [
            "Capri pants",
            "Goth attire",
            "Sport coat",
            "T-shirt and shorts"
        ]
    ],
    answers = [
        [1, 1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0],
        [0, 0, 0, 1, 0]
    ],
    //Instantiating a test object 
    test = new Test(questions, choices, answers);

renderTest(test, document.getElementById("questions"));
    //Never seen this weirdness below before. Why are there empty parenthesis here?
// }());
