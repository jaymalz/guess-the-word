const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".button");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];
console.log(guessedLetters);

///Show symbols "●" as placeholders for the chosen word's letters
const  placeholder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");            
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    // grab what was entered in the input
    const guess = letterInput.value;
    //make sure that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // letter is good. guess again
        makeGuess(guess);
    }
    letterInput.value = "";
    
    
});

//Function  to check player's input
const playersInput = function(input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
    //If input is empty
    message.innerText = "Please enter one letter.";
    } else if (input.length > 1) {
    //If input is more than one letter
    message.innerText = "Enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //Typed something other than a letter
        message.innerText = "Enter a letter from A to Z.";
    } else {
        //Entered a one letter
        return input;
    }
};

const makeGuess = function(guess) {
    guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Letter guessed, 😜. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

