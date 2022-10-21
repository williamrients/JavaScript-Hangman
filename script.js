const correctLetters = [];
const wrongLetters = [];
let selectedWord;
const wrongLettersEl = document.getElementById('wrong-letters-container');
const wordEl = document.getElementById('word-container');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');
const letter_previously_entered = document.getElementById("letter-previously-entered");
const figure_parts = document.querySelectorAll(".figure-parts");
let gamePlaying = true;

playAgainBtn.addEventListener("click", function () {
    gamePlaying = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    updateWrongLetters();
    getRandomWord();
    displayWord();
    popup.style.display = 'none';
});

function updateWrongLetters() {
    let result = wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : '';
    for (const letter of wrongLetters) {
        result += "<span>" + letter + "</span>";
    }
    result = result.replaceAll('</span><span>', '</span>, <span>');
    wrongLettersEl.innerHTML = result;
    figure_parts.forEach(function (part, index) {
        if (index < wrongLetters.length) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });
    if (wrongLetters.length == figure_parts.length) {
        gamePlaying = false;
        finalMessage.innerHTML = "Sorry, you lost. 😞<br>The word was '" + selectedWord + "'";
        playAgainBtn.textContent = "Play Agin";
        popup.style.display = "flex";
    }
}

function showNotification(letter) {
    letter_previously_entered.textContent = letter;
    notification.classList.add("show");
    setTimeout(function () {
        notification.classList.remove("show");
    }, 2000);
}

window.addEventListener("keydown", function (event) {
    if (gamePlaying) {
        gamePlaying = true;
        const keyPress = event.key;
        if (keyPress.match(/^[a-z]/)) {
            if (selectedWord.includes(keyPress)) {
                if (!correctLetters.includes(keyPress)) {
                    correctLetters.push(keyPress);
                    displayWord();
                } else {
                    showNotification(keyPress);
                }
            } else {
                if (!wrongLetters.includes(keyPress)) {
                    wrongLetters.push(keyPress);
                    updateWrongLetters();
                } else {
                    showNotification(keyPress);
                }
            }
        }
    }
});


function getRandomWord() {
    const randIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randIndex][0].toLowerCase();
}

function displayWord() {

    const letters = selectedWord.split('');
    let result = '';
    for (const letter of letters) {
        result += '<span>';
        result += correctLetters.includes(letter)
            ? letter : "";
        result += '</span>'
    }
    wordEl.innerHTML = result;

    const innerLetters = wordEl.innerText.replace(/\n/g, '');
    if (innerLetters == selectedWord) {
        gamePlaying = false;
        finalMessage.innerHTML = 'Congratulations!<br>You won! 😃';
        playAgainBtn.textContent = "Play Agin";
        popup.style.display = "flex";
    }
}