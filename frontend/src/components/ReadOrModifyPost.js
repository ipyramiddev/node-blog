import React from "react";
import {useSearchParams} from 'react-router-dom';
import ModifyPost from "./ModifyPost"
import ReadPost from "./ReadPost"

const ReadOrModifyPost = () => {

  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit');

  return (
    <>
    	{isEditMode? <ModifyPost /> : <ReadPost />}
    </>
  );
};

export default ReadOrModifyPost;
