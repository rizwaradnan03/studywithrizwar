import React, { useEffect, useState } from "react";
import { FindAllClassType } from "@/api/class-type/FindAllClassType";
import { FindAllClass } from "@/api/class/FindAllClass";

const MyClass = () => {
  const [classs, setClasss] = useState([]);
  const [classType, setClassType] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState("");

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
      const data = await FindAllClass();
      setClasss(data.data);
    } catch (error) {
      console.log("(CLIENT) Error Fetch Class", error);
    }
  };

  useEffect(() => {
    fetchClassType();
    fetchClass();
  }, []);

  const handleRadioChange = (id) => {
    setSelectedClassType(id);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 lg:mr-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h2 className="font-bold text-black dark:text-white">Filter</h2>
        </div>
        <div className="px-6.5 py-4 dark:border-strokedark">
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
    </div>
  );
};

export default MyClass;
