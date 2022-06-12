import styles from "./NewItemForm.module.scss";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";

const NewItemForm = (props) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Add Validation Logic in the future.
    if (inputValue.length < 1) return;

    dispatch(
      uiActions.createItem({ columnId: props.columnId, content: inputValue })
    );
    props.setIsAddingItem(false);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <textarea
        name=""
        id=""
        cols="30"
        rows="3"
        placeholder="Enter a title for this item..."
        onChange={onChange}
        value={inputValue}
      />
      <div className={styles.form__buttons}>
        <button>Add Item</button>
        <button onClick={() => props.setIsAddingItem(false)}>
          <FaTimes />
        </button>
      </div>
    </form>
  );
};

export default NewItemForm;
