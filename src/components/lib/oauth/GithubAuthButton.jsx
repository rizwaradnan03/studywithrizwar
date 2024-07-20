import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import GithubLogo from "../../../../public/image/web/github.png";
import { signIn } from "next-auth/react";

const GithubAuthButton = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl || "/dashboard";

  const handleGithubSignIn = async () => {
    try {
      await signIn("github", {
        redirect: false,
        callbackUrl: callbackUrl,
      });
    } catch (error) {
      console.log("Error Login With Github", error);
    }
  };

  return (
    <button
      type="button"
      className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex items-center justify-center mb-3"
      style={{ backgroundColor: "#030618", color: "white" }}
      onClick={() => handleGithubSignIn()}
      role="button"
    >
      <div className="flex items-center">
        <Image
          src={GithubLogo}
          alt="Github Icon"
          width={32}
          height={32}
          style={{ marginRight: "0.5rem" }}
        />
        <span className="flex-grow text-center">Continue with Github</span>
      </div>
    </button>
  );
};

export default GithubAuthButton;
