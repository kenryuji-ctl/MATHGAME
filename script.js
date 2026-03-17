// Math Quiz Script

const easyMathQuestions = [
    { question: 'Easy: What is 2 + 2?', answer: '4' },
    { question: 'Easy: What is 10 - 7?', answer: '3' },
    { question: 'Easy: What is 6 / 2?', answer: '3' },
    { question: 'Easy: What is the square root of 9?', answer: '3' },
    { question: 'Easy: What is 4 + 5?', answer: '9' },
    { question: 'Easy: What is 8 - 3?', answer: '5' }
];

const normalMathQuestions = [
    { question: 'Normal: What is 5 x 3?', answer: '15' },
    { question: 'Normal: What is 7 + 8?', answer: '15' },
    { question: 'Normal: What is 12 / 4?', answer: '3' },
    { question: 'Normal: What is 9 x 2?', answer: '18' },
    { question: 'Normal: What is 11 - 4?', answer: '7' }
];

const hardMathQuestions = [
    { question: 'Hard: What is 3 x 3?', answer: '9' },
    { question: 'Hard: What is 7 x 6?', answer: '42' },
    { question: 'Hard: What is 12 x 12?', answer: '144' },
    { question: 'Hard: What is 15 x 15?', answer: '225' },
    { question: 'Hard: What is 19 + 23?', answer: '42' }
];

function getWordListByDifficulty(diff) {
    const saved = JSON.parse(localStorage.getItem('hangmanWordsByDifficulty') || '{}');
    const savedForDiff = Array.isArray(saved[diff]) ? saved[diff] : [];
    let defaultList = [];

    if (diff === 'easy') {
        defaultList = easyMathQuestions;
    } else if (diff === 'hard') {
        defaultList = hardMathQuestions;
    } else {
        defaultList = normalMathQuestions;
    }

    return [...savedForDiff, ...defaultList].map(q => ({ word: q.answer, hint: q.question }));
}

function removeWordFromList(answer, diff) {
    const allWords = getWordListByDifficulty(diff);
    const idx = allWords.findIndex(w => w.word.toUpperCase() === answer.toUpperCase());
    if (idx !== -1) {
        allWords.splice(idx, 1);
        const persisted = JSON.parse(localStorage.getItem('hangmanWordsByDifficulty') || '{}');
        persisted[diff] = allWords;
        localStorage.setItem('hangmanWordsByDifficulty', JSON.stringify(persisted));
    }
}

let currentQuestion = null;
let currentAnswer = '';
let remainingAttempts = 0;
let maxWrong = 6;
let difficulty = 'normal';
let timeRemaining = 60;
let timerInterval = null;
let currentScore = 0;
let lastRoundScore = 0;
let soundEnabled = true;
let gameOver = false;
let won = false;
let timedOut = false;
let leaderboardFilter = 'all';

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const questionDisplay = document.getElementById('question-display');
const answerInput = document.getElementById('answer-input');
const submitAnswerBtn = document.getElementById('submit-answer');
const gameStatus = document.getElementById('game-status');
const wrongCount = document.getElementById('wrong-count');
const backBtn = document.getElementById('back-btn');
const playBtn = document.getElementById('play-btn');
const rulesBtn = document.getElementById('rules-btn');
const difficultyBtn = document.getElementById('difficulty-btn');
const rulesModal = document.getElementById('rules-modal');
const difficultyModal = document.getElementById('difficulty-modal');
const closeRulesBtn = document.getElementById('close-rules');
const closeDifficultyBtn = document.getElementById('close-difficulty');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score-display');
const resultsModal = document.getElementById('results-modal');
const resultsPlayAgain = document.getElementById('results-play-again');
const resultsContinue = document.getElementById('results-continue');
const soundBtn = document.getElementById('sound-btn');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const clearLeaderboardMenuBtn = document.getElementById('clear-leaderboard-menu');
const playerNameInput = document.getElementById('player-name');

playBtn.addEventListener('click', startGame);
rulesBtn.addEventListener('click', () => rulesModal.classList.add('show'));
difficultyBtn.addEventListener('click', () => difficultyModal.classList.add('show'));
closeRulesBtn.addEventListener('click', () => rulesModal.classList.remove('show'));
closeDifficultyBtn.addEventListener('click', () => difficultyModal.classList.remove('show'));
leaderboardBtn.addEventListener('click', showLeaderboard);
closeLeaderboardBtn.addEventListener('click', () => leaderboardModal.classList.remove('show'));
clearLeaderboardMenuBtn.addEventListener('click', clearPlayerName);

// Add event listeners for leaderboard difficulty filter buttons
document.querySelectorAll('.leaderboard-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.leaderboard-filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Update filter and refresh leaderboard
        leaderboardFilter = e.target.getAttribute('data-difficulty');
        showLeaderboard();
    });
});

backBtn.addEventListener('click', goBackToMenu);
resultsPlayAgain.addEventListener('click', () => {
    if (gameOver && !won) {
        const nameInput = (playerNameInput.value || '').trim();
        if (!nameInput) {
            // allow returning to menu without saving if no name entered
            goBackToMenu();
            return;
        }

        const diffKey = difficulty.toLowerCase();
        let allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
        if (!allBoards[diffKey]) allBoards[diffKey] = [];
        if (allBoards[diffKey].some(entry => entry.name.toLowerCase() === nameInput.toLowerCase())) {
            alert(`The name "${nameInput}" already exists in ${difficulty} leaderboard. Choose a different name.`);
            return;
        }

        recordPlayerResult();
    }
    goBackToMenu();
});
resultsContinue.addEventListener('click', () => {
    // Continue only for winning, no immediate save on continue path
    resultsModal.classList.remove('show');
    startGame();
});
submitAnswerBtn.addEventListener('click', handleAnswerSubmit);
answerInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') handleAnswerSubmit(); });
window.addEventListener('resize', renderMobileKeyboard);
soundBtn.addEventListener('click', toggleSound);

document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        difficulty = btn.dataset.difficulty;

        switch (difficulty) {
            case 'easy': maxWrong = 6; break;
            case 'hard': maxWrong = 4; break;
            default: maxWrong = 6;
        }

        remainingAttempts = maxWrong;
    });
});

window.addEventListener('click', (e) => {
    if (e.target === rulesModal) rulesModal.classList.remove('show');
    if (e.target === difficultyModal) difficultyModal.classList.remove('show');
    if (e.target === leaderboardModal) leaderboardModal.classList.remove('show');
    if (e.target === resultsModal) resultsModal.classList.remove('show');
});

function startGame() {
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    initGame();
}

function goBackToMenu() {
    currentScore = 0;
    stopTimer();
    gameScreen.style.display = 'none';
    menuScreen.style.display = 'block';
    resultsModal.classList.remove('show');
}

function initGame() {
    const pool = getWordListByDifficulty(difficulty);
    if (!pool.length) {
        gameStatus.textContent = 'No questions available for this difficulty.';
        return;
    }

    const selected = pool[Math.floor(Math.random() * pool.length)];
    currentQuestion = selected;
    currentAnswer = selected.word.toUpperCase();

    gameOver = false;
    won = false;
    timedOut = false;

    questionDisplay.textContent = selected.hint;
    scoreDisplay.textContent = currentScore;
    gameStatus.textContent = '';
    gameStatus.className = '';

    remainingAttempts = maxWrong;
    wrongCount.textContent = remainingAttempts;

    const timerStatItem = timerDisplay.parentElement;
    if (difficulty === 'hard') {
        timerStatItem.style.display = 'flex';
        timeRemaining = 60;
        timerDisplay.textContent = '60';
        startCountdown();
    } else {
        timerStatItem.style.display = 'none';
        stopTimer();
    }

    answerInput.value = '';
    answerInput.focus();
    renderMobileKeyboard();
}

function renderMobileKeyboard() {
    const keyboard = document.getElementById('keyboard');
    if (!keyboard) return;

    if (window.innerWidth > 768) {
        keyboard.style.display = 'none';
        return;
    }

    keyboard.style.display = 'grid';
    keyboard.innerHTML = '';

    const keys = ['7','8','9','4','5','6','1','2','3','0','.','⌫'];
    keys.forEach(k => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'keyboard-btn';
        btn.textContent = k;

        btn.addEventListener('click', () => {
            if (k === '⌫') {
                answerInput.value = answerInput.value.slice(0, -1);
            } else {
                // allow dot and digits only
                if (k === '.' || /\d/.test(k)) {
                    answerInput.value += k;
                }
            }
            answerInput.focus();
        });

        keyboard.appendChild(btn);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'keyboard-btn keyboard-submit-btn';
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', handleAnswerSubmit);
    keyboard.appendChild(submitBtn);
}

function handleAnswerSubmit() {
    if (gameOver || !currentQuestion) return;

    const userAnswer = (answerInput.value || '').trim();
    if (!userAnswer) {
        gameStatus.textContent = 'Please enter your answer.';
        return;
    }

    if (userAnswer.toUpperCase() === currentAnswer) {
        won = true;
        gameOver = true;
        stopTimer();
        gameStatus.textContent = '? Correct!';
        gameStatus.className = 'status-win';
        calculateScore(true);
        showResults();
    } else {
        remainingAttempts -= 1;
        wrongCount.textContent = remainingAttempts;

        if (remainingAttempts <= 0) {
            gameOver = true;
            stopTimer();
            gameStatus.textContent = '? No attempts left!';
            gameStatus.className = 'status-lose';
            calculateScore(false);
            showResults();
        } else {
            gameStatus.textContent = `Wrong answer. ${remainingAttempts} attempt(s) left.`;
            gameStatus.className = 'status-warn';
        }
    }

    answerInput.value = '';
}

function calculateScore(isWin) {
    stopTimer();
    let baseScore = isWin ? 100 : 0;
    let penalty = (maxWrong - remainingAttempts) * 10;
    let timeBonus = Math.max(0, timeRemaining * 2);
    let multiplier = 1;
    if (difficulty === 'easy') multiplier = 0.8;
    if (difficulty === 'hard') multiplier = 1.5;

    lastRoundScore = Math.max(0, Math.round((baseScore - penalty + timeBonus) * multiplier));
    scoreDisplay.textContent = lastRoundScore;

    if (isWin) currentScore += lastRoundScore;
}

function startCountdown() {
    stopTimer();
    timerInterval = setInterval(() => {
        timeRemaining -= 1;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 10) timerDisplay.style.color = '#e74c3c';
        else if (timeRemaining <= 20) timerDisplay.style.color = '#f39c12';

        if (timeRemaining <= 0) {
            stopTimer();
            timedOut = true;
            gameOver = true;
            removeWordFromList(currentAnswer, difficulty);
            gameStatus.textContent = '?? Time\'s Up! Game Over!';
            gameStatus.className = 'status-lose';
            calculateScore(false);
            showResults();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function showResults() {
    setTimeout(() => {
        const resultTitle = document.getElementById('result-title');
        const finalScore = document.getElementById('final-score');
        const finalTime = document.getElementById('final-time');
        const finalDifficulty = document.getElementById('final-difficulty');
        const resultMessage = document.getElementById('result-message');

        if (won) {
            resultTitle.textContent = '🎉 YOU WON!';
            resultTitle.style.color = '#27ae60';
            resultMessage.textContent = 'Correct! You answered the question successfully.';
        } else if (timedOut) {
            resultTitle.textContent = "⏳ TIME'S UP!";
            resultTitle.style.color = '#f39c12';
            resultMessage.textContent = "Time's up! Try again and beat the clock!";
        } else {
            resultTitle.textContent = '💀 GAME OVER';
            resultTitle.style.color = '#e74c3c';
            resultMessage.textContent = 'Better luck next time!';
        }

        finalScore.textContent = currentScore;
        finalTime.textContent = timeRemaining > 0 ? `${timeRemaining}s left` : 'Time\'s Up!';
        finalDifficulty.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        getStoredPlayerName(name => {
            if (!won) {
                playerNameInput.value = '';
                playerNameInput.readOnly = false;
                playerNameInput.classList.remove('locked');
            } else {
                setPlayerNameField('');
            }
        });

        const nameSection = document.querySelector('.name-input-section');
        if (won) {
            resultsContinue.style.display = 'inline-block';
            resultsPlayAgain.style.display = 'none';
            if (nameSection) nameSection.style.display = 'none';
        } else {
            resultsContinue.style.display = 'none';
            resultsPlayAgain.style.display = 'inline-block';
            if (nameSection) nameSection.style.display = 'block';
        }

        resultsModal.classList.add('show');
    }, 300);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
    soundBtn.classList.toggle('muted', !soundEnabled);
}

function playSound(type) {
    if (!soundEnabled) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'correct') {
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'wrong') {
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'win') {
            const frequencies = [440, 550, 660];
            frequencies.forEach((freq, index) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.2);
                osc.start(audioContext.currentTime + index * 0.1);
                osc.stop(audioContext.currentTime + index * 0.1 + 0.2);
            });
        }
    } catch (e) {
        console.log('Audio context not available');
    }
}

let db;

function initIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('HangmanDB', 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains('scores')) {
                const objectStore = db.createObjectStore('scores', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('scoreIndex', 'score', { unique: false });
            }
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
        };
    });
}

function isNameDuplicate(playerName) {
    if (!playerName.trim()) return false;
    const normalized = playerName.trim().toLowerCase();
    const allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    return Object.values(allBoards).some(board => 
        board.some(entry => entry.name.trim().toLowerCase() === normalized)
    );
}

function saveScore(playerName) {
    if (!playerName.trim()) playerName = 'Anonymous';

    storePlayerName(playerName);

    const newScore = {
        name: playerName,
        score: currentScore,
        difficulty: difficulty,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().getTime()
    };

    const transaction = db.transaction(['scores'], 'readwrite');
    const objectStore = transaction.objectStore('scores');
    const request = objectStore.add(newScore);
    request.onerror = () => console.log('Error saving score');
    request.onsuccess = () => { getAllScores(true); };

    const diffKey = difficulty.toLowerCase();
    let allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    if (!allBoards[diffKey]) allBoards[diffKey] = [];

    allBoards[diffKey].push({ name: playerName, score: currentScore });
    allBoards[diffKey] = allBoards[diffKey].sort((a, b) => b.score - a.score).slice(0, 50);
    localStorage.setItem('hangmanLeaderboardByDifficulty', JSON.stringify(allBoards));

    return true;
}

function setPlayerNameField(name) {
    if (name && name.trim()) {
        playerNameInput.value = name;
        playerNameInput.readOnly = true;
        playerNameInput.classList.add('locked');
    } else {
        playerNameInput.value = '';
        playerNameInput.readOnly = false;
        playerNameInput.classList.remove('locked');
    }
}

function storePlayerName(name) {
    const transaction = db.transaction(['settings'], 'readwrite');
    const objectStore = transaction.objectStore('settings');
    objectStore.put({ key: 'playerName', value: name });
}

function recordPlayerResult() {
    const currentStoredName = playerNameInput.value ? playerNameInput.value.trim() : '';
    let nameToSave = currentStoredName;

    if (!currentStoredName) {
        nameToSave = 'Anonymous';
    }

    if (!saveScore(nameToSave)) {
        return;
    }

    setPlayerNameField(nameToSave);
}

function getStoredPlayerName(callback) {
    const transaction = db.transaction(['settings'], 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.get('playerName');
    request.onsuccess = () => callback(request.result ? request.result.value : '');
}

function getAllScores(cleanup = false, callback = null) {
    const transaction = db.transaction(['scores'], 'readonly');
    const objectStore = transaction.objectStore('scores');
    const index = objectStore.index('scoreIndex');
    const request = index.getAll();

    request.onsuccess = () => {
        let scores = request.result;
        scores.sort((a, b) => b.score - a.score);

        if (cleanup && scores.length > 50) {
            const toDelete = scores.slice(50).map(s => s.id);
            const delTransaction = db.transaction(['scores'], 'readwrite');
            const delStore = delTransaction.objectStore('scores');
            toDelete.forEach(id => delStore.delete(id));
        }

        if (callback) callback(scores);
    };
}

function showLeaderboard() {
    leaderboardModal.classList.add('show');
    const table = document.getElementById('leaderboard-table');

    getAllScores(false, (leaderboard) => {
        // Filter by selected difficulty
        let filteredLeaderboard = leaderboard;
        if (leaderboardFilter !== 'all') {
            filteredLeaderboard = leaderboard.filter(entry => entry.difficulty.toLowerCase() === leaderboardFilter.toLowerCase());
        }

        if (filteredLeaderboard.length === 0) {
            table.innerHTML = '<div class="leaderboard-empty">No scores yet. Play a game to get on the leaderboard!</div>';
            return;
        }

        let html = '<div class="leaderboard-row header"><div class="leaderboard-rank">Rank</div><div class="leaderboard-name">Player</div><div class="leaderboard-score">Score</div><div class="leaderboard-difficulty">Difficulty</div><div class="leaderboard-date">Date</div></div>';

        filteredLeaderboard.slice(0, 20).forEach((entry, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            html += '<div class="leaderboard-row">' +
                    `<div class="leaderboard-rank">${medal} ${index + 1}</div>` +
                    `<div class="leaderboard-name">${entry.name}</div>` +
                    `<div class="leaderboard-score">${entry.score}</div>` +
                    `<div class="leaderboard-difficulty">${entry.difficulty}</div>` +
                    `<div class="leaderboard-date">${entry.date}</div>` +
                    '</div>';
        });

        table.innerHTML = html;
    });
}

function clearPlayerName() {
    const playerName = prompt('Enter your name to remove your scores from the leaderboard:');
    if (playerName === null) return;
    
    const normalizedName = playerName.trim().toLowerCase();
    if (!normalizedName) {
        alert('Please enter a valid name.');
        return;
    }

    // Determine which difficulties to clear from
    let difficultiesToClear = [];
    if (leaderboardFilter === 'all') {
        difficultiesToClear = ['easy', 'normal', 'hard'];
    } else {
        difficultiesToClear = [leaderboardFilter];
    }

    // Remove from localStorage
    const allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    let totalRemoved = 0;

    difficultiesToClear.forEach(difficulty => {
        if (allBoards[difficulty]) {
            const originalLength = allBoards[difficulty].length;
            allBoards[difficulty] = allBoards[difficulty].filter(entry => 
                entry.name.toLowerCase() !== normalizedName
            );
            totalRemoved += originalLength - allBoards[difficulty].length;
            
            if (allBoards[difficulty].length === 0) {
                delete allBoards[difficulty];
            }
        }
    });

    localStorage.setItem('hangmanLeaderboardByDifficulty', JSON.stringify(allBoards));

    // Remove from IndexedDB
    const transaction = db.transaction(['scores'], 'readwrite');
    const objectStore = transaction.objectStore('scores');
    const index = objectStore.index('scoreIndex');
    const range = IDBKeyRange.bound(0, Infinity);
    const request = index.openCursor(range);

    let dbDeletedCount = 0;
    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value.name.toLowerCase() === normalizedName && 
                difficultiesToClear.includes(cursor.value.difficulty.toLowerCase())) {
                cursor.delete();
                dbDeletedCount++;
            }
            cursor.continue();
        } else {
            if (totalRemoved > 0 || dbDeletedCount > 0) {
                const diffText = leaderboardFilter === 'all' ? 'all difficulties' : leaderboardFilter;
                alert(`Removed ${Math.max(totalRemoved, dbDeletedCount)} score(s) for "${playerName}" from ${diffText}.`);
            } else {
                alert(`No scores found for "${playerName}".`);
            }
            showLeaderboard();
        }
    };

    request.onerror = () => {
        alert('Error removing scores from database.');
    };
}


window.addEventListener('DOMContentLoaded', () => {
    initIndexedDB().catch(error => {
        console.log('IndexedDB initialization error:', error);
        console.log('Falling back to basic leaderboard functionality');
    });
});

// Listen for storage changes from admin panel clearing leaderboard
window.addEventListener('storage', (e) => {
    if (e.key === 'hangmanLeaderboardByDifficulty') {
        // If leaderboard modal is open, refresh it
        if (leaderboardModal && leaderboardModal.classList.contains('show')) {
            showLeaderboard();
        }
    }
});
