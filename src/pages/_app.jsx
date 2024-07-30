import { useRouter } from "next/router";
import "@/styles/style.css";
import "@/styles/satoshi.css";
import { SessionProvider } from "next-auth/react";
import DefaultLayout from "@/components/web/Layouts/DefaultLayout";
import { exceptionRoutes } from "@/routes/exceptionRoutes";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const rootPaths = [...exceptionRoutes];
  const isRootPath = rootPaths.includes(router.pathname);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Study With Rizwar menyediakan kelas belajar pemrograman secara gratis"
        />

        <meta
          name="keywords"
          content="Study With Rizwar, Online Class Programming, Programming Language, Javascript, Python"
        />
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        {isRootPath ? (
          <Component {...pageProps} />
        ) : (
          <SessionProvider session={session}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </SessionProvider>
        )}
      </QueryClientProvider>
    </>
  );
}
