import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { COMPANY_NAME } from "@/config";

const NavBar = ({ sidebarOpen, setSidebarOpen }) => {
  const { data } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex w-full bg-custom-background drop-shadow-lg dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
              setMenuOpen(!menuOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !menuOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !menuOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !menuOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !menuOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !menuOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          <Link className="block flex-shrink-0" href="/dashboard">
            <span className="text-xl font-bold text-custom-text dark:text-white">
              {COMPANY_NAME}
            </span>
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-8 justify-center w-full">
          <Link href="/class/classlist" className="text-custom-text dark:text-white">
            Kelas Saya
          </Link>
          <Link href="/dashboard" className="text-custom-text dark:text-white">
            Dashboard
          </Link>
          <Link href="/dashboard" className="text-custom-text dark:text-white">
            Ambil Kelas
          </Link>
          {/* <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-custom-text dark:text-white"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md dark:bg-boxdark">
                <Link
                  href="/services"
                  className="block px-4 py-2 text-custom-text hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-custom-text hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Contact
                </Link>
              </div>
            )}
          </div> */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser username={data?.user?.name} role={data?.user?.role} />
          {/* <!-- User Area --> */}
        </div>
      </div>
      {menuOpen && (
        <div className="w-full bg-white dark:bg-boxdark lg:hidden">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-custom-text dark:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-custom-text dark:text-white"
          >
            About
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block px-4 py-2 text-custom-text dark:text-white w-full text-left"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="px-4 py-2">
                <Link
                  href="/services"
                  className="block py-2 text-custom-text hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-custom-text hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
