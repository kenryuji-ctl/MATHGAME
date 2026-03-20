// Basic admin panel logic for Hangman

function adminLogin() {
    const password = document.getElementById("admin-password").value;
    const loginError = document.getElementById("login-error");
    
    if (password.toUpperCase() === "ADMIN123") {
        document.getElementById("admin-panel").style.display = "block";
        document.querySelector(".menu-content").style.display = "none";
        loginError.style.display = "none";
        document.getElementById("difficulty-select").addEventListener("change", function() {
            loadWords();
            loadLeaderboard();
        });
        loadWords();
        loadLeaderboard();
    } else {
        loginError.style.display = "block";
    }
}

function getWordsByDifficulty() {
    return JSON.parse(localStorage.getItem("hangmanWordsByDifficulty") || '{}');
}

function saveWordsByDifficulty(wordsByDiff) {
    localStorage.setItem("hangmanWordsByDifficulty", JSON.stringify(wordsByDiff));
}

function loadWords() {
    const diff = document.getElementById("difficulty-select").value;
    document.getElementById('current-difficulty').textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
    const wordsByDiff = getWordsByDifficulty();
    const words = wordsByDiff[diff] || [];
    const list = document.getElementById("word-list");
    list.innerHTML = "";

    if (words.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.textContent = 'No questions found for this difficulty. Add one below.';
        emptyLi.style.fontStyle = 'italic';
        emptyLi.style.color = '#888';
        list.appendChild(emptyLi);
        return;
    }

    words.forEach((item, idx) => {
        const li = document.createElement("li");
        const levelDisplay = item.level ? `<span style="color:#ff6b6b; font-weight:700;">Level ${item.level}</span>` : '<span style="color:#999;">No Level</span>';
        const secondAnswerDisplay = item.word2 ? `<div class="answer-row"><span class="question-role">A2:</span> ${item.word2}</div>` : '';
        li.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-role">Q:</span> ${item.hint || '<i>no question</i>'}
                    <span class="difficulty-badge">${diff.toUpperCase()}</span>
                </div>
                <div class="answer-row"><span class="question-role">A:</span> ${item.word}</div>
                ${secondAnswerDisplay}
                <div class="answer-row">${levelDisplay}</div>
            </div>`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "menu-btn admin-delete-btn";
        delBtn.onclick = () => deleteWord(idx);
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit Q/A";
        editBtn.className = "menu-btn admin-edit-btn";
        editBtn.onclick = () => editQuestion(idx);
        li.appendChild(delBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}

function addWord() {
    const wordInput = document.getElementById("new-word");
    const wordInput2 = document.getElementById("new-word-2");
    const hintInput = document.getElementById("new-hint");
    const levelInput = document.getElementById("new-level");
    const diff = document.getElementById("difficulty-select").value;
    const word = wordInput.value.trim();
    const word2 = wordInput2.value.trim();
    const hint = hintInput.value.trim();
    const level = parseInt(levelInput.value) || 1;  // Ensure level is always a number
    
    if (word && hint) {
        let wordsByDiff = getWordsByDifficulty();
        if (!wordsByDiff[diff]) wordsByDiff[diff] = [];
        
        // Check if this is the first question for this difficulty and warn if not level 1
        if (wordsByDiff[diff].length === 0 && level !== 1) {
            alert('⚠️ First question should be at Level 1! Setting to Level 1.');
            levelInput.value = "1";
            return;
        }
        
        const questionObj = { word, hint, level };  // level is already an integer
        if (word2) questionObj.word2 = word2;
        wordsByDiff[diff].push(questionObj);
        saveWordsByDifficulty(wordsByDiff);
        wordInput.value = "";
        wordInput2.value = "";
        hintInput.value = "";
        levelInput.value = "1";
        alert('Question added successfully!');
        loadWords();
    } else {
        alert('Please enter question and at least one answer.');
    }
}

function deleteWord(idx) {
    const diff = document.getElementById("difficulty-select").value;
    let wordsByDiff = getWordsByDifficulty();
    if (!wordsByDiff[diff]) return;
    wordsByDiff[diff].splice(idx, 1);
    saveWordsByDifficulty(wordsByDiff);
    loadWords();
}

function editQuestion(idx) {
    const diff = document.getElementById("difficulty-select").value;
    let wordsByDiff = getWordsByDifficulty();
    if (!wordsByDiff[diff]) return;

    const currentQA = wordsByDiff[diff][idx];
    const newQuestion = prompt("Enter new question:", currentQA.hint || "");
    if (newQuestion === null) return;

    const newAnswer = prompt("Enter new answer 1:", currentQA.word || "");
    if (newAnswer === null) return;

    const newAnswer2 = prompt("Enter new answer 2 (optional):", currentQA.word2 || "");
    if (newAnswer2 === null) return;

    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
        alert('Question and at least one answer cannot be empty.');
        return;
    }

    const updatedObj = {
        ...currentQA,
        hint: newQuestion.trim(),
        word: newAnswer.trim()
    };
    
    if (newAnswer2.trim()) {
        updatedObj.word2 = newAnswer2.trim();
    } else {
        delete updatedObj.word2;
    }
    
    wordsByDiff[diff][idx] = updatedObj;
    saveWordsByDifficulty(wordsByDiff);
    loadWords();
}

function loadLeaderboard() {
    const diff = document.getElementById("difficulty-select").value;
    const allBoards = JSON.parse(localStorage.getItem("hangmanLeaderboardByDifficulty") || '{}');
    const leaderboard = allBoards[diff] || [];
    const tbody = document.querySelector("#leaderboard-table tbody");
    tbody.innerHTML = "";
    if (leaderboard.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan='3' style='color:gray;'>No scores yet for this difficulty.</td>`;
        tbody.appendChild(tr);
        return;
    }
    leaderboard
        .sort((a, b) => b.score - a.score)
        .forEach((entry, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${idx + 1}</td><td>${entry.name}</td><td>${entry.score}</td>`;
            tbody.appendChild(tr);
        });
}

// When saving leaderboard from the game, use:
// let allBoards = JSON.parse(localStorage.getItem("hangmanLeaderboardByDifficulty") || '{}');
// if (!allBoards[difficulty]) allBoards[difficulty] = [];
// allBoards[difficulty].push({ name, score });
// localStorage.setItem("hangmanLeaderboardByDifficulty", JSON.stringify(allBoards));

function toggleAdminPassword() {
    const passwordField = document.getElementById('admin-password');
    const checkbox = document.getElementById('show-password-checkbox');
    if (checkbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

function clearLeaderboardAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password !== 'admin123') {
        alert('Admin password required to clear the leaderboard.');
        return;
    }
    if (!confirm('Are you sure you want to clear the entire leaderboard?')) return;

    localStorage.setItem('hangmanLeaderboardByDifficulty', JSON.stringify({}));

    const transaction = db.transaction(['scores'], 'readwrite');
    const objectStore = transaction.objectStore('scores');
    const request = objectStore.clear();

    request.onsuccess = () => {
        alert('Leaderboard cleared successfully.');
        loadLeaderboard();
    };

    request.onerror = () => {
        alert('Failed to clear leaderboard data.');
    };
}

function backToGame() {
    // Try to close admin tab/window if it was opened as a popup.
    // Otherwise redirect on the same tab.
    try {
        window.close();
        // In some browsers, close() only works if opened by script.
        // Fallback to redirect if still open.
        setTimeout(() => {
            if (!window.closed) {
                window.location.href = 'index.html';
            }
        }, 150);
    } catch (e) {
        window.location.href = 'index.html';
    }
}

// ===================================
// SCORING CONFIGURATION FUNCTIONS
// ===================================

function loadScoringConfig() {
    // Load current scoring configuration into the form
    document.getElementById('base-score-correct').value = SCORING_CONFIG.BASE_SCORE.correct;
    document.getElementById('attempt-penalty').value = SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt;
    document.getElementById('time-bonus').value = SCORING_CONFIG.TIME_BONUS.pointsPerSecond;
    document.getElementById('level-multiplier').value = SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel;
    document.getElementById('multiplier-easy').value = SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.easy;
    document.getElementById('multiplier-normal').value = SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.normal;
    document.getElementById('multiplier-hard').value = SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.hard;
    
    // Display current scoring config as JSON
    updateScoringPreview();
}

function saveScoringConfig() {
    // Update the configuration values
    SCORING_CONFIG.BASE_SCORE.correct = parseFloat(document.getElementById('base-score-correct').value) || 100;
    SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt = parseFloat(document.getElementById('attempt-penalty').value) || 10;
    SCORING_CONFIG.TIME_BONUS.pointsPerSecond = parseFloat(document.getElementById('time-bonus').value) || 2;
    SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel = parseFloat(document.getElementById('level-multiplier').value) || 0.1;
    SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.easy = parseFloat(document.getElementById('multiplier-easy').value) || 0.8;
    SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.normal = parseFloat(document.getElementById('multiplier-normal').value) || 1.0;
    SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.hard = parseFloat(document.getElementById('multiplier-hard').value) || 1.5;
    
    // Save to localStorage
    localStorage.setItem('scoringConfig', JSON.stringify(SCORING_CONFIG));
    
    updateScoringPreview();
    alert('✅ Scoring configuration saved successfully!');
}

function updateScoringPreview() {
    const preview = {
        'Base Score (Correct)': SCORING_CONFIG.BASE_SCORE.correct,
        'Attempt Penalty': SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt,
        'Time Bonus (per sec)': SCORING_CONFIG.TIME_BONUS.pointsPerSecond,
        'Level Multiplier Inc': SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel,
        'Difficulty Multipliers': {
            'Easy': SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.easy,
            'Normal': SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.normal,
            'Hard': SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.hard
        }
    };
    
    document.getElementById('scoring-preview').textContent = JSON.stringify(preview, null, 2);
}

// Load scoring config when admin panel loads
window.addEventListener('load', () => {
    // Try to load saved config from localStorage
    const saved = localStorage.getItem('scoringConfig');
    if (saved) {
        try {
            const config = JSON.parse(saved);
            Object.assign(SCORING_CONFIG, config);
        } catch (e) {
            console.error('Error loading saved scoring config:', e);
        }
    }
    updateScoringPreview();
});
