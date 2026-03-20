// Math Quiz Script

const easyMathQuestions = [
    { question: 'Identify the next number in the sequence 3,6,12,24,__', answer: '48' },
    { question: 'What is the value of x? x+5=12', answer: '7' },
    { question: 'Which statement is true? 2x+3=7(when x=2),x-2=5(when x=3)', answer: '2x+3=7' },
    { question: 'If x+5=11,what is the value of x?', answer: '6' },
    { question: 'if a bakery sells 250 loaves of bread at 20 each,how much money does it make?', answer: '5000' },
    { question: '3x^2+2x-5=? (when x=2)', answer: '11' },
    { question: '(2x+5)+(x-3)', answer: '3x+2' },
    { question: 'If a car travels 250km in 5hrs what is its average speed', answer: '50km/h' },
    { question: 'A shirt is on sale for 400 which is 20% of its original price,what was the original price?', answer: '500' },
    { question: 'A group of friends want to split a 1,200 bill evenly,If there are 8 friends how much will each pay?', answer: '150' },
    { question: '2x+5=11,What is x?', answer: '3' },
    { question: 'If a pencil cost 10,how much do 5 pencil cost?', answer: '50' },
    { question: 'What is 2/4 + 1/4?', answer: '3/4' },
    { question: 'Solve for x:x^2=4x-5=0', answer: '1' },
    { question: 'If a car travels 320 km in 4 hours,what is it average speed?', answer: '80km/h' },
    { question: 'Solve the equation:3x^2-2x-5=0', answer: '-1' }
];

const normalMathQuestions = [
    //basic
    { question: 'f(x)=2x+3 find f(1)', answer: '5' },
    { question: 'f(x)=2x+3 find f(4)', answer: '11' },
    { question: 'g(X)=X^2 find g(3)', answer: '9' },
    { question: 'g(x)=x^2 find g(-2)', answer: '4' },
    { question: 'h(x)=5x-1 find h(2)', answer: '9' },
    { question: 'h(x)=5x+1 find h(0)', answer: '-1' },
    { question: 'f(x)=x+7 find f(5)', answer: '12' },
    { question: 'f(x)=x+7 find f(-3)', answer: '4' },
    { question: 'g(x)=4x, find g(6)', answer: '24' },
    { question: 'g(x)=4x find g(-2)', answer: '-8' },
    { question: 'f(x)=3x find f(10)', answer: '30' },
    { question: 'g(x)=x+1 find g(0)', answer: '1' },
    { question: 'h(x)=2x-5 find h(3)', answer: '1' },
    { question: 'f(x)=x+4 find f(9)', answer: '5' },
    { question: 'g(x)=6x find g(2)', answer: '12' },
    //intermidiate
    { question: 'f(x)=3x^2+2x find f(2)', answer: '16' },
    { question: 'f(x)=3^2+2x find f(-1)', answer: '1' },
    { question: 'g(x)=(2+1)/x find g(1)', answer: '3' },
    { question: 'g(x)=(2+1)/x find g(2)', answer: '5/2' },
    { question: 'h(x)square root of(x+9) find h(7)', answer: '4' },
    { question: 'h(x)square root of(x+9) find h(16) ', answer: '5' },
    { question: 'f(x)=x^2-4x+1 find f(3)', answer: '-2' },
    { question: 'f(x)=x^2-4x+1 find f(-2)', answer: '13' },
    { question: 'g(x)=5-2x find g(4)', answer: '-3' },
    { question: 'g(x)=5-2x find g(-3)', answer: '11' },
    { question: 'f(x)2x^2+x find f(3)', answer: '21' },
    { question: 'g(x)=(x+3)/2 find g(5)', answer: '4' },
    { question: 'h(x)square root of(3x+1) find h(3)', answer: 'square root of 10' },
    { question: 'f(x)=x^2+6x find f(-3)', answer: '-9' },
    { question: 'g(x)=7x-4 find g(2)', answer: '10' },
    //advanced
    { question: 'f(x)=x^3-2x find f(2)', answer: '4' },
    { question: 'f(x)=x^3-2x find f(-2)', answer: '-4' },
    { question: 'g(x)=(x^2-1)/(x-1) find g(3)', answer: '4' },
    { question: 'g(x)=(x^2-1)/(x-1) find g(-1)', answer: '0' },
    { question: 'f(x)=1/(x+3) find f(1)', answer: '1/4' },
    { question: 'f(x)=1/(x+3) find f(-3)', answer: '3' },
    { question: 'Normal: What is 9 x 2?', answer: 'undenifined' },
    { question: 'g(x)=square root of(2x-1) find g(5)', answer: '3' }
];

const hardMathQuestions = [
    { question: 'Hard: What is 3 x 3?', answer: '9' },
    { question: 'Hard: What is 7 x 6?', answer: '42' },
    { question: 'Hard: What is 12 x 12?', answer: '144' },
    { question: 'Hard: What is 15 x 15?', answer: '225' },
    { question: 'Hard: What is 19 + 23?', answer: '42' },
    { question: 'Normal: What is 5 x 3?', answer: '15' },
    { question: 'Normal: What is 7 + 8?', answer: '15' },
    { question: 'Normal: What is 12 / 4?', answer: '3' },
    { question: 'Normal: What is 9 x 2?', answer: '18' },
    { question: 'Normal: What is 11 - 4?', answer: '7' },
    { question: 'Normal: What is 5 x 3?', answer: '15' },
    { question: 'Normal: What is 7 + 8?', answer: '15' },
    { question: 'Normal: What is 12 / 4?', answer: '3' },
    { question: 'Normal: What is 9 x 2?', answer: '18' },
    { question: 'Normal: What is 11 - 4?', answer: '7' }
];

let currentQuestion = null;
let currentAnswer = '';
let remainingAttempts = 0;
let maxWrong = 6;
let difficulty = 'normal';
let timeRemaining = 60;
let timerInterval = null;
let currentScore = 0;
let lastRoundScore = 0;
let currentLevel = 1;
let maxLevel = 0;
let allLevelsComplete = false;
let soundEnabled = true;
let gameOver = false;
let won = false;
let timedOut = false;
let leaderboardFilter = 'all';
let currentLeaderboardType = 'online';

// ===================================
// LOADING SCREEN FUNCTIONS
// ===================================

function showLoadingScreen(message = 'Loading...') {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        if (loadingText) loadingText.textContent = message;
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

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
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const clearLeaderboardMenuBtn = document.getElementById('clear-leaderboard-menu');
const playerNameInput = document.getElementById('player-name');

playBtn.addEventListener('click', () => {
    playSound('click');
    startGame();
});
rulesBtn.addEventListener('click', () => {
    playSound('click');
    rulesModal.classList.add('show');
});
difficultyBtn.addEventListener('click', () => {
    playSound('click');
    difficultyModal.classList.add('show');
});
closeRulesBtn.addEventListener('click', () => {
    playSound('click');
    rulesModal.classList.remove('show');
});
closeDifficultyBtn.addEventListener('click', () => {
    playSound('click');
    difficultyModal.classList.remove('show');
});
leaderboardBtn.addEventListener('click', () => {
    playSound('click');
    showLeaderboard();
});
closeLeaderboardBtn.addEventListener('click', () => {
    playSound('click');
    leaderboardModal.classList.remove('show');
});
clearLeaderboardMenuBtn.addEventListener('click', () => {
    playSound('click');
    clearPlayerName();
});

// Add event listeners for leaderboard difficulty filter buttons
// Leaderboard type toggle
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('leaderboard-type-btn')) {
        playSound('click');
        currentLeaderboardType = e.target.dataset.type;
        
        // Update button styles
        document.querySelectorAll('.leaderboard-type-btn').forEach(b => {
            b.classList.remove('active');
            b.style.background = 'white';
            b.style.color = '#333';
            b.style.borderColor = '#999';
        });
        e.target.classList.add('active');
        e.target.style.background = '#1a73e8';
        e.target.style.color = 'white';
        e.target.style.borderColor = '#1a73e8';
        
        // Switch leaderboard view
        document.getElementById('online-leaderboard').style.display = currentLeaderboardType === 'online' ? 'block' : 'none';
        document.getElementById('offline-leaderboard').style.display = currentLeaderboardType === 'offline' ? 'block' : 'none';
    }
});

// Leaderboard difficulty filters
document.querySelectorAll('.leaderboard-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        playSound('click');
        // Remove active class from all buttons
        document.querySelectorAll('.leaderboard-filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Update filter and refresh both leaderboards
        leaderboardFilter = e.target.getAttribute('data-difficulty');
        loadOnlineLeaderboard();
        loadOfflineLeaderboard();
    });
});

backBtn.addEventListener('click', () => {
    playSound('click');
    goBackToMenu();
});

// Allow pressing Escape to go back to menu, Enter only when not in answer field
document.addEventListener('keydown', (event) => {
    // Check if user is typing in the answer input field
    const isAnswerInputFocused = document.activeElement === answerInput;
    
    if (event.key === 'Escape' || (event.key === 'Enter' && gameScreen.style.display !== 'none' && !resultsModal.classList.contains('show') && !isAnswerInputFocused)) {
        playSound('click');
        goBackToMenu();
    }
});
resultsPlayAgain.addEventListener('click', () => {
    playSound('click');
    if ((gameOver && !won) || allLevelsComplete) {
        const nameInput = (playerNameInput.value || '').trim();
        if (!nameInput) {
            // allow returning to menu without saving if no name entered
            allLevelsComplete = false;
            currentLevel = 1; // Reset level on game over
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
    allLevelsComplete = false;
    currentLevel = 1; // Reset level on game over
    goBackToMenu();
});
resultsContinue.addEventListener('click', () => {
    playSound('click');
    // Continue only for winning, no immediate save on continue path
    resultsModal.classList.remove('show');
    gameOver = false;
    won = false;
    timedOut = false;
    allLevelsComplete = false;
    answerInput.value = '';
    answerInput.focus();
    startGame();
});
submitAnswerBtn.addEventListener('click', () => {
    playSound('click');
    handleAnswerSubmit();
});

// Answer input - support both button click and Enter key
document.getElementById('answer-input').addEventListener('keypress', (event) => { if (event.key === 'Enter') handleAnswerSubmit(); });

soundBtn.addEventListener('click', () => {
    playSound('click');
    toggleSound();
});

musicBtn.addEventListener('click', () => {
    playSound('click');
    toggleMusic();
});

document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound('click');
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        difficulty = btn.dataset.difficulty;
        currentScore = 0; // Reset score when changing difficulty
        currentLevel = 1; // Reset to level 1 when changing difficulty

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
    // Show loading screen
    showLoadingScreen('Starting Game...');
    
    // Reload scoring config to get any admin changes
    reloadScoringConfig();
    
    setTimeout(() => {
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        
        // Start music if enabled
        const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
        if (musicEnabled && bgMusic.paused) {
            bgMusic.play().catch(err => console.log('Music autoplay prevented:', err));
            musicBtn.classList.remove('muted');
        }
        
        initGame();
        
        // Hide loading screen after game starts
        setTimeout(() => {
            hideLoadingScreen();
        }, 300);
    }, 400);
}

function goBackToMenu() {
    // Show loading screen
    showLoadingScreen('Returning to Menu...');
    
    // Keep score persistent when returning to menu
    // Don't reset level - only reset on game over
    allLevelsComplete = false;
    stopTimer();
    
    setTimeout(() => {
        gameScreen.style.display = 'none';
        menuScreen.style.display = 'block';
        resultsModal.classList.remove('show');
        
        // Pause music when returning to menu
        bgMusic.pause();
        
        // Hide loading screen
        hideLoadingScreen();
    }, 300);
}


function initGame() {
    // Reload scoring config to get any admin changes
    reloadScoringConfig();
    
    // Get admin-added questions with levels
    const saved = JSON.parse(localStorage.getItem('hangmanWordsByDifficulty') || '{}');
    const adminQuestions = (Array.isArray(saved[difficulty]) ? saved[difficulty] : []).map(q => ({ 
        word: q.word || '',
        hint: q.hint || '', 
        level: q.level ? parseInt(q.level) : 1,  // Ensure level is always a number, default to 1
        word2: q.word2 || null
    }));

    // Get default questions (assign level based on position)
    let defaultList = [];
    if (difficulty === 'easy') {
        defaultList = easyMathQuestions;
    } else if (difficulty === 'hard') {
        defaultList = hardMathQuestions;
    } else {
        defaultList = normalMathQuestions;
    }
    
    // Find max level from admin questions to start default questions after
    const maxAdminLevel = adminQuestions.length > 0 
        ? Math.max(...adminQuestions.map(q => q.level || 1))  // Ensure level is always a number
        : 0;
    
    const defaultQuestions = defaultList.map((q, idx) => ({ 
        word: q.answer, 
        hint: q.question,
        level: (maxAdminLevel || 0) + idx + 1  // Ensure maxAdminLevel is never NaN
    }));

    // Combine all questions
    let allQuestions = [...adminQuestions, ...defaultQuestions];
    
    // Sort by level to ensure they appear in order
    allQuestions.sort((a, b) => (a.level || 1) - (b.level || 1));
    
    // Find max level - handle empty array safely
    maxLevel = allQuestions.length > 0 
        ? Math.max(...allQuestions.map(q => q.level || 1))
        : 0;
    
    // Find questions at current level
    let levelQuestions = allQuestions.filter(q => q.level === currentLevel);
    
    // Check if all levels are complete
    if (levelQuestions.length === 0 && currentLevel > maxLevel) {
        allLevelsComplete = true;
        won = true;
        gameOver = true;
        stopTimer();
        showResults();
        return;
    }
    
    // If no questions at this level, cycle back to level 1
    if (levelQuestions.length === 0) {
        currentLevel = 1;
        levelQuestions = allQuestions.filter(q => q.level === currentLevel);
    }
    
    if (!levelQuestions.length) {
        gameStatus.textContent = 'No questions available for this difficulty.';
        return;
    }

    // Pick a random question from the current level
    const selected = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
    
    if (!selected) {
        gameStatus.textContent = 'Error loading question. Please refresh the page.';
        return;
    }
    
    currentQuestion = selected;
    currentAnswer = (selected.word || '').toUpperCase();
    // Store alternative answer if it exists
    currentQuestion.altAnswer = (selected.word2 ? selected.word2.toUpperCase() : null);

    gameOver = false;
    won = false;
    timedOut = false;

    // Display level in the UI
    const levelDisplay = document.getElementById('level-display');
    if (levelDisplay) {
        levelDisplay.textContent = currentLevel;
    }

    questionDisplay.textContent = selected.hint || 'Question not loaded';
    scoreDisplay.textContent = currentScore;
    gameStatus.textContent = '';
    gameStatus.className = '';

    remainingAttempts = maxWrong;
    updateWrongCountDisplay();

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

    // Get input element fresh to ensure it's available
    const inputSectionElement = document.getElementById('answer-input');
    if (inputSectionElement) {
        inputSectionElement.value = '';
        inputSectionElement.focus();
    }
}



function handleAnswerSubmit() {
    if (gameOver || !currentQuestion) return;

    const inputElement = document.getElementById('answer-input');
    if (!inputElement) {
        console.error('Answer input element not found!');
        gameStatus.textContent = '❌ Error: Input field not found!';
        return;
    }
    
    const userAnswer = (inputElement.value || '').trim();
    
    if (!userAnswer) {
        gameStatus.textContent = '⚠️ Please enter your answer to continue.';
        gameStatus.className = 'status-warn';
        return;
    }

    if (userAnswer.toUpperCase() === currentAnswer || (currentQuestion.altAnswer && userAnswer.toUpperCase() === currentQuestion.altAnswer)) {
        won = true;
        stopTimer();
        currentLevel += 1; // Move to next level
        gameStatus.textContent = '✓ Correct! Next Level...';
        gameStatus.className = 'status-win';
        calculateScore(true);
        
        // Auto-load next question after a brief delay
        setTimeout(() => {
            won = false;
            gameOver = false;
            inputElement.value = '';
            inputElement.focus();
            initGame();
        }, 1000);
    } else {
        remainingAttempts -= 1;
        updateWrongCountDisplay();

        if (remainingAttempts <= 0) {
            gameOver = true;
            stopTimer();
            gameStatus.textContent = '❌ No attempts left! Game Over!';
            gameStatus.className = 'status-lose';
            calculateScore(false);
            showResults();
        } else {
            gameStatus.textContent = `❌ Wrong! Your answer: "${userAnswer}" • ${remainingAttempts} attempt(s) remaining`;
            gameStatus.className = 'status-warn';
            inputElement.value = '';
            inputElement.focus();
        }
    }
}

function updateWrongCountDisplay() {
    const wrongAttempts = maxWrong - remainingAttempts;
    wrongCount.textContent = `${wrongAttempts}/${maxWrong}`;
}

function calculateScore(isWin) {
    stopTimer();
    
    // Use the scoring configuration to calculate score
    const scoreValue = calculateFinalScore({
        isCorrect: isWin,
        difficulty: difficulty,
        timeRemaining: timeRemaining,
        attemptsMade: maxWrong - remainingAttempts,
        currentLevel: currentLevel,
        correctStreak: 0
    });

    lastRoundScore = scoreValue;
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
            gameStatus.textContent = '⏳ Time\'s Up! Game Over!';
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

        if (allLevelsComplete) {
            resultTitle.textContent = '🏆 ALL LEVELS COMPLETE! 🏆';
            resultTitle.style.color = '#FFD700';
            resultMessage.textContent = `🎊 Congratulations! You've completed all ${maxLevel} levels on ${difficulty.toUpperCase()} difficulty! Amazing work! 🎊`;
        } else if (won) {
            resultTitle.textContent = '🎉 YOU WON!';
            resultTitle.style.color = '#27ae60';
            resultMessage.textContent = `Level ${currentLevel - 1} Complete! Ready for Level ${currentLevel}?`;
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

        try {
            getStoredPlayerName(name => {
                if (!won && !allLevelsComplete) {
                    playerNameInput.value = '';
                    playerNameInput.readOnly = false;
                    playerNameInput.classList.remove('locked');
                } else {
                    setPlayerNameField('');
                }
            });
        } catch (error) {
            console.error('Error getting player name:', error);
            if (!won && !allLevelsComplete) {
                playerNameInput.value = '';
                playerNameInput.readOnly = false;
                playerNameInput.classList.remove('locked');
            } else {
                playerNameInput.value = '';
            }
        }

        const nameSection = document.querySelector('.name-input-section');
        if (allLevelsComplete) {
            resultsContinue.style.display = 'none';
            resultsPlayAgain.style.display = 'inline-block';
            if (nameSection) nameSection.style.display = 'block';
        } else if (won) {
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

function toggleMusic() {
    const musicEnabled = bgMusic.paused;
    if (musicEnabled) {
        bgMusic.play().catch(err => console.log('Music autoplay prevented:', err));
        musicBtn.classList.remove('muted');
        localStorage.setItem('musicEnabled', 'true');
    } else {
        bgMusic.pause();
        musicBtn.classList.add('muted');
        localStorage.setItem('musicEnabled', 'false');
    }
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
        } else if (type === 'click') {
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        console.error('Audio context error:', e);
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
    request.onerror = () => console.error('Error saving score to IndexedDB');
    request.onsuccess = () => getAllScores(true);

    const diffKey = difficulty.toLowerCase();
    let allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    if (!allBoards[diffKey]) allBoards[diffKey] = [];

    allBoards[diffKey].push({ name: playerName, score: currentScore });
    allBoards[diffKey] = allBoards[diffKey].sort((a, b) => b.score - a.score).slice(0, 50);
    localStorage.setItem('hangmanLeaderboardByDifficulty', JSON.stringify(allBoards));

    // Also save to Firebase for cross-device syncing
    if (typeof saveScoreToFirebase === 'function') {
        saveScoreToFirebase(playerName, currentScore, difficulty);
    }

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
    try {
        if (!db) {
            callback('');
            return;
        }
        const transaction = db.transaction(['settings'], 'readonly');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.get('playerName');
        request.onsuccess = () => callback(request.result ? request.result.value : '');
        request.onerror = () => callback('');
    } catch (error) {
        console.error('IndexedDB error:', error);
        callback('');
    }
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
    
    // Currently showing offline leaderboard only
    currentLeaderboardType = 'offline';
    document.getElementById('online-leaderboard').style.display = 'none';
    document.getElementById('offline-leaderboard').style.display = 'block';
    
    // Load only offline leaderboard (online is hidden temporarily)
    loadOfflineLeaderboard();
}

function loadOnlineLeaderboard() {
    const table = document.getElementById('leaderboard-table-online');
    
    if (!isFirebaseReady) {
        table.innerHTML = '<div class="leaderboard-empty">Firebase not configured. See FIREBASE_SETUP.md for setup instructions.</div>';
        return;
    }
    
    table.innerHTML = '<div class="leaderboard-empty">Loading online scores...</div>';
    
    if (typeof getScoresFromFirebase === 'function') {
        getScoresFromFirebase(leaderboardFilter === 'all' ? 'normal' : leaderboardFilter, (firebaseScores) => {
            displayOnlineLeaderboard(firebaseScores);
        });
    } else {
        table.innerHTML = '<div class="leaderboard-empty">Firebase functions not available.</div>';
    }
}

function displayOnlineLeaderboard(leaderboard) {
    const table = document.getElementById('leaderboard-table-online');
    
    // Filter by selected difficulty
    let filteredLeaderboard = leaderboard;
    if (leaderboardFilter !== 'all') {
        filteredLeaderboard = leaderboard.filter(entry => 
            entry.difficulty.toLowerCase() === leaderboardFilter.toLowerCase()
        );
    }
    
    // Sort by score (highest first)
    filteredLeaderboard.sort((a, b) => (b.score || 0) - (a.score || 0));

    if (filteredLeaderboard.length === 0) {
        table.innerHTML = '<div class="leaderboard-empty">No online scores yet. Share your score with the cloud!</div>';
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
                `<div class="leaderboard-date">${entry.date || 'N/A'}</div>` +
                '</div>';
    });

    table.innerHTML = html;
}

function loadOfflineLeaderboard() {
    const table = document.getElementById('leaderboard-table-offline');
    
    // Get scores from localStorage
    const allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    let offlineScores = [];
    
    // Convert localStorage format to display format
    Object.keys(allBoards).forEach(difficulty => {
        if (Array.isArray(allBoards[difficulty])) {
            allBoards[difficulty].forEach(entry => {
                offlineScores.push({
                    name: entry.name,
                    score: entry.score,
                    difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
                    date: entry.date || new Date().toLocaleDateString()
                });
            });
        }
    });
    
    displayOfflineLeaderboard(offlineScores);
}

function displayOfflineLeaderboard(leaderboard) {
    const table = document.getElementById('leaderboard-table-offline');
    
    // Filter by selected difficulty
    let filteredLeaderboard = leaderboard;
    if (leaderboardFilter !== 'all') {
        filteredLeaderboard = leaderboard.filter(entry => 
            entry.difficulty.toLowerCase() === leaderboardFilter.toLowerCase()
        );
    }
    
    // Sort by score (highest first)
    filteredLeaderboard.sort((a, b) => b.score - a.score);

    if (filteredLeaderboard.length === 0) {
        table.innerHTML = '<div class="leaderboard-empty">No offline scores yet. Play offline to get on this leaderboard!</div>';
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


// Initialize app - run immediately since script is loaded after DOM
function initializeApp() {
    initIndexedDB().catch(error => {
        console.error('IndexedDB initialization error:', error);
    });
    
    // Initialize music button state
    const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    musicBtn.classList.toggle('muted', !musicEnabled);
    
    // Hide loading screen after page is ready
    setTimeout(() => {
        hideLoadingScreen();
    }, 800);
}

// Run immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Listen for storage changes from admin panel clearing leaderboard
window.addEventListener('storage', (e) => {
    if (e.key === 'hangmanLeaderboardByDifficulty') {
        // If leaderboard modal is open, refresh it
        if (leaderboardModal && leaderboardModal.classList.contains('show')) {
            showLeaderboard();
        }
    }
});
