import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

// const googleProvider = new GoogleAuthProvider();

// export async function signInWithGoogle() {
//   const isMobile = window.innerWidth < 768;
//   if (typeof window === "undefined") return;

//   const credential = isMobile
//     ? await signInWithRedirect(auth, googleProvider)
//     : await signInWithPopup(auth, googleProvider);
//   await createUserIfNotExists(credential.user);
//   return credential.user;
// }

/* ---------------- USER DOC ---------------- */
async function createUserIfNotExists(user: any) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      role: "user",
      createdAt: serverTimestamp(),
    });
  }
}

/* ---------------- LOGOUT ---------------- */
export async function logoutUser() {
  await signOut(auth);
  await fetch("/api/logout", { method: "POST" }); // 👈 clears cookie
}
