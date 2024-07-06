// src/components/PostList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/community/get-all",
        {
          withCredentials: true,
        },
      );
      setPosts(response.data.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Community Posts</h2>
      <div >
      {posts.map((post: any) => (
        <div className="m-3 px-4 py-4 border" key={post._id}>
          <h3>{post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>Tags: {post.tags.join(", ")}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PostList;
