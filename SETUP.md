# 🔥 Nomashae — Firebase Setup Guide

Follow these steps **once** before going live. Takes about 10 minutes.

---

## STEP 1 — Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name it `nomashae` (or anything you like)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

## STEP 2 — Add a Web App

1. On your project homepage, click the **`</>`** (Web) icon
2. Register app name: `nomashae-portal`
3. **Do NOT** enable Firebase Hosting (unless you want it)
4. Copy the `firebaseConfig` object that appears — it looks like:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nomashae.firebaseapp.com",
  projectId: "nomashae",
  storageBucket: "nomashae.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```

5. Open **`firebase-config.js`** in your site files
6. Replace each `"REPLACE_WITH_..."` value with the real values from above

---

## STEP 3 — Enable Authentication

1. In Firebase console → **Build → Authentication**
2. Click **"Get started"**
3. Click **"Email/Password"** provider → Enable it → Save
4. Go to **Users** tab → **"Add user"**
5. Enter your admin email + a strong password
6. That's your admin login for `admin.html`

---

## STEP 4 — Create Firestore Database

1. In Firebase console → **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Pick a location (e.g. `eur3` for Europe, `nam5` for US)
5. Click **"Enable"**

---

## STEP 5 — Set Firestore Security Rules

1. In Firestore → **Rules** tab
2. Replace everything with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Applications: anyone can submit, only admins can read/update
    match /applications/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // News: public can read, only admins can write
    match /news/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Citizens: public profiles are public, only admins can write
    match /citizens/{id} {
      allow read: if resource.data.publicProfile == true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

---

## STEP 6 — Test Your Site

Open `index.html` in a browser. Check:
- [ ] Home page loads news (empty is fine at first)
- [ ] Citizenship form submits → you get a Tracking ID
- [ ] `admin.html` → login with your admin email/password
- [ ] In admin panel → see the application → approve it
- [ ] Go to `track.html` → enter the Tracking ID → see "Approved"
- [ ] Go to `id-card.html` → enter the Tracking ID → see the card → download it

---

## File Structure

```
nomashae-site/
├── index.html          ← Home + news feed
├── citizenship.html    ← 4-step application form
├── track.html          ← Application status tracker
├── id-card.html        ← Citizen ID card + download
├── admin.html          ← Admin panel (login-protected)
├── style.css           ← Shared design system
├── firebase-config.js  ← 🔑 YOUR CONFIG GOES HERE
└── SETUP.md            ← This file
```

---

## Hosting (Optional)

To put the site online for free:

### Option A — Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to your site folder
firebase deploy
```

### Option B — Netlify (drag and drop)
1. Go to **https://netlify.com**
2. Drag the entire `nomashae-site/` folder onto the deploy area
3. Done — you get a free URL instantly

### Option C — GitHub Pages
1. Push the folder to a GitHub repo
2. Settings → Pages → Deploy from branch → `main` `/root`
3. Your site is live at `https://yourusername.github.io/repo-name`

---

## Security Notes

- `firebase-config.js` values are **not secret** — the security rules protect your data
- Admin accounts are controlled by Firebase Auth — only you can add admins
- The secret hex pair (citizen SSN) is stored in Firestore and **never rendered in any HTML** — it is only accessible to admins in the Firebase console

---

*Ministry of Nomashae · Internal Affairs Division*
