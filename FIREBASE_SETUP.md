# 🔥 Firebase Leaderboard Setup Guide

## Step 1: Create a Firebase Project

1. Go to [https://firebase.google.com](https://firebase.google.com)
2. Click **"Get Started"** or sign in with your Google account
3. Click **"Create a project"**
4. Enter a project name (e.g., "Math Quiz Game")
5. Click **"Continue"** and complete the setup

## Step 2: Enable Realtime Database

1. In Firebase Console, go to **Build** (left sidebar)
2. Click on **Realtime Database**
3. Click **"Create Database"**
4. Choose your region (closest to you)
5. Start in **"Test Mode"** (allows reads/writes without authentication)
6. Click **"Enable"**

## Step 3: Copy Your Firebase Configuration

1. In Firebase Console, click the **⚙️ Settings icon** (top left)
2. Click **"Project Settings"**
3. Under **"Your apps"**, click the web icon **`</>`**
4. Copy the entire configuration object that looks like:
```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

Also copy your **Database URL** from Realtime Database page (looks like `https://your-project-id-default-rtdb.firebaseio.com`)

## Step 4: Update firebase-config.js

1. Open `firebase-config.js` in your code editor
2. Replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",           // Paste your apiKey
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // your project ID
    projectId: "YOUR_PROJECT_ID",     // your project ID
    storageBucket: "YOUR_PROJECT_ID.appspot.com",   // your project ID
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // from config
    appId: "YOUR_APP_ID",             // from config
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com"  // Database URL
};
```

## Step 5: Set Firebase Database Rules (Important!)

1. In Firebase Console, go to **Realtime Database**
2. Click the **"Rules"** tab
3. Replace the default rules with:

```json
{
  "rules": {
    "leaderboards": {
      ".read": true,
      ".write": true,
      "$difficulty": {
        ".indexOn": ["score", "timestamp"]
      }
    }
  }
}
```

4. Click **"Publish"**

## Step 6: Test Your Game

1. Start the game and play a few rounds
2. Submit your scores
3. Open the leaderboard - you should now see scores syncing from Firebase
4. Test on another device with the same URL - scores should appear there too!

## 🎉 You're All Set!

Now your **Math Quiz** game has:
- ✅ **Cloud leaderboard** - scores sync across all devices
- ✅ **Real-time updates** - see new scores instantly
- ✅ **No authentication needed** - players just enter their name
- ✅ **Backup to localStorage** - works even if Firebase is unavailable

## Troubleshooting

**Q: I see "Firebase is undefined"**
- A: Make sure firebase-config.js loads before script.js in HTML

**Q: Scores aren't saving to Firebase**
- A: Check your Firebase config values are correct
- A: Check your Realtime Database Rules are published

**Q: Can I require authentication?**
- A: Yes! Contact me for advanced setup with Google/Email sign-in

---

For help, share your console errors (F12 > Console tab) with me!
