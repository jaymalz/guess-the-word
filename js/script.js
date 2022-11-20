const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//start game
getWord();
//Show symbols "●" as placeholders for the chosen word's letters
const  placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");            
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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

const playersInput = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
    //If input is empty?
    message.innerText = "Please enter a letter.";
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
        updateGuessesRemaining(guess);
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

const updateWordInProgress = function (guessedLetters) {
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

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        //bad guess lose a chance.
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `❌❌ Game Over ❌❌  the correct word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
            remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
};

const checkIfWin = function() {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">🎉You guessed the correct word!🎊 <br> 🏆Congrats‼️🏆</p>`;
    
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide"); //the guess button
    remainingGuessesElement.classList.add("hide"); //paragraph remainingGuesses display
    guessedLettersElement.classList.add("hide");  //uli guessedLetters appear
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //reset all original values - get new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    // get new word
    getWord();

    //show the correct UI elements
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});



