import { adminAuth } from "../lib/firebase-admin";

async function makeAdmin() {
  const uid = "j2z2hDARvKX7LgWSHOAzbO9n1ws1";

  await adminAuth.setCustomUserClaims(uid, { role: "admin" });

  console.log("Admin role set successfully");
}

makeAdmin();
