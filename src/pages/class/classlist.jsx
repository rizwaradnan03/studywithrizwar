import React, { useEffect, useState, useRef } from "react";
import { FindAllClass } from "@/api/class/FindAllClass";
import { FindAllClassType } from "@/api/class-type/FindAllClassType";
import { FindAllClassByType } from "@/api/class/FindAllClassByType";
import { FindAllTakenClass } from "@/api/class/FindAllTakenClass";
import Image from "next/image";

const MyClass = () => {
  const [takenClass, setTakenClass] = useState([]);
  const [classs, setClasss] = useState([]);
  const [classType, setClassType] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState("");
  const scrollRef = useRef(null);

  const fetchTakenClass = async () => {
    try {
      const data = await FindAllTakenClass();
      console.log("isi taken class", data);
      setTakenClass(data.data);
    } catch (error) {
      console.log("(CLIENT) Error Fetch Taken Class", error);
    }
  };

  const fetchClassType = async () => {
    try {
      const data = await FindAllClassType();
      setClassType(data.data);
    } catch (error) {
      console.log("(CLIENT) Error Fetch Class Type", error);
    }
  };

  const fetchClass = async () => {
    try {
      if (selectedClassType == "") {
        const data = await FindAllClass();
        setClasss(data.data);
        console.log("isidatadata kosong", data);
      } else {
        const data = await FindAllClassByType({
          class_type: selectedClassType,
        });
        console.log("isidatadata", data);
        setClasss(data.data);
      }
    } catch (error) {
      console.log("(CLIENT) Error Fetch Class", error);
    }
  };

  useEffect(() => {
    fetchTakenClass();
    fetchClassType();
  }, []);

  useEffect(() => {
    fetchClass();
  }, [selectedClassType]);

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

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 lg:mr-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h2 className="font-bold text-black dark:text-white">Filter</h2>
        </div>
        <div className="px-6.5 py-4 dark:border-strokedark">
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
          {classType.map((item) => (
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
      <div className="w-full lg:w-3/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h2 className="text-black dark:text-white">Kelas Saya</h2>
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
              {takenClass.map((item, index) => (
                <div key={index} className="flex-none w-64">
                  <Image
                    width={25}
                    height={25}
                    src={item.classs.image_logo}
                    alt={item.classs.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <p>{item.classs.name}</p>
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
  );
};

export default MyClass;
