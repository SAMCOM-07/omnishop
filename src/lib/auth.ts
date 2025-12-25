import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getIdToken } from "firebase/auth";
import Cookies from "js-cookie";

export async function setAuthCookie() {
  const user = auth.currentUser;
  if (!user) return;

  const token = await getIdToken(user);
  document.cookie = `token=${token}; path=/;`;
}

/* ---------------- EMAIL REGISTER ---------------- */
export async function registerUser(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserIfNotExists(credential.user);

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

/* ---------------- USER DOC HANDLER ---------------- */
async function createUserIfNotExists(user: any) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      role: "user", // DEFAULT ROLE
      createdAt: serverTimestamp(),
    });
  }
}

export async function logoutUser() {
  // 1. Sign out from Firebase
  await signOut(auth);
  // 2. Remove auth cookie
  Cookies.remove("auth-token");
}