import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";
import NewItem from "../NewItem/NewItem";
import styles from "./Column.module.scss";

const Column = (props) => {
  return (
    <div className={styles.column}>
      <h2 className={styles.column__title}>{props.column.title}</h2>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.items.map((item, index) => (
              <Item key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            <NewItem columnId={props.column.id} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
