"use client";
import Image from 'next/image';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { getResourcesByType } from "@/services/resourceServices";
import UploadResource from "@/components/UploadResource/UploadResource";
import ImageResource from '@/components/ImageResource/ImageResource';
const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);
  
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchImages = async () => {
        try {
          const imagesData = await getResourcesByType(params?.teamId, 'image');
          setImages(imagesData);
        } catch (error:any) {
            setError("error fetching images")
          console.log(error)
        }
      };
    fetchImages();
    
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / images`} />
      {/* image upload */}
        <UploadResource/>
      {/* image data */}
      <div className="py-4">
      <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Image Resource Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {images.map((image:any) => (
          <ImageResource setImages={setImages} images={images} image={image} key={image?._id} />
        ))}
      </div>
    </div>
     
      
    </DefaultLayout>
  );
};

export default TeamImagesPage;
