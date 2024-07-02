"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Card from "@/components/TeamCard/Card";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
const TeamPage = () => {

  const [teamDetails, setTeamDetails] = useState([]);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorCreate, setErrorCreate] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [successCreate, setSuccessCreate] = useState("");

  const handleJoinTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/join-team`,
        { code },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
      }
      setSuccessCreate("Joined successfully")
      setErrorCreate("");
    } catch (error: any) {
      console.log(error.response?.data);
      setErrorCreate(
        error.response?.data?.message || "Invalid Credentials. Please recheck",
      );
      setSuccessCreate("")
      console.log(error);
    }
  };
  const handleCreateTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/create-team`,
        { name },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
      }
      setSuccess("Joined successfully")
    } catch (error: any) {
      console.log(error.response?.data);
      setError(
        error.response?.data?.message || "Invalid Credentials. Please recheck",
      );
      console.log(error);
    }
  };
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
  }, [success,successCreate,authContext]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Teams" />
      <div className="mb-5.5 grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="px-7 py-2  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleCreateTeam} className=" min-w-[100%]">
            {successCreate && <p>success</p>}
            {errorCreate && <p>error</p>}
            <div className="mb-3.5 flex w-[100%] items-end gap-2 ">
              <div className="w-[100%] ">
                <label className="text mb-3 block font-medium text-black dark:text-white ">
                  Create Your Own Team
                </label>
                <input
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  type="text"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                className="flex justify-center rounded border bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="px-7  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-2">
          <form onSubmit={handleJoinTeam} className=" min-w-[100%]">
            {success && <p>success</p>}
            {error && <p>error</p>}
            <div className="mb-3.5 flex w-[100%] items-end gap-2 ">
              <div className="w-[100%] ">
                <label className="text mb-3 block font-medium text-black dark:text-white ">
                  Join team using invite Code
                </label>
                <input
                  value={code}
                  onChange={(e)=>{setCode(e.target.value)}}
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                className="flex justify-center rounded border bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
       
      </div>

     

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {teamDetails.map((team, index) => {
          return <Card team={team} key={index} />;
        })}
      </div>
    </DefaultLayout>
  );
};

export default TeamPage;
