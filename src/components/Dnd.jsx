import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react'

const INITIAL_LIST = [
  {
    id: "1",
    firstName: "Robin",
    lastName: "Wieruch",
  },
  {
    id: "2",
    firstName: "Aiden",
    lastName: "Kettel",
  },
  {
    id: "3",
    firstName: "Jannet",
    lastName: "Layn",
  },
];

const DndItem = ({item, index}) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{
            padding: '8px 16px',
            ...provided.draggableProps.style,
            background: snapshot.isDragging ? 'pink' : 'transparent',
          }}
        >
          {item.firstName} {item.lastName}
        </div>
      )}
    </Draggable>
  )
}

const List = ({ list, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {
          (provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                list.map((item, index) => (
                  <DndItem item={item} key={item.id} index={index} />
              ))}
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}

export const Dnd = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    setList(reorder(list, source.index, destination.index))
  }

  const reorder = (list, sourceIndex, destinationIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  }

  return (
    <div>
      <List list={ list } onDragEnd={handleDragEnd}/>
    </div>
  )
}
