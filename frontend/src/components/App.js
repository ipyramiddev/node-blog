import React from "react";
import "../styles.css";
import DisplayAllPosts from "./DisplayAllPosts";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import ReadOrModifyPost from "./ReadOrModifyPost";
//import Post from "./Post";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
          <Route index element={<DisplayAllPosts />} />
          <Route path="articles">
            <Route path="new" element={<CreateNewPost />} />
            <Route index element={<DisplayAllPosts />} />
          </Route>
          <Route path="article">
            <Route path=":articleId" element={<ReadOrModifyPost />} />
          </Route>
      </Routes>
    </Router>
    </>
  );
};

export default App;
