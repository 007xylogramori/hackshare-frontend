"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Card from "@/components/TeamCard/Card";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
const TeamPage = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const getAllTeams = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/getallteams`,
        { withCredentials: true },
      );
      console.log(response.data.data);
      setTeamDetails(response.data.data.teams);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    getAllTeams();
    console.log(authContext?.user);
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Teams" />
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {teamDetails.map((team, index) => {
          return <Card team={team} key={index} />;
        })}
      </div>
    </DefaultLayout>
  );
};

export default TeamPage;
