import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Input from '../atoms/Input';
import Cards from '../molecules/Cards';
import Sidebar from '../organism/Sidebar';

import '../../styles/BlogList.css';
type Blog = {
  title: string;
  body: string;
};

const BlogList = () => {
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    //fetches blog post from API
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        const trimmedData = res.data.map((post: Blog) => ({
          title: post.title,
          body: post.body,
        }));
        setBlogs(trimmedData);
      }) //set fetced data in blog state
      .catch((err) => console.error(err)); // for an error
  }, []);
  //filtering of blog element when searched
  const filterBlog = blogs.filter((blog) =>
    blog.title.includes(search.toLowerCase()),
  );
  return (
    <div className="blog">
      <Sidebar />
      <h2>Blog List</h2>
      <Input
        name="search"
        type="text"
        placeholder="Search blogs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* if the length is 0 it shows no blogs else shows filtered blogs */}
      {filterBlog.length > 0 ? (
        filterBlog.map((blog) => (
          <Cards title={blog.title} description={blog.body} />
        ))
      ) : (
        <p>No Blogs</p>
      )}
    </div>
  );
};

export default BlogList;
