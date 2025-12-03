
import Item from "./Item.jsx";

export const List = ({ list, deleteHandler }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectID}
          deleteHandler={deleteHandler}
          {...item}
        />
      ))}
    </ul>
  );
};
