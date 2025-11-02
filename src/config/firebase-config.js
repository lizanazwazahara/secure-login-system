import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfigKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "messagingSenderId",
  "appId",
];

const missingKeys = requiredConfigKeys.filter(
  (key) => !firebaseConfig[key] || firebaseConfig[key] === "undefined"
);

if (missingKeys.length > 0) {
  console.error(
    "❌ Firebase configuration error: Missing or undefined environment variables:",
    missingKeys
  );
  console.error(
    "Please create a .env file with the following variables:",
    requiredConfigKeys.map((key) => `VITE_FIREBASE_${key.toUpperCase()}`)
  );
  throw new Error(
    `Firebase configuration incomplete. Missing: ${missingKeys.join(", ")}`
  );
}

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  throw new Error(
    "Failed to initialize Firebase. Please check your configuration."
  );
}

export const auth = getAuth(app);
export const db = getFirestore(app);
