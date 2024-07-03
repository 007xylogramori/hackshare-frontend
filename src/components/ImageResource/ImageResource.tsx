/* eslint-disable @next/next/no-img-element */
import { deleteResource } from "@/services/resourceServices";
import Link from "next/link";
import React from "react";
interface ImageResourceProps {
  image: any;
  setImages:any;
  images:any
}
const ImageResource = ({ image ,setImages,images }: ImageResourceProps) => {
  const handleDelete = async () => {
    try {
      await deleteResource(image?._id);
        setImages(images.filter((img:any )=> img._id !== image?._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full  rounded-sm border border-stroke  p-4 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="relative w-full   ">
        <img src={image?.url} alt={image?.filename} className="rounded" />
      </div>
      <p className="text-gray-600 mt-2 text-sm">{image?.description}</p>
      <p className="text-gray-500 mt-1 text-xs">
        Uploaded by: {image?.user.fullName}
      </p>
      <p className="text-gray-500 mt-1 text-xs">Filename: {image?.filename}</p>
      <div className="flex justify-between py-2">
        <div className="mt-2">
          <Link
            href={`${image?.url}`}
            className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
          >
            VIEW
          </Link>
          <Link
            href={`${image?.url}`}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
          >
            VIEW
          </Link>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            onClick={handleDelete}
            className="hidden items-center justify-center rounded-md border border-red px-10 py-2 text-center font-medium text-red hover:bg-opacity-90 dark:inline-flex lg:px-6 xl:px-8"
          >
            DELETE
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-6 xl:px-8"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageResource;
