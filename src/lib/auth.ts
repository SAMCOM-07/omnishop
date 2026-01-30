import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

/* ---------------- EMAIL REGISTER ---------------- */
export async function registerUser(
  email: string,
  password: string,
  username: string
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserIfNotExists(credential.user, username);
  return credential.user;
}

/* ---------------- EMAIL LOGIN ---------------- */
export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await createUserIfNotExists(credential.user);
  return credential.user;
}

/* ---------------- GOOGLE AUTH ---------------- */
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const credential = await signInWithPopup(auth, googleProvider);
  await createUserIfNotExists(credential.user);
  return credential.user;
}

/* ---------------- USER DOC ---------------- */
async function createUserIfNotExists(user: any, username?: string) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      role: "user",
      username,
      createdAt: serverTimestamp(),
    });
  }
}

/* ---------------- LOGOUT ---------------- */
export async function logoutUser() {
  await signOut(auth);
  await auth.currentUser?.getIdToken(true); // 👈 refresh token
  await fetch("/api/logout", { method: "POST" }); // 👈 clears cookie
}
