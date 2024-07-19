import { useRouter } from "next/router";
import Image from 'next/image';
import React from "react";
import GoogleLogo from '../../../public/image/web/google.png';
import { signIn } from "next-auth/react";

const GoogleAuthButton = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl || "/dashboard";

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        redirect: false,
        callbackUrl: callbackUrl,
      });
    } catch (error) {
      console.log('Error Login With Google', error);
    }
  };

  return (
    <a
      className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex items-center justify-center mb-3"
      style={{ backgroundColor: "#ffffff", color: "gray" }}
      onClick={() => handleGoogleSignIn()}
      role="button"
    >
      <div className="flex items-center">
        <Image
          src={GoogleLogo}
          alt="Google Icon"
          style={{ height: '2rem', width: '2rem', marginRight: '0.5rem' }}
        />
        <span className="flex-grow text-center">Continue with Google</span>
      </div>
    </a>
  );
};

export default GoogleAuthButton;
