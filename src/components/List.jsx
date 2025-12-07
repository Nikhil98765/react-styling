import { memo } from "react";

import Item from "./Item.jsx";

export const List = memo(({ list, deleteHandler }) => {

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
});
