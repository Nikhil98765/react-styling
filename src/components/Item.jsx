import React from 'react';

const Item = ({
  objectID,
  url,
  author,
  num_comments,
  points,
  title,
  deleteHandler,
}) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
        <br />
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <button
        onClick={() => deleteHandler(objectID)}
      >
        Delete
      </button>
    </li>
  );
};

export default Item;
