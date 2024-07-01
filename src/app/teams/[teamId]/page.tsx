"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import axios from "axios";
const SingleTeamPage = () => {
  const params = useParams<{ tag: string; item: string }>();
  const [teamDetails, setTeamDetails] = useState([]);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const getAllTeams = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/${params?.teamId}`,
        { withCredentials: true },
      );
      console.log(response.data.data);
      setTeamDetails(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    getAllTeams();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  ${teamDetails?.name}`} />
      <div> signleTeamPage {params?.teamId} </div>
    </DefaultLayout>
  );
};

export default SingleTeamPage;
