import Layout from '@/components/commons/layout/Layout'
import React from 'react'
import { motion } from 'framer-motion'
import SidebarBlog from '@/components/blog/SidebarBlog'
import { useNavigate } from 'react-router-dom'
const LayoutBlog = ({ children }) => {
  const navigate = useNavigate();
  const handleBlogSelect = (slug) => {
    navigate(`/blog/${slug}`);
  };
  return (
    <Layout>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='pt-[20px] flex justify-center items-center mb-3 '
      >
        <div className='container w-[84%]'>
          <div className='flex flex-col md:flex-row gap-8 '>
            <div className='md:w-2/3'>{children}</div>
            <div className='md:w-1/3'>
              <SidebarBlog onBlogSelect={handleBlogSelect}/>
            </div>

          </div>


        </div>
      </motion.div>
      
    </Layout>
  )
}

export default LayoutBlog