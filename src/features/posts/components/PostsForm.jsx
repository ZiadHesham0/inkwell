import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
 import * as Yup from 'yup';
import { getPost } from '../services/posts.service';
import { useAuth } from '@/features/auth/hooks/useAuth';
function PostsForm() {
    const {id} = useParams();
    const {user} = useAuth();
    const validationSchema = Yup.object({
      title : Yup.string().required("This Field Is Required"),
      content : Yup.string().required("This Field Is Required"),
      image_url : Yup.string().required("This Field Is Required"),
      author_id : Yup.string(),
    });
    const formik = useFormik({
      initialValues : {
        title : '',
        content : '', 
        image_url : '',
        author_id : ''
      },
      validationSchema ,
      onSubmit : async(values)=>{
        
      }
    })
    console.log(id);
    const [mode , setMode] = useState(id === 'new' ? 'add' : 'edit');


    useEffect(()=>{
      if(mode==='new') return;
      const handleGetPost = async ()=>{
        const data = await getPost(id);
        console.log(data);
        formik.initialValues = {
          title : data.title,
          content : data.content,
          image_url : data.image_url,
          author_id : user.id
        }
      }
      handleGetPost();
    },[id])
    
  return (
    <>
      <div className="w-[80%] mx-auto p-4">
        <div className="form-header mb-10">
          <span className="text-sm text-muted ">DRAFT</span>
          <h1 className="font-black text-4xl my-2">Create New Post</h1>
          <p className="text-sm text-white/60">
            Sculpt your thoughts into the digital monolith. Inkwell technical
            articles prioritize clarity, structure, and high-quality visuals.
          </p>
        </div>

        <form>
          <div className="">
            <label htmlFor="userEmail">Email : </label>
            <input type="email" id={"userEmail"}  />
          </div>
        </form>
      </div>
    </>
  )
}

export default PostsForm