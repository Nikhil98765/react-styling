import { memo } from "react";

import Item from "./Item.js";
import { Story } from "../utils.js";

type ListProps = {
  list: Story[],
  deleteHandler: (id: string) => void
}

export const List = memo(({ list, deleteHandler }: ListProps) => {

  return (
    <ul>
      {list.map((item: Story) => (
        <Item
          key={item.objectID}
          deleteHandler={deleteHandler}
          item={item}
        />
      ))}
    </ul>
  );
});
