import { BlogCard } from '@/components/blogCard'
import { fetchUserBlogs } from '@/config/firebase'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const blogId = () => {
    const [blogs,setBlogs] = useState([])
    const router = useRouter()
    const {blogId} = router.query
    useEffect(() => {
   if(blogId){
    fetchUserBlogs(blogId).then((data)=>{
      setBlogs(data)
      console.log(blogs)
            })
   }
      
    }, [blogId,blogs])
    
  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </div>
  )
}

export default blogId
