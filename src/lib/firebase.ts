import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// use initializeFirestore to provide settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Simple connection test
async function testConnection() {
  try {
    // We'll use a path that we will also allow in the rules
    await getDocFromServer(doc(db, 'system', 'health'));
    console.log("Firebase connection established successfully.");
  } catch (error) {
    console.error("Firestore connectivity test failed:", error);
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('Could not reach Cloud Firestore backend'))) {
      console.error("Please check your Firebase configuration or internet connection. Long polling enabled.");
    }
  }
}
testConnection();
