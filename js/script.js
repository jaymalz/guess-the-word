const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

///Show symbols "●" as placeholders for the chosen word's letters
const  placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");            
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    //empty message paragraph
    message.innerText = "";  
    // grab what was entered in the input
    const guess = letterInput.value;  
    //make sure that it is a single letter
    const goodGuess = playersInput(guess);

    if (goodGuess) {    
        // letter received. keep guessing           
        makeGuess(guess);
    }
    letterInput.value = "";
});

//Function  to check player's input
const playersInput = function(input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
    //If input is empty?
    message.innerText = "Please enter one letter.";
    } else if (input.length > 1) {
    //If input is more than one letter
    message.innerText = "Enter only one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //Typed something other than a letter
        message.innerText = "Enter a letter from A to Z.";
    } else {
        //we finally got one letter
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Letter already guessed, 😜. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    //clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const checkIfWin = function() {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">🎉You guessed the correct word!🎊 <br> 🏆Congrats‼️🏆</p>.`;
    }
};


