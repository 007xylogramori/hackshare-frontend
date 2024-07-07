// src/components/PostList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/get-all`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data)
      setPosts(response.data.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Community Posts</h2>
      <div>
        {posts.map((post: any) => (
          <div key={post._id} className="mx-3 my-4 rounded-lg bg-white px-10 py-6 shadow-md dark:bg-black dark:text-white">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-light">{ 
              new Date(post.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}</span>
              <div
                className="bg-gray-600 flex gap-1 text-gray-100 hover:bg-gray-500 rounded px-2 py-1 font-bold"
                
              >
                {post.tags.map((i:string,idx:any)=>{return <div className=" border  px-2 py-1 rounded-md dark:text-primary-400 text-meta-3 dark:border-primary-400 border-meta-3" key={idx}>{i}</div>})}
              </div>
            </div>
            <div className="mt-2">
              <a
                className="text-gray-700 hover:text-gray-600 text-2xl font-bold"
                href="#"
              >
                {post.title}
              </a>
              <p dangerouslySetInnerHTML={{ __html: post.content.substr(0,50) }} className="text-gray-600 mt-2">
                
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link  className="text-blue-600 hover:underline" href={`/community/${post._id}`}>
                Read more
              </Link>
              <div>
                <a className="flex items-center" href="#">
                  <img
                    className="mx-4 hidden h-10 w-10 rounded-full object-cover sm:block"
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                    alt="avatar"
                  />
                  <h1 className="text-gray-700 font-bold">{post.user.username}</h1>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
