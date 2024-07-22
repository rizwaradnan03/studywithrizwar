import { FindClassById } from "@/api/class/FindByIdClass";
import { FindHasTakenOrNotUserClass } from "@/api/user-class/FindHasTakenOrNotUserClass";
import { RegisterUserClass } from "@/api/user-class/RegisterUserClass";
import IsLoading from "@/components/lib/react-query/IsLoading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";

function Detail() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const id = router.query.slug;
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    isLoading: isLoadingClass,
    error: errorClass,
    data: dataClass,
  } = useQuery(["class", id], () => FindClassById({ id }), {
    enabled: !!id,
    onError: () => {
      toast.error("Gagal Mengambil Data Kelas!");
    },
  });

  useEffect(() => {
    if (dataClass && !dataClass.data) {
      toast.error("Kelas Tidak Ditemukan!");
      router.push("/class/classlist");
    }
  }, [dataClass, router]);

  const {
    isLoading: isLoadingTakenClass,
    error: errorTakenClass,
    data: dataTakenClass,
  } = useQuery(["takenClass", id], () => FindHasTakenOrNotUserClass({ id }), {
    enabled: !!id,
    onError: () => {
      toast.error("Gagal Memverifikasi Kepemilikan Kelas Ini!");
    },
  });

  const handleRegisterClass = async () => {
    try {
      const register = await RegisterUserClass({ class_id: dataClass.data.id });

      if (!register) {
        toast.error("Gagal Mengklaim Kelas Ini!");
      } else {
        toast.success("Berhasil Mengklaim Kelas Ini!");
        queryClient.invalidateQueries(["takenClass", id]);
      }
    } catch (error) {
      console.log("(CLIENT) Error Register Class", error);
      toast.error("Terjadi Kesalahan Saat Mengklaim Kelas Ini!");
    }
  };

  if (!isMounted) return null;

  if (isLoadingClass || isLoadingTakenClass) {
    return <IsLoading />;
  }

  if (errorClass || !dataClass) {
    return (
      <div>
        <p>Gagal mengambil data kelas. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  if (errorTakenClass || !dataTakenClass) {
    return (
      <div>
        <p>
          Gagal memverifikasi kepemilikan kelas ini. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-6.5 py-4 rounded-sm border shadow-10 border-stroke bg-whitedark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row mb-10">
          <div className="w-full lg:w-1/4">
            <Image
              src={dataClass.data.image_logo}
              width={300}
              height={300}
              alt={dataClass.data.name}
            />
          </div>
          <div className="w-full lg:w-3/4">
            <h2 className="font-bold text-2xl mb-2">
              Kelas {dataClass.data.name}
            </h2>
            <p className="mb-4">{dataClass.data.description}</p>
            {dataTakenClass.data.length === 0 ? (
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleRegisterClass}
              >
                Ambil kelas Sekarang!
              </button>
            ) : (
              <Link
                href={`/class/course/${dataTakenClass.data.id}/${dataClass.data.programming_language}/1`}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Mulai kelas
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
