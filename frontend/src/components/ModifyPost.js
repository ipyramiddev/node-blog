import React from "react";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { getArticleById, updateArticleById } from '../services/api'
import { setArticle } from '../store/articleSlice'

const ModifyPost = (props) => {
  let { articleId } = useParams();
  const [article, setArticle] = React.useState({})
  const [header, setHeader] = React.useState('')
  const [content, setContent] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    getArticleById(articleId).then((arc) => {
      setArticle(arc)
      setHeader(arc.heading)
      setContent(arc.content)
    })
  },[])

  const handleSubmit = async (headerData, contentData)=> {
    const id = await updateArticleById(articleId, headerData, contentData)

    if (id) {
      navigate(`/article/${id}`)
    } else {
      window.alert("The server seems to be down. Article update failed.")
    }
  }

  return (
    <>
    {
      article ?
      <>
        <h2>Modify Post</h2>
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
export default ModifyPost;
