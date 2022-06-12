import { useState } from "react";
import NewItemForm from "../NewItemForm/NewItemForm";
import styles from "./NewItem.module.scss";
import { FaPlus } from "react-icons/fa";

const NewItem = (props) => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div className={styles.newItem}>
      {!isAddingItem && (
        <button
          onClick={() => setIsAddingItem((prev) => !prev)}
          className={styles.newItem__button}
        >
          <FaPlus /> <span>Add a Item</span>
        </button>
      )}
      {isAddingItem && (
        <NewItemForm
          columnId={props.columnId}
          setIsAddingItem={setIsAddingItem}
        />
      )}
    </div>
  );
};

export default NewItem;
