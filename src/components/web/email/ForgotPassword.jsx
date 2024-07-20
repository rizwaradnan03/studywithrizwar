import Head from "next/head";

const ForgotPassword = ({ email }) => {
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
        <h1>Your Company Name</h1>
        <p>Hello, {email}!</p>
        <a href="#" className="button">
          Lihat Lebih Lanjut
        </a>
        <p>Email ini dikirimkan kepada Anda oleh <strong>Your Company Name</strong>.</p>
      </div>
    </>
  );
};

export default ForgotPassword;