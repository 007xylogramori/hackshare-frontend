"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { getResourcesByType } from "@/services/resourceServices";
import UploadResource from "@/components/UploadResource/UploadResource";
import ImageResource from "@/components/ImageResource/ImageResource";
import DocumentResource from "@/components/DocumentResource/DocumentResource";


const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchImages = async () => {
      try {
        const documentData = await getResourcesByType(params?.teamId, "document");
        setDocuments(documentData);
      } catch (error: any) {
        setError("error fetching documents");
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / documents`} />
      {/* image upload */}
      <UploadResource pagename={"document"}/>
      {/* image data */}
      <div className="py-4">
      <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Document Resource Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {documents.map((document:any) => (
          <DocumentResource setDocuments={setDocuments} documents={document} document={document} key={document?._id} />
        ))}
      </div>
    </div>
      
    </DefaultLayout>
  );
};

export default TeamImagesPage;
