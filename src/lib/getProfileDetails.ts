import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { serializeData } from "./serialize";
import { UserProfileType } from "@/types/user";


export const getUserProfileDetails = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return null;
  const userDetails = {
    id: userSnap.id,
    ...userSnap.data(),
  } as UserProfileType;
  return serializeData(userDetails);
};
