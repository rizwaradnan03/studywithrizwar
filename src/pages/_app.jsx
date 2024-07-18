import { useRouter } from "next/router";
import "@/styles/style.css";
import "@/styles/satoshi.css";
// import "@/styles/index.css"
import { SessionProvider } from "next-auth/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { exceptionRoutes } from "@/routes/exceptionRoutes";
import {useEffect} from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  const rootPaths = [...exceptionRoutes];
  const isRootPath = rootPaths.includes(router.pathname);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      {isRootPath ? (
        <Component {...pageProps} />
      ) : (
        <SessionProvider session={session}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SessionProvider>
      )}
    </>
  );
}
