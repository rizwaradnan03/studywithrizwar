import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data } = useSession();
    console.log('isi data')

  return (
    <>
        <p>hay</p>
    </>
  );
};

export default Profile;
