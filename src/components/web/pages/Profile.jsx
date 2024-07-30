import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data } = useSession();

  return (
    <>
        <p>hay</p>
    </>
  );
};

export default Profile;
