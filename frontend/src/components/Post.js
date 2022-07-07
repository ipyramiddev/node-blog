import React from "react";

const Post = ({ id, title, updatedAt, editPost, deletePost }) => {
  return (
    <>
      <div className="card card-width bg-dark">
        <section key={id}>
          <h3>{title}</h3>
          <hr className="new1"></hr>
          <p>Last updated at: {new Date(updatedAt).toString()}</p>
          <span title="edit post" onClick={() => editPost(id)}>
            <i className="edit-button far fa-edit fa-2x button-css" />
          </span>
          <span title="delete post" onClick={() => deletePost(id)}>
            <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
          </span>
        </section>
      </div>
    </>
  );
};

export default Post;
