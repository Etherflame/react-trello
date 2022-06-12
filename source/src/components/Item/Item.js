import { Draggable } from "react-beautiful-dnd";
import styles from "./Item.module.scss";

const Item = (props) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={styles.item}
        >
          {props.item.content}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
