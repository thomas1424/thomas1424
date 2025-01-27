let timer;
let timeLeft = 60;
let wpm = 0;
let accuracy = 100;
let textToType = "";
let inputArea = document.getElementById('input-area');
let timeDisplay = document.getElementById('time');
let wpmDisplay = document.getElementById('wpm');
let accuracyDisplay = document.getElementById('accuracy');
let startBtn = document.getElementById('start-btn');
let restartBtn = document.getElementById('restart-btn');
let difficultySelect = document.getElementById('difficulty');
let resultsList = document.getElementById('results-list');

const texts = {
    easy: ["The quick brown fox jumps over the lazy dog."],
    medium: ["A journey of a thousand miles begins with a single step."],
    hard: ["To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer."]
};

startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', restartTest);

function startTest() {
    const difficulty = difficultySelect.value;
    textToType = texts[difficulty][0];
    document.getElementById('text-to-type').innerText = textToType;
    inputArea.disabled = false;
    inputArea.value = '';
    inputArea.focus();
    startBtn.disabled = true;
    restartBtn.disabled = false;
    timeLeft = 60;
    timer = setInterval(countDown, 1000);
    inputArea.addEventListener('input', handleInput);
}

function countDown() {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        inputArea.disabled = true;
        displayResults();
    }
}

function handleInput() {
    const typedText = inputArea.value;
    const typedWords = typedText.split(/\s+/).length;
    wpm = (typedWords / (60 - timeLeft)) * 60;

    const correctChars = countCorrectChars(typedText, textToType);
    accuracy = (correctChars / textToType.length) * 100;

    wpmDisplay.innerText = Math.round(wpm);
    accuracyDisplay.innerText = Math.round(accuracy);
}

function countCorrectChars(typedText, referenceText) {
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === referenceText[i]) {
            correctChars++;
        }
    }
    return correctChars;
}

function restartTest() {
    clearInterval(timer);
    timer = null;
    timeLeft = 60;
    wpm = 0;
    accuracy = 100;
    inputArea.value = '';
    inputArea.disabled = true;
    timeDisplay.innerText = timeLeft;
    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy;
    startBtn.disabled = false;
    restartBtn.disabled = true;
}

function displayResults() {
    const resultItem = document.createElement('li');
    resultItem.innerText = `WPM: ${Math.round(wpm)}, Accuracy: ${Math.round(accuracy)}%`;
    resultsList.appendChild(resultItem);
}
