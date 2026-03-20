// ===================================
// FIREBASE CONFIGURATION
// ===================================
// Replace these values with your Firebase project credentials
// Get these from: Firebase Console > Project Settings > General

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
};

// Initialize Firebase
let firebaseApp = null;
let firebaseDB = null;
let isFirebaseReady = false;

function initializeFirebase() {
    try {
        // Check if credentials are filled in
        if (firebaseConfig.apiKey.includes('YOUR_')) {
            console.warn('Firebase credentials not configured yet');
            console.warn('Please follow FIREBASE_SETUP.md to add your credentials');
            isFirebaseReady = false;
            return;
        }
        
        // Import Firebase modules (loaded from CDN in HTML)
        firebaseApp = firebase.initializeApp(firebaseConfig);
        firebaseDB = firebase.database();
        isFirebaseReady = true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        isFirebaseReady = false;
    }
}

// Call this when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
    initializeFirebase();
}

// ===================================
// FIREBASE LEADERBOARD FUNCTIONS
// ===================================

function saveScoreToFirebase(playerName, score, difficultyLevel) {
    if (!isFirebaseReady || !firebaseDB) {
        return;
    }

    const scoreData = {
        name: playerName,
        score: score,
        difficulty: difficultyLevel,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().getTime(),
        device: navigator.userAgent.substring(0, 50) // Limit length
    };

    const diffKey = difficultyLevel.toLowerCase();
    const scoreRef = firebaseDB.ref(`leaderboards/${diffKey}`);
    
    // Push new score to Firebase
    scoreRef.push(scoreData).then(() => {
        // Score saved successfully
    }).catch(error => {
        console.error('Error saving score to Firebase:', error);
    });
}

function getScoresFromFirebase(difficultyLevel, callback) {
    if (!isFirebaseReady || !firebaseDB) {
        getScoresFromLocalStorage(difficultyLevel, callback);
        return;
    }

    const diffKey = difficultyLevel.toLowerCase();
    const scoreRef = firebaseDB.ref(`leaderboards/${diffKey}`);

    scoreRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            getScoresFromLocalStorage(difficultyLevel, callback);
            return;
        }
        
        const scores = [];
        snapshot.forEach((childSnapshot) => {
            scores.push(childSnapshot.val());
        });
        
        // Sort by score (highest first)
        scores.sort((a, b) => (b.score || 0) - (a.score || 0));
        callback(scores.slice(0, 50)); // Top 50 scores
    }).catch(error => {
        console.error('Error fetching scores from Firebase:', error);
        getScoresFromLocalStorage(difficultyLevel, callback);
    });
}

function getScoresFromLocalStorage(difficultyLevel, callback) {
    const diffKey = difficultyLevel.toLowerCase();
    const allBoards = JSON.parse(localStorage.getItem('hangmanLeaderboardByDifficulty') || '{}');
    const scores = (allBoards[diffKey] || []).slice(0, 50);
    callback(scores);
}

// Real-time listener for live leaderboard updates
function listenToLeaderboardChanges(difficultyLevel, callback) {
    if (!isFirebaseReady || !firebaseDB) {
        // If Firebase not available, just fetch once from localStorage
        getScoresFromLocalStorage(difficultyLevel, callback);
        return;
    }

    const diffKey = difficultyLevel.toLowerCase();
    const scoreRef = firebaseDB.ref(`leaderboards/${diffKey}`);

    scoreRef.on('value', (snapshot) => {
        const scores = [];
        snapshot.forEach((childSnapshot) => {
            scores.push(childSnapshot.val());
        });
        // Sort by score (highest first)
        scores.sort((a, b) => (b.score || 0) - (a.score || 0));
        callback(scores.slice(0, 50)); // Top 50 scores
    }, (error) => {
        console.error('Error with real-time listener:', error);
        getScoresFromLocalStorage(difficultyLevel, callback);
    });
}

// Stop listening to real-time updates (cleanup)
function stopListeningToLeaderboard(difficultyLevel) {
    if (!isFirebaseReady || !firebaseDB) return;
    
    const diffKey = difficultyLevel.toLowerCase();
    const scoreRef = firebaseDB.ref(`leaderboards/${diffKey}`);
    scoreRef.off();
}
