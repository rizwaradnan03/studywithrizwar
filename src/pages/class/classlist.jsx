import React, { useEffect, useState, useRef } from "react";
import { FindAllClass } from "@/api/class/FindAllClass";
import { FindAllClassType } from "@/api/class-type/FindAllClassType";
import { FindAllClassByType } from "@/api/class/FindAllClassByType";
import { FindAllTakenClass } from "@/api/class/FindAllTakenClass";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import IsLoading from "@/components/lib/react-query/IsLoading";
import toast from "react-hot-toast";

const MyClass = () => {
  const [selectedClassType, setSelectedClassType] = useState("");
  const scrollRef = useRef(null);

  const {
    isLoading: isLoadingTakenClass,
    error: errorTakenClass,
    data: dataTakenClass,
  } = useQuery("takenClass", FindAllTakenClass);

  const {
    isLoading: isLoadingClassType,
    error: errorClassType,
    data: dataClassType,
  } = useQuery("classType", FindAllClassType);

  const {
    isLoading: isLoadingClass,
    error: errorClass,
    data: dataClass,
  } = useQuery(
    ["class", selectedClassType],
    () =>
      selectedClassType
        ? FindAllClassByType({ class_type: selectedClassType })
        : FindAllClass(),
    { enabled: !!selectedClassType || selectedClassType === "" }
  );

  const amountOfTakenClass = Array.isArray(dataTakenClass?.data)
    ? dataTakenClass.data.length
    : 0;
  const amountOfClass = Array.isArray(dataClass?.data)
    ? dataClass.data.length
    : 0;

  const handleRadioChange = (id) => {
    setSelectedClassType(id);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (isLoadingClass || isLoadingClassType || isLoadingTakenClass) {
    return <IsLoading />;
  }

  if (errorClass) {
    toast.error("Gagal Mengambil Data Kelas!");
    return null;
  }

  if (errorClassType) {
    toast.error("Gagal Mengambil Data Tipe Kelas!");
    return null;
  }

  if (errorTakenClass) {
    toast.error("Gagal Mengambil Data Kelas Yang Telah Diambil!");
    return null;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10">
        <div className="w-full lg:w-4/4 rounded-sm border border-stroke bg-whitedark:border-strokedark dark:bg-boxdark">
          <div className="px-6.5 py-4">
            <h2 className="font-bold text-2xl text-black dark:text-white">
              Kelas Saya ({amountOfTakenClass})
            </h2>
          </div>
          <div className="px-6.5 py-4 dark:border-strokedark">
            <div className="relative">
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-2 py-1 rounded-full"
              >
                &lt;
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {Array.isArray(dataTakenClass?.data) &&
                  dataTakenClass.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex-none w-64 bg-white shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex flex-col items-center pb-10">
                        <Image
                          width={120}
                          height={120}
                          className="mb-3 rounded-full shadow-lg"
                          src={item.classs.image_logo}
                          alt={item.classs.name}
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {item.classs.name}
                        </h5>
                        <div className="flex mt-4 md:mt-6">
                          <Link
                            href={`/class/course/${item.id}/${item.classs.programming_language}/1`}
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Mulai Belajar!
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-2 py-1 rounded-full"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-5">
        <div className="w-full lg:w-3/4 rounded-sm border border-stroke bg-whitedark:border-strokedark dark:bg-boxdark">
          <div className="px-6.5 py-4">
            <h2 className="font-bold text-2xl text-black dark:text-white">
              Semua Kelas ({amountOfClass})
            </h2>
          </div>
          <div className="px-6.5 py-4 dark:border-strokedark">
            <div className="overflow-y-auto h-96">
              {" "}
              {/* Set a fixed height with scrolling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-6.5">
                {Array.isArray(dataClass?.data) &&
                  dataClass.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white shadow dark:bg-gray-800 dark:border-gray-700 p-4 rounded-lg"
                    >
                      <Image
                        width={120}
                        height={120}
                        className="mb-3 rounded-full shadow-lg"
                        src={item.image_logo}
                        alt={item.name}
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                      <div className="flex mt-4">
                        <Link
                          href={`/class/detail/${item.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-custom-accent hover:text-custom-primary bg-custom-primary rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Detail Kelas
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 lg:mr-4 rounded-sm border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h2 className="font-bold text-black dark:text-white">Filter</h2>
          </div>
          <div className="px-6.5 py-4 dark:border-strokedark max-h-screen overflow-y-auto">
            {" "}
            {/* Fixed height with scrolling */}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="classType-semua"
                name="classType"
                value=""
                checked={selectedClassType === ""}
                onChange={() => handleRadioChange("")}
                className="form-radio h-4 w-4 text-primary accent-primary focus:ring-0"
              />
              <label
                htmlFor="classType-semua"
                className="ml-2 text-black dark:text-white cursor-pointer"
              >
                Semua
              </label>
            </div>
            {Array.isArray(dataClassType?.data) &&
              dataClassType.data.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`classType-${item.id}`}
                    name="classType"
                    value={item.id}
                    checked={selectedClassType === item.id}
                    onChange={() => handleRadioChange(item.id)}
                    className="form-radio h-4 w-4 text-primary accent-primary focus:ring-0"
                  />
                  <label
                    htmlFor={`classType-${item.id}`}
                    className="ml-2 text-black dark:text-white cursor-pointer"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClass;
