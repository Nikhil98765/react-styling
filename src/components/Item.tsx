import styled from "styled-components";

import Check from "../assets/check.svg?react";
import { Story } from "../utils";

type ItemProps = {
  item: Story;
  deleteHandler: (objectID: string) => void;
};

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

type StyledItemProps = {
  width: string;
};

const StyledColumn = styled.span<StyledItemProps>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props) => props.width};
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

const Item = ({item, deleteHandler}: ItemProps) => {
  return (
    <StyledItem className="item">
      <StyledColumn width="40%">
        <a href={item.url}>{item.title}</a>
        <br />
      </StyledColumn>
      <StyledColumn width="30%">{item.author}</StyledColumn>
      <StyledColumn width="10%">{item.num_comments}</StyledColumn>
      <StyledColumn width="10%">{item.points}</StyledColumn>
      <StyledButtonSmall onClick={() => deleteHandler(item.objectID)}>
        Dismiss
      </StyledButtonSmall>
    </StyledItem>
  );
};

export default Item;
