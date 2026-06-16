/* firebase-config.js
   ─────────────────────────────────────────────────
   STEP 1 — Go to https://console.firebase.google.com
   STEP 2 — Create a project called "nomashae"
   STEP 3 — Add a Web App (</> icon)
   STEP 4 — Copy the firebaseConfig object below and replace the placeholder values
   STEP 5 — In Firebase console:
              • Authentication → Sign-in method → Enable Email/Password
              • Firestore Database → Create database → Start in production mode
                Then add these rules:
                  rules_version = '2';
                  service cloud.firestore {
                    match /databases/{database}/documents {
                      match /applications/{id} {
                        allow create: if true;
                        allow read, update, delete: if request.auth != null;
                      }
                      match /news/{id} {
                        allow read: if true;
                        allow write: if request.auth != null;
                      }
                      match /citizens/{id} {
                        allow read: if resource.data.publicProfile == true;
                        allow write: if request.auth != null;
                      }
                    }
                  }
   ─────────────────────────────────────────────────
*/

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDbkpl1BqqjefM4Y7Jk0jRIKwAuXj2i-z0",
  authDomain: "nomashae-5fae8.firebaseapp.com",
  projectId: "nomashae-5fae8",
  storageBucket: "nomashae-5fae8.firebasestorage.app",
  messagingSenderId: "992473110933",
  appId: "1:992473110933:web:059afbb91769f353517e9c",
  measurementId: "G-FH86PQ41LH"
};