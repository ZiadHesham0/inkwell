import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function PostsForm() {
    const {id} = useParams();
    console.log(id);
    const [mode , setMode] = useState(id === 'new' ? 'add' : 'edit');
    
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