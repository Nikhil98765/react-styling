import { Story } from "../../utils";
import { StyledButtonSmall, StyledColumn, StyledItem } from "./styles";

type ItemProps = {
  item: Story;
  deleteHandler: (objectID: string) => void;
};



const Item = ({ item, deleteHandler }: ItemProps) => {
  console.log("🚀 ~ Item ~ item:", item.objectID);
  
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
