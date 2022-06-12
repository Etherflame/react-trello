import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import initialData from "../../initialData";
import Column from "../Column/Column";

const Board = () => {
  const columunDataRedux = useSelector((state) => state.ui);
  console.log(columunDataRedux);

  const [columnData, setColumnData] = useState(initialData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    const start = columnData.columns[result.source.droppableId];
    const finish = columnData.columns[result.destination.droppableId];

    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      const [reorderedItem] = newItemIds.splice(result.source.index, 1);
      newItemIds.splice(result.destination.index, 0, reorderedItem);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      setColumnData((prevState) => {
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };
      });
      return;
    }

    // Create a new start with the item removed
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(result.source.index, 1);

    // New Array with removed Item
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    // Destination Array
    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(result.destination.index, 0, result.draggableId);

    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    setColumnData((prevState) => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnData.columnOrder.map((columnId) => {
        const column = columnData.columns[columnId];
        const items = column.itemIds.map((itemId) => {
          return columnData.list_items[itemId];
        });

        console.log(column.id);
        return <Column key={column.id} column={column} items={items} />;
      })}
    </DragDropContext>
  );
};

export default Board;
