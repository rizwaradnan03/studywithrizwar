import { useRouter } from "next/router";
import React from "react";

function Detail() {
  const route = useRouter();

  console.log("isi route", route.query);

  return (
    <>
      <p>hay</p>
    </>
  );
}

export default Detail;
