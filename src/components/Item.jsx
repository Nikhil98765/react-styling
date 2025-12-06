import styled from "styled-components";

import Check from "../assets/check.svg?react";


const Item = ({
  objectID,
  url,
  author,
  num_comments,
  points,
  title,
  deleteHandler,
}) => {
  const StyledItem = styled.li`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
  `;

  const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    a {
      color: inherit;
    }

    width: ${(props) => props.width}
  `;

  const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
      background: #171212;
      color: #ffffff;
    }
  `;

  const StyledButtonSmall = styled(StyledButton)`
    padding: 5px;
  `;



  return (
    <StyledItem className="item">
      <StyledColumn width="40%">
        <a href={url}>{title}</a>
        <br />
      </StyledColumn>
      <StyledColumn width="30%">{author}</StyledColumn>
      <StyledColumn width="10%">{num_comments}</StyledColumn>
      <StyledColumn width="10%">{points}</StyledColumn>
      <StyledButtonSmall
        onClick={() => deleteHandler(objectID)}
      >
        <Check height="18px" width="18px"/>
      </StyledButtonSmall>
    </StyledItem>
  );
};

export default Item;
