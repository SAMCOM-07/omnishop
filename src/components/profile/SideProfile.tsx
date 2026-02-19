'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOutButton } from '../auth/AuthButtons'
import { useAuth } from '@/hooks/useAuth'
import { CameraIcon, User2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const SideProfile = () => {

  const pathname = usePathname()
  const { user, profileDetails, loadingUser } = useAuth();
  const [loading, setLoading] = useState(false)

  const links = [
    { name: 'Account', href: '/profile' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Address', href: '/address' },
    { name: 'Orders', href: '/order' },
  ]

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const userId = user?.uid;
    if (!userId) {
      alert("User is not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the single file
    formData.append("userId", userId); // Assuming userId is necessary

    setLoading(true); // Assuming you manage loading state here

    try {
      const res = await fetch("/api/uploadProfilePicture", { // Adjust the endpoint
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.image?.url) {
        // Get the current user's data from Firestore
        const userRef = doc(db, "users", userId); // Adjust based on your Firestore setup
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          toast.error("User data not found.");
          return;
        }

        const userData = userDoc.data();

        // Prepare updated data
        const updatedUserData = {
          ...userData, // Include existing user data
          profilePicture: data.image.url, // Add the new profile picture URL
        };

        // Update the user document in Firestore
        await updateDoc(userRef, updatedUserData);

        window.location.reload();
        toast.success("Profile updated successfully!");

        // Optionally: Trigger any required state updates in your local state or context
        // setUser(updatedUserData); // Update local state if necessary
      } else {
        toast.error(data.error || "Failed to get image URL from upload.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <aside className='w-full h-fit p-6 flex flex-col gap-4 md:shadow-lg rounded-md md:max-w-xs md:min-w-xs font-inter'>
      <div className='self-center relative'>
        <div className='w-34 h-34 rounded-full bg-neutral-3 text-green overflow-hidden flex items-center justify-center'>
            {
              loading || loadingUser ? <div className='w-full h-full opacity-50 z-100 grid place-content-center'><div className='w-8 h-8 rounded-full border-r-2 border-l-2 border-neutral-4 animate-spin'></div></div> : profileDetails?.profilePicture ? <img src={profileDetails.profilePicture} alt="Profile Picture" className='object-cover w-full h-full object-center' /> : user?.photoURL ? <img src={user?.photoURL!} alt="Profile Picture" className='object-cover w-full h-full object-center' /> : <User2Icon size={45} />
            }
        </div>
        <label className={cn('text-neutral-1 bg-neutral-5 w-8 h-8 grid place-content-center p-5 rounded-full border-2 border-neutral-1 self-center absolute bottom-0 right-0', loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}><input onChange={handleUpload} type="file" hidden className='hidden' disabled={loading} /><CameraIcon size={25} /></label>
      </div>
      {
        loadingUser ? <div className='w-24 h-6 rounded-md bg-neutral-3 animate-pulse self-center'></div> : <h3 className='text-center self-center capitalize'>{profileDetails?.username || user?.displayName || 'User'}</h3>
      }

      {/* for md & above screen sizes */}
      <ul className='flex md:flex-col gap-2 md:gap-6 justify-between mt-6 text-neutral-4 tracking-wider overflow-x-auto'>
        {
          links.map(link => {
            const isActive = pathname === link.href
            return (
              <li key={link.name} className={cn('py-2 hover:text-neutral-6 transition-color duration-300', isActive && 'border-b-2 text-green font-semibold')}><Link className='block' href={link.href}>{link.name}</Link></li>
            )
          })
        }
      </ul>

      <div className='mt-4 self-center'>
        <LogOutButton />
      </div>
    </aside>
  )
}

export default SideProfile
