const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".button");
const inputs = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingLetters = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
//console.log(word);

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});