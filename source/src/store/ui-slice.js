import { createSlice } from "@reduxjs/toolkit";
import initialData from "../initialData";

const uiSlice = createSlice({
  name: "ui",
  initialState: initialData,
  reducers: {
    moveItem(state, action) {
      const newColumn = action.payload;

      return {
        ...state,
        columns: {
          ...state.columns,
          ...newColumn,
        },
      };
    },
    createItem(state, action) {
      const newItemData = action.payload;
      const id = `item-${Object.keys(state.list_items).length + 1}`;
      const columnId = action.payload.columnId;

      console.log(columnId);
      console.log(id);

      return {
        ...state,
        list_items: {
          ...state.list_items,
          [id]: { id: `${id}`, content: newItemData.content },
        },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            itemIds: [...state.columns[columnId].itemIds, id],
          },
        },
      };
    },
    createList(state, action) {
      const id = `column-${Object.keys(state.columns).length + 1}`;
      const title = action.payload.title;

      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: {
            id: id,
            title: title,
            itemIds: [],
          },
        },
        columnOrder: [...state.columnOrder, id],
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
