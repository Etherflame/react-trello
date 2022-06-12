import styles from "./NewList.module.scss";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";
import NewListForm from "../NewListForm/NewListForm";

const NewList = () => {
  const [isAddingList, setIsAddingList] = useState(false);
  const dispatch = useDispatch();

  const newListHandler = () => {
    dispatch(uiActions.createList({ title: "New" }));
  };

  return (
    <div className={styles.newList}>
      <button className={styles.newList__button} onClick={newListHandler}>
        <FaPlus />
        <span>Add another list</span>
      </button>
      {isAddingList && <NewListForm />}
    </div>
  );
};

export default NewList;
