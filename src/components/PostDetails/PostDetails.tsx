import * as React from 'react';
import { useParams } from 'react-router-dom';

interface ParamsData {
  id: string;
}

function PostDetails() {
  const { id } = useParams<ParamsData>();
  return <div>{id}</div>;
}

export default PostDetails;
