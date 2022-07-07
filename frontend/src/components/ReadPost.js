import React from "react";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { getArticleById } from '../services/api'

const ReadPost = () => {

  let { articleId } = useParams();
  const [article, setArticle] = React.useState({})

console.log("articleId", articleId)
  React.useEffect(() => {
    getArticleById(articleId).then((arc) => {
console.log("arc", arc)

      setArticle(arc)
    })
  },[])

  return (
    <>
    {article && article.heading ? 
      <div className="card card-width bg-dark">
        <section key={articleId}>
          <h3>{article.heading}</h3>
          <hr className="new1"></hr>
          <p>{article.content}</p>
        </section>
      </div>: <div> Loading... </div>
    }

    </>
  );
};

export default ReadPost;
