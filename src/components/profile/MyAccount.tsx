'use client';

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyAccount = () => {
  const { user, profileDetails, loadingUser } = useAuth();

  const [profile, setProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  // Effect to set initial values
  useEffect(() => {
    if (profileDetails) {
      setProfile({
        username: profileDetails.username ? profileDetails.username.charAt(0).toUpperCase() + profileDetails.username.slice(1) : '',
        firstName: profileDetails.firstName ? profileDetails.firstName.charAt(0).toUpperCase() + profileDetails.firstName.slice(1) : '',
        lastName: profileDetails.lastName ? profileDetails.lastName.charAt(0).toUpperCase() + profileDetails.lastName.slice(1) : '',
        phoneNumber: profileDetails.phoneNumber || '',
      });
    }
  }, [profileDetails]);

  if (loadingUser) {
    return (
      <div className='w-full max-w-xl mx-auto items-center h-screen'>
        <div className='w-6 h-6 rounded-full border-t-2 border-b-2 border-green-600 animate-spin mx-auto mt-20'></div>
      </div>
    );
  }

  const handleProfileModification = async () => {
    // e.preventDefault(); // Prevent default form submission behavior

    const userId = user?.uid;
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
    const userRef = doc(db, "users", userId); // Reference to the Firestore document

    try {
      await updateDoc(userRef, {
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <section className='w-full max-w-xl mx-auto items-center'>
      <form onSubmit={handleProfileModification} className='w-full flex flex-col gap-6'>
        <h3>Account Details</h3>
        <label className='w-full'>
          <span className='form-title'>USERNAME *</span>
          <input
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            required
            type="text"
            placeholder='Username'
            className="input-field"
            value={profile.username} // Controlled input
          />
        </label>
        <label className='w-full'>
          <span className='form-title'>FIRST NAME *</span>
          <input
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            required
            type="text"
            placeholder='First name'
            className="input-field"
            value={profile.firstName} // Controlled input
          />
        </label>
        <label className='w-full'>
          <span className='form-title'>LAST NAME *</span>
          <input
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            required
            type="text"
            placeholder='Last name'
            className="input-field"
            value={profile.lastName} // Controlled input
          />
        </label>
        <label className='w-full'>
          <span className='form-title'>EMAIL *</span>
          <input
            required
            type="email"
            placeholder='Email'
            className="input-field disabled:text-neutral-4 disabled:cursor-not-allowed"
            value={user?.email || ''} // Read-only since user cannot change email
            disabled
          />
        </label>
        <label className='w-full'>
          <span className='form-title'>PHONE NUMBER *</span>
          <input
            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
            required
            type="tel"
            placeholder='Phone number'
            className="input-field"
            value={profile.phoneNumber} // Controlled input
          />
        </label>

        <button className="w-full block mt-4 submit-button">Save Changes</button>
      </form>
    </section>
  );
}

export default MyAccount;
