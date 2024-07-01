"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
export default function Home() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
  }, []);

  return (
    <>
      <DefaultLayout>
        <div>Hello {authContext?.user?.fullName} </div>
      </DefaultLayout>
    </>
  );
}
