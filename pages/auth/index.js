import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../components/UI/Loading";
import { Fragment } from "react";
import AuthForm from "../../components/auth/auth-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/dashboard");
        toast.success("You are authenticated", { theme: "colored" });
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Head>
        <title>Login/Signup</title>
        <meta
          name="description"
          content="Login/Register in Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <AuthForm />
    </Fragment>
  );
}

export default AuthPage;
