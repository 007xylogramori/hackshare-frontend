/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import CommunityPostFormModal from "@/components/CommunityPostForm/CommunityPostFormModal";
import PostList from "@/components/CommunityPosts/CommunityPosts";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const authContext = useContext(AuthContext);
  const params = useParams<any>();
  const [post, setPost] = useState<any>();
  const [comment, setComment] = useState("");
  const handleAddComment = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/${params?.postId}/comments`,
        {
          content: comment,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data);
      setPost(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/get-one/${params?.postId}`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data);
      setPost(response.data.data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div
          key={post?._id}
          className="mx-3 text-black mt-4 rounded-lg bg-white px-10 py-6 shadow-md dark:bg-black dark:text-white"
        >
          <div className="items-center  justify-between md:flex">
            <span className="text-gray-600 font-light">
              {new Date(post?.createdAt).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <div className="bg-gray-600 text-gray-100 hover:bg-gray-500 flex gap-1 rounded py-1 font-bold">
              {post?.tags?.map((i: string, idx: any) => {
                return (
                  <div
                    className=" rounded-md  border border-meta-3 px-2 py-1 text-meta-3 dark:border-primary-400 dark:text-primary-400"
                    key={idx}
                  >
                    {i}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-2 py-2">
            <div className="justify-between md:flex">
              <a
                className="text-gray-700 hover:text-gray-600 text-2xl font-bold"
                href="#"
              >
                {post?.title}
              </a>
              <div>
                <a className="flex items-center" href="#">
                  <img
                    className="mx-4 hidden h-10 w-10 rounded-full object-cover sm:block"
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                    alt="avatar"
                  />
                  <h1 className="text-gray-700 font-bold">
                    {post?.user?.username}
                  </h1>
                </a>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: post?.content }}
              className="text-gray-600 mt-2"
            ></p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <form onSubmit={handleAddComment} className=" min-w-[100%]">
              {/* {successCreate && <p>success</p>}
            {errorCreate && <p>error</p>} */}
              <div className="mb-3.5 flex w-[100%] items-end gap-2 ">
                <div className="w-[100%] ">
                  <input
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    type="text"
                    placeholder="Add comment"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <button
                  className="flex justify-center rounded  bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
          <div className="px-4 py-4">
            <div className="font-semibold underline">
              DISCUSS({post?.comments?.length})
            </div>

            {post?.comments?.map((comment: any, idx: any) => {
              return (
                <div
                  className="border-b border-stroke  py-4   dark:border-form-strokedark"
                  key={idx}
                >
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="flex gap-2 rounded-full">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                          fill=""
                        />
                        <path
                          d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                          fill=""
                        />
                      </svg>
                      {comment.user.username}
                    </span>
                    <span>
                      {new Date(comment.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className=" py-4">{comment.content}</div>
                </div>
              );
            })}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
