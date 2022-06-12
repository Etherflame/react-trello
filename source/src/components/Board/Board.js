import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Column from "../Column/Column";
import NewList from "../NewList/NewList";

const Board = () => {
  const columnData = useSelector((state) => state.ui);
  console.log(columnData);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    const start = columnData.columns[result.source.droppableId];
    const finish = columnData.columns[result.destination.droppableId];

    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      const [reorderedItem] = newItemIds.splice(result.source.index, 1);
      newItemIds.splice(result.destination.index, 0, reorderedItem);

      const newColumnOrder = {
        ...start,
        itemIds: newItemIds,
      };

      const newColumns = {
        [newColumnOrder.id]: newColumnOrder,
      };

      dispatch(uiActions.moveItem(newColumns));
      return;
    }

    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(result.source.index, 1);

    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(result.destination.index, 0, result.draggableId);

    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newColumns = {
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    dispatch(uiActions.moveItem(newColumns));
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
      <NewList />
    </DragDropContext>
  );
};

export default Board;
