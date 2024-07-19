import { FindClassById } from "@/api/class/FindByIdClass";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Detail() {
  const router = useRouter();
  const id = router.query.slug;

  const [classs, setClasss] = useState([]);

  const fetchClassById = async () => {
    try {
      const data = await FindClassById({ id: id });
      setClasss(data.data);
    } catch (error) {
      console.log("(CLIENT) Error Fetch Class By Id", error);
    }
  };

  console.log("isi class", classs);

  useEffect(() => {
    fetchClassById();
  }, []);

  return (
    <>
      <div className="px-6.5 py-4 rounded-sm border shadow-10 border-stroke bg-whitedark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row mb-10">
          <div className="w-full lg:w-1/4">
            <Image
              src={classs.image_logo}
              width={200}
              height={200}
              alt={classs.name}
            />
          </div>
          <div className="w-full lg:w-3/4">
            <h2 className="font-bold text-2xl">Kelas {classs.name}</h2>
            <p>{classs.description}</p>
            {/* <button></button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
