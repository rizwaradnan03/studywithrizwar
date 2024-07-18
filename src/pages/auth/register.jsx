import { findCompany } from "@/api/CompanyApi";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Register = () => {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const result = await findCompany();
        setCompanyName(result.data.name);
      } catch (error) {
        console.log("(CLIENT) Error Fetching Company", error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md" style={{ width: "20%" }}>
        <h2 className="text-2xl font-bold mb-4">{companyName}</h2>
        <form className="mx-auto">
          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="contoh@gmail.com"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              required
              placeholder="*******"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            {/* <div>
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="ml-2">
                Remember me
              </Label>
            </div> */}
            <Link href="/email/forgot-password" className="text-blue-500 hover:underline">Lupa Password?</Link>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
