import { COMPANY_NAME } from "@/config";
import Head from "next/head";
import React from "react";

const RegisterClass = ({ name, classs }) => {
  return (
    <>
      <Head>
        <style>
          {`
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 10px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              color: #fff;
              background-color: #007BFF;
              text-align: center;
              text-decoration: none;
              border-radius: 5px;
            }
          `}
        </style>
      </Head>
      <div className="container">
        <h1>{COMPANY_NAME}</h1>
        <p>Haloo {name}, Selamat Kamu Telah Berhasil Mengambil Kelas {classs}!</p>
      </div>
    </>
  );
};

export default RegisterClass;
