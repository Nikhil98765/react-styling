import { memo, useState } from "react";
import {reverse, sortBy} from 'lodash';

import Item from "./Item.js";
import { Story } from "../../utils.js";

type ListProps = {
  list: Story[],
  deleteHandler: (id: string) => void
}

const SORTS = {
  NONE: (list: Story[]) => list,
  TITLE: (list: Story[]) => sortBy(list, 'title'),
  AUTHOR: (list: Story[]) => sortBy(list, 'author'),
  COMMENTS: (list: Story[]) => sortBy(list, 'num_comments'),
  POINTS: (list: Story[]) => sortBy(list, 'points')
}

export type SortKey = "NONE" | "TITLE" | "AUTHOR" | "COMMENTS" | "POINTS";
export type SortOrder = {
  sortKey: SortKey;
  order?: 'asc' | 'desc';
}

export const List = memo(({ list, deleteHandler }: ListProps) => {

  const [sortOrder, setSortOrder] = useState<SortOrder>({sortKey: 'NONE'});

  const handleSort = (sortKey:  SortKey) => {
    setSortOrder(prevState => {
      if(prevState.sortKey ===  sortKey) {
        return {
          sortKey: sortOrder.sortKey,
          order: prevState.order === 'asc' ? 'desc' : 'asc'
        }
      } else {
        return {sortKey, order: 'asc'}
      }
    });
  };

  const sortedList = (sortOrder.order === 'asc') ? SORTS[sortOrder.sortKey](list) :  reverse(SORTS[sortOrder.sortKey](list));

  return (
    <ul>
      <li style={{listStyle: 'none'}}>
        <span>
          <button style={{ width: "40%" }} onClick={() => handleSort("TITLE")}>
            Title
          </button>
        </span>
        <span>
          <button style={{ width: "30%" }} onClick={() => handleSort("AUTHOR")}>
            Author
          </button>
        </span>
        <span>
          <button
            style={{ width: "10%" }}
            onClick={() => handleSort("COMMENTS")}
          >
            Comments
          </button>
        </span>
        <span>
          <button style={{ width: "10%" }} onClick={() => handleSort("POINTS")}>
            Points
          </button>
        </span>
        <span>
          <button style={{ width: "10%" }}>Actions</button>
        </span>
      </li>
      {sortedList.map((item: Story) => (
        <Item key={item.objectID} deleteHandler={deleteHandler} item={item} />
      ))}
    </ul>
  );
});
