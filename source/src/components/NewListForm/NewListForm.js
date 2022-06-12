import styles from "./NewListForm.module.scss";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const NewListForm = (props) => {
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Enter list title..."
        value={inputValue}
        onChange={setInputValue}
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

export default NewListForm;
