"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import { useParams, useRouter } from "next/navigation";
import SelectGroupOne from "@/components/Sidebar/SelectGroup/SelectGroupOne";
import Link from "next/link";
import CommunityPostFormModal from "@/components/CommunityPostForm/CommunityPostFormModal";
export default function Home() {
  const params = useParams<any>();
  const [show,setShow]=useState(false);
  
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

        <button onClick={()=>{setShow(!show)}} >
        SUMMON THE MODAL
      </button>

      {
      
      show && <div className="w-[100%]"><CommunityPostFormModal setShow={setShow}/></div>}

       
      </DefaultLayout>
    </>
  );
}
