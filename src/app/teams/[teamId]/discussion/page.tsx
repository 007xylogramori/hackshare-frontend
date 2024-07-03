"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { getResourcesByType } from "@/services/resourceServices";
import DocumentResource from "@/components/DocumentResource/DocumentResource";
import UploadDiscussion from "@/components/UploadDiscussion/UploadDiscussion";
import { getPostsByTeam } from "@/services/discussionServices";
import DiscussionResource from "@/components/DiscussionResource/DiscussionResource";

const TeamDiscussionPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchPosts = async () => {
      try {
        const discussionData = await getPostsByTeam(params?.teamId);
        console.log(discussionData)
        setDiscussions(discussionData.reverse());
      } catch (error: any) {
        setError("error fetching Discussions");
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / discussion`} />
      {/* discuss upload */}
      <UploadDiscussion />
      {/* discuss data */}
      <div className="py-4">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Discussions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
         
          {
            discussions.map((discuss:any)=>{
                return <DiscussionResource discuss={discuss} setDiscussions={setDiscussions} discussions={discussions} key={discuss._id}/>
            })
          }
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TeamDiscussionPage;
