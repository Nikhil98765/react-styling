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
    <li className="item">
      <span style={{ width: "40%" }}>
        <a href={url}>{title}</a>
        <br />
      </span>
      <span style={{ width: "30%" }}>{author}</span>
      <span style={{ width: "10%" }}>{num_comments}</span>
      <span style={{ width: "10%" }}>{points}</span>
      <button className='button button_small' onClick={() => deleteHandler(objectID)}>Delete</button>
    </li>
  );
};

export default Item;
