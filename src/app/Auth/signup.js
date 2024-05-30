import firebase_app, { firestore_db } from "@/firebaseconfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = firestore_db;

export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    // Add user to Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      email: result.user.email,
      createdAt: new Date(),
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
