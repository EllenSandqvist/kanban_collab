import React, { useState } from "react";
import styles from "../styling/Column.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, addTask } from "../features/tasks/taskSlice";
import { removeColumn } from "../features/columns/columnSlice";

const ConfirmDeletionModal = ({ setShowModal, columnId, tasks }) => {
  const [keepTasks, setKeepTasks] = useState(false);
  const [columnIndex, setColumnIndex] = useState(0);
  const columns = useSelector((state) => state.allColumnReducer.columns);
  const dispatch = useDispatch();

  //Filters tasks in column and sends them to the task slice for deletion
  const handleConfirmDelete = () => {
    if (keepTasks === false) {
      dispatch(removeColumn(columnId));
      setShowModal(false);
      const tasksToDelete = tasks.filter(
        (task) => task.atColumnId === columnId
      );
      tasksToDelete.forEach((task) => {
        dispatch(removeTask(task.id));
      });

      //If user wants to keep their tasks
    } else if (keepTasks === true) {
      dispatch(removeColumn(columnId));
      setShowModal(false);

      //Copies tasks and moves them to column of index 0
      const tasksToMove = tasks.filter((task) => task.atColumnId === columnId);
      tasksToMove.forEach((taskToMove) => {
        const newTask = {
          ...taskToMove,
          atColumnId: columns[columnIndex].id,
        };
        dispatch(addTask(newTask));

        //Clean up by removing the moved tasks
        const tasksToDelete = tasks.filter(
          (task) => task.atColumnId === columnId
        );
        tasksToDelete.forEach((task) => {
          dispatch(removeTask(task.id));
        });
      });
    }
  };

  const changeIndex = () => {
    setColumnIndex(1);
  };

  //Changes state based on checkbox
  const handleCheckboxClick = (event) => {
    setKeepTasks(event.target.checked);
    if (columns[columnIndex].id === columnId) {
      changeIndex();
    }
  };

  const handleCloseModalWindow = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.deletionModal}>
          Delete column?
          <form action="">
            <input
              className={styles.modalCheckbox}
              type="checkbox"
              name="KeepTasks"
              id="KeepTasks"
              checked={keepTasks}
              onChange={handleCheckboxClick}
            />
            <label>Keep Tasks?</label>
          </form>
          <div className={styles.modalButtonContainer}>
            <button
              onClick={handleConfirmDelete}
              className={`${styles.modalConfirmButton} ${styles.modalButton}`}
            >
              Confirm
            </button>
            <button
              onClick={handleCloseModalWindow}
              className={`${styles.modalCloseButton} ${styles.modalButton}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeletionModal;
