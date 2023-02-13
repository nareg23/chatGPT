import { initializeApp, getApps } from "firebase-admin/app";
import admin from "firebase-admin";

const CLIENT_EMAIL = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const PROJECT_KEY = process.env.FIREBASE_ADMIN_PROJECT_KEY;
const PROJECT_ID = process.env.FIREBASE_ADMIN_PROJECT_ID;

try {
  if (!CLIENT_EMAIL || !PROJECT_KEY || !PROJECT_ID) {
    throw new Error("FIREBASE ADMIN CREDENTIALS FAILED.");
  }

  if (!getApps().length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: CLIENT_EMAIL,
        privateKey: PROJECT_KEY,
        projectId: PROJECT_ID,
      }),
    });
  }
} catch (error: any) {
  console.log(error.message);
}

export default admin.firestore();
