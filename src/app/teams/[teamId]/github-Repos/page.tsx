"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { getResourcesByType } from "@/services/resourceServices";
import UploadResource from "@/components/UploadResource/UploadResource";
import DocumentResource from "@/components/DocumentResource/DocumentResource";
import UploadRepo from "@/components/UploadRepo/UploadRepo";
import { getAllRepos } from "@/services/githubRepo";
import GithubResource from "@/components/GithubResource/GithubResource";


const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchGithubRepos = async () => {
      try {
        const documentData = await getAllRepos(params?.teamId)
        setDocuments(documentData);
        console.log(documentData)
      } catch (error: any) {
        setError("error fetching documents");
        console.log(error);
      }
    };
    fetchGithubRepos();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / documents`} />
      {/* image upload */}
      <UploadRepo/>
      {/* image data */}
      <div className="py-4">
      <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Github Repositories</h2>
      <div className=" w-[100%] grid grid-cols-1 gap-2 ">

       

        {documents.map((document:any,idx) => (
          <GithubResource repo={document} key={idx}/>
        ))}
      </div>
    </div>
      
    </DefaultLayout>
  );
};

export default TeamImagesPage;
