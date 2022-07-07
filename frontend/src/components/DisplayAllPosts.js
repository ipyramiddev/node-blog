import React, { useState, useRef, useEffect } from "react";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import Post from "./Post";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { allArticles, reverse } from '../store/articleSlice'
import { getAllArticles, deleteArticleById } from '../services/api'

const DisplayAllPosts = () => {

  let allPosts = useSelector((state) => state.article.allArticlesData)
  const dispatch = useDispatch()

  // managing states below
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [sortDesc, setSortDesc] = useState(true)

  // Initialize useRef (to empty title and content once saved)
  const getTitle = useRef();
  const getContent = useRef();
  const navigate = useNavigate()

  // get all articles
  useEffect(() => {
    getAllArticles().then((data) => {
      console.log("data", data)
      dispatch(allArticles(data))
    })
  }, [])

  useEffect(() => {
    dispatch(reverse())
  }, [sortDesc])
  // function 1 (accepting title in state by user input)
  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  // function 2 (accepting content/description in state by user input)
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  // function 3 (to save title and content in allPosts state)
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    // setAllPosts([...allPosts, { title, content, id }]);
    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
  };

  // function 4 (toggle create new post visibility)
  const toggleCreateNewPost = () => {
    navigate('/articles/new')
    setIsCreateNewPost(!isCreateNewPost);
  };

  const toggleSort = () => {
    setSortDesc(!sortDesc)
  }

  // function 5 (toggle post editing)
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // function 6 (to edit posts)
  const editPost = (id) => {
    setEditPostId(id);
    navigate(`/article/${id}?edit=true`)
    // navigate({  
    //   pathname: /article/${id},
    //   search: `?edit=true`,
    // });
    toggleModifyPostComponent();
  };

  // function 7 (to update the posts)
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content
        };
      }

      return eachPost;
    });
    // setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };

  // function 8 (to delete posts)
  const deletePost = async (id) => {
    const delstatus = await deleteArticleById(id)
    
    if (delstatus) {
      getAllArticles().then((data) => {
      dispatch(allArticles(data))
    })
    }
    // setAllPosts(modifiedPost);
  };

  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getContent={getContent}
          savePost={savePost}
        />
        {/* Cancel Button */}
        <button
          className="btn btn-danger cancel-button"
          onClick={toggleCreateNewPost}
        >
          Cancel
        </button>
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });

    return (
      <>
        <ModifyPost
          title={post.title}
          content={post.content}
          updatePost={updatePost}
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          toggleCreateNewPost={toggleCreateNewPost}
        />
        <button
          className="btn btn-danger cancel-update-button"
          onClick={toggleModifyPostComponent}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <h2>All Posts</h2>
      {!allPosts || !allPosts.length ? (
        <div>
          <li>There are no posts yet.</li>
        </div>
      ) : (
        allPosts.map((eachPost) => (
          <Post
            id={eachPost.id}
            key={eachPost.id}
            title={eachPost.heading}
            updatedAt={eachPost.updatedAt}
            editPost={editPost}
            deletePost={deletePost}
          />
        ))
      )}
      <button
        className="btn btn-outline-info button-edits create-post"
        onClick={toggleCreateNewPost}
      >
        Create New
      </button>
      <button
        className="btn btn-outline-info button-edits create-post"
        onClick={toggleSort}
      >
        Sort
      </button>
    </>
  );
};
export default DisplayAllPosts;
