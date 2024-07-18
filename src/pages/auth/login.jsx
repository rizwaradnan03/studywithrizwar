// import { findCompany } from "@/api/CompanyApi";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [companyName, setCompanyName] = useState("");

  // Form variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  // useEffect(() => {
  //   const fetchCompany = async () => {
  //     try {
  //       const result = await findCompany();
  //       setCompanyName(result.data.name);
  //     } catch (error) {
  //       console.log("(CLIENT) Error Fetching Company", error);
  //     }
  //   };

  //   fetchCompany();
  // }, []);

  const callbackUrl = "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl,
      });

      if (!result?.error) {
        toast.success("Berhasil Login!");
        setTimeout(() => {
          push(callbackUrl);
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log("(CLIENT) Error Login", error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-9">
            {/* Sign In Form */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h2 className="text-3xl text-black dark:text-white">Login</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan Email"
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Password"
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-5.5 mt-5 flex items-center justify-between">
                    <Link
                      href="/email/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Lupa Password
                    </Link>
                  </div>

                  <button className="flex mb-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Sign In
                  </button>
                  <hr />
                  <a
                    className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                    style={{ backgroundColor: "#ffffff", color: "gray" }}
                    onClick={() => signIn("google", { callbackUrl })}
                    role="button"
                  >
                    <img
                      className="pr-2"
                      src="/images/google.svg"
                      alt=""
                      style={{ height: "2rem" }}
                    />
                    Continue with Google
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
