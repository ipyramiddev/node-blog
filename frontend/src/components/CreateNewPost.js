import React from "react";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { getArticleById, createArticle } from '../services/api'

const CreateNewPost = (props) => {
  const [article, setArticle] = React.useState({})
  const [header, setHeader] = React.useState('')
  const [content, setContent] = React.useState('')
  const navigate = useNavigate()

  const handleSubmit = async(headerData, contentData)=>{
    
    const id = await createArticle(headerData, contentData)

    if (id) {
      navigate(`/article/${id}`)
    } else {
      window.alert("The server seems to be down. Article creation failed.")
    }
  }

  return (
    <>
    {
      article ?
      <>
        <h2>Create Post</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            value={header}
            autoFocus={true}
            onChange={(e)=>setHeader(e.target.value)}
            placeholder="heading"
            size="39"
          />
        </label>
        <br />
        <label className="col-sm-12 col-form-label">
          <b>Content</b>
          <textarea
            className="form-control form-control-sm"
            onChange={(e)=>setContent(e.target.value)}
            value={content}
            placeholder="contents"
            rows="18"
            cols="41"
          />
        </label>
        <button
          title="update changes"
          className="btn btn-success ml-3"
          onClick={()=>handleSubmit(header, content)}
        >
          Update Post
        </button>
      </>:<div>Loading...</div>
    }

    </>
  );
};
export default CreateNewPost;
