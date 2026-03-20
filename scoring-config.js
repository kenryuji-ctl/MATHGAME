// ===================================
// SCORING SYSTEM CONFIGURATION
// ===================================
// Easily adjust all scoring parameters here

let SCORING_CONFIG = {
    // Base scoring for correct/incorrect answers
    BASE_SCORE: {
        correct: 100,      // Points for a correct answer
        incorrect: 0,      // Points for an incorrect answer
    },

    // Penalty for wrong attempts
    ATTEMPT_PENALTY: {
        perWrongAttempt: 10,  // Deduct 10 points per wrong attempt
    },

    // Time bonus (only for hard difficulty)
    TIME_BONUS: {
        pointsPerSecond: 2,   // 2 points per second remaining
        enabled: true,        // Enable/disable time bonus
    },

    // Difficulty multipliers (multiply final score)
    DIFFICULTY_MULTIPLIERS: {
        easy: 0.8,           // Easy: 80% of score
        normal: 1.0,         // Normal: 100% of score
        hard: 1.5,           // Hard: 150% of score
    },

    // Level multiplier (multiply score based on level)
    LEVEL_MULTIPLIER: {
        enabled: true,
        baseMultiplier: 1.0,        // Start at 1x
        incrementPerLevel: 0.1,     // +0.1 per level (Level 2 = 1.1x, Level 3 = 1.2x, etc)
    },

    // Consecutive correct answers bonus
    STREAK_BONUS: {
        enabled: false,
        pointsPerCorrectInRow: 10,  // +10 points for each consecutive correct
    },

    // Minimum score (never go below this)
    MINIMUM_SCORE: 0,
};

// Function to reload scoring config from localStorage
function reloadScoringConfig() {
    const savedConfig = localStorage.getItem('scoringConfig');
    if (savedConfig) {
        try {
            const loadedConfig = JSON.parse(savedConfig);
            // Deep merge to preserve the structure
            SCORING_CONFIG.BASE_SCORE.correct = loadedConfig.BASE_SCORE?.correct ?? SCORING_CONFIG.BASE_SCORE.correct;
            SCORING_CONFIG.BASE_SCORE.incorrect = loadedConfig.BASE_SCORE?.incorrect ?? SCORING_CONFIG.BASE_SCORE.incorrect;
            SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt = loadedConfig.ATTEMPT_PENALTY?.perWrongAttempt ?? SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt;
            SCORING_CONFIG.TIME_BONUS.pointsPerSecond = loadedConfig.TIME_BONUS?.pointsPerSecond ?? SCORING_CONFIG.TIME_BONUS.pointsPerSecond;
            SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.easy = loadedConfig.DIFFICULTY_MULTIPLIERS?.easy ?? SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.easy;
            SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.normal = loadedConfig.DIFFICULTY_MULTIPLIERS?.normal ?? SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.normal;
            SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.hard = loadedConfig.DIFFICULTY_MULTIPLIERS?.hard ?? SCORING_CONFIG.DIFFICULTY_MULTIPLIERS.hard;
            SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel = loadedConfig.LEVEL_MULTIPLIER?.incrementPerLevel ?? SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel;
        } catch (e) {
            console.error('Error loading scoring config:', e);
        }
    }
}

// Load scoring config when script loads
reloadScoringConfig();

// Function to calculate final score
function calculateFinalScore(config) {
    const {
        isCorrect,
        difficulty = 'normal',
        timeRemaining = 0,
        attemptsMade = 0,
        currentLevel = 1,
        correctStreak = 0
    } = config;

    let score = 0;

    // 1. Base score
    score = isCorrect ? SCORING_CONFIG.BASE_SCORE.correct : SCORING_CONFIG.BASE_SCORE.incorrect;

    // 2. Attempt penalty (only apply to wrong answers)
    if (isCorrect) {
        score -= attemptsMade * SCORING_CONFIG.ATTEMPT_PENALTY.perWrongAttempt;
    }

    // 3. Time bonus (hard difficulty only)
    if (isCorrect && SCORING_CONFIG.TIME_BONUS.enabled && difficulty === 'hard') {
        score += Math.max(0, timeRemaining * SCORING_CONFIG.TIME_BONUS.pointsPerSecond);
    }

    // 4. Level multiplier
    if (isCorrect && SCORING_CONFIG.LEVEL_MULTIPLIER.enabled) {
        const levelMultiplier = SCORING_CONFIG.LEVEL_MULTIPLIER.baseMultiplier + 
                               (currentLevel - 1) * SCORING_CONFIG.LEVEL_MULTIPLIER.incrementPerLevel;
        score *= levelMultiplier;
    }

    // 5. Streak bonus
    if (isCorrect && SCORING_CONFIG.STREAK_BONUS.enabled && correctStreak > 0) {
        score += correctStreak * SCORING_CONFIG.STREAK_BONUS.pointsPerCorrectInRow;
    }

    // 6. Difficulty multiplier
    const difficultyMultiplier = SCORING_CONFIG.DIFFICULTY_MULTIPLIERS[difficulty] || 1.0;
    score *= difficultyMultiplier;

    // 7. Ensure minimum score
    score = Math.max(SCORING_CONFIG.MINIMUM_SCORE, Math.round(score));

    return score;
}

// ===================================
// EXAMPLE SCORING SCENARIOS
// ===================================

/*
EXAMPLE 1: Easy Difficulty, Level 1, Answer Correct on First Try, 30 seconds
- Base: 100
- Penalty: 0 (no wrong attempts)
- Time Bonus: 0 (easy difficulty)
- Level Multiplier: 1.0 (level 1)
- Difficulty: ×0.8
- Final: 100 × 1.0 × 0.8 = 80 points

EXAMPLE 2: Hard Difficulty, Level 3, Answer Correct on 2nd Try, 45 seconds left
- Base: 100
- Penalty: -10 (1 wrong attempt)
- Time Bonus: 45 × 2 = 90
- Subtotal: 100 - 10 + 90 = 180
- Level Multiplier: 1.2 (level 3)
- Difficulty: ×1.5
- Final: 180 × 1.2 × 1.5 = 324 points

EXAMPLE 3: Normal Difficulty, Level 5, Answer Wrong
- Base: 0
- No other bonuses apply
- Final: 0 points
*/
