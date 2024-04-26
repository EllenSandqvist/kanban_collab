import { useState } from "react";
import { MdClose } from "react-icons/md";
import { PiTagFill } from "react-icons/pi";
import styles from "../styling/TaskPopup.module.css";
import { useDispatch } from "react-redux";
import { updateTaskDetails, removeTask } from "../features/tasks/taskSlice";
import ColumnDropdownSelector from "./ColumnDropdownSelector";

import DateInput from "./DateInput";
import MembersInput from "./MembersInput";
import {
  MdSave,
  MdDelete,
  MdSchedule,
  MdDateRange,
  MdPerson,
  MdMoreHoriz,
} from "react-icons/md";

const TaskPopup = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [isDeadlineShown, setIsDeadlineShown] = useState(false);
  const [isDoDateShown, setIsDoDateShown] = useState(false);
  const [isMembersShown, setIsMembersShown] = useState(false);

  const handleDescriptionFocus = () => {
    setShowButtons(true);
    setDescriptionClicked(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveChanges = () => {
    dispatch(updateTaskDetails({ id: task.id, title, description }));
    onClose();
  };

  const handleDeleteTask = () => {
    dispatch(removeTask(task.id));
    onClose();
  };

  const handleCloseMember = () => {
    setIsMembersShown(!isMembersShown);
  };

  return (
    <div className={styles.TaskPopupContainer}>
      <div className={styles.Overlay}></div>
      <div className={styles.Popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.Close} onClick={handleClose}>
          <MdClose />
        </button>
        <div className={styles.TitleContainer}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={styles.TitleInput}
          />
        </div>
        <div className={styles.assignedUsers_div}>
          <h4 className={styles.ExtraTitle}>Members</h4>
        </div>
        <div className={styles.MainField}>
          <div className={styles.DescriptionContainer}>
            <h4 className={styles.DescriptionTitle}>Description</h4>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              onFocus={handleDescriptionFocus}
              className={`${styles.DescriptionInput} ${
                descriptionClicked && styles.Focused
              }`}
            ></textarea>
          </div>
          <div className={styles.ExtraBtnContainer}>
            <div className={styles.Extra}>
              <h4 className={styles.ExtraTitle}>Add to card</h4>
              <button
                className={`${styles.ExtraBtn} ${styles.DeadlineBtn}`}
                onClick={() => setIsDeadlineShown(!isDeadlineShown)}
              >
                <MdSchedule /> Deadline
              </button>
              {isDeadlineShown && <DateInput task={task} dateType="deadline" />}
              <button
                className={`${styles.ExtraBtn} ${styles.DoDateBtn}`}
                onClick={() => setIsDoDateShown(!isDoDateShown)}
              >
                <MdDateRange /> Do Date
              </button>
              {isDoDateShown && <DateInput task={task} dateType="doDate" />}
              <button
                className={`${styles.ExtraBtn} ${styles.MemberBtn}`}
                onClick={() => setIsMembersShown(!isMembersShown)}
              >
                <MdPerson /> Members
              </button>
              <div className={styles.members_container}>
                {isMembersShown && (
                  <MembersInput handleCloseMember={handleCloseMember} />
                )}
              </div>

              <button className={`${styles.ExtraBtn} ${styles.Extra1Btn}`}>
                <PiTagFill /> Labels
              </button>
              {/* <button className={`${styles.ExtraBtn} ${styles.Extra2Btn}`}>
                <MdMoreHoriz /> Extra 2
              </button> */}
              <p className={styles.moveTaskText}>Move to column:</p>
              <ColumnDropdownSelector task={task} />
            </div>
          </div>
        </div>
        {showButtons && (
          <div className={styles.BtnContainer}>
            <button className={styles.SaveBtn} onClick={handleSaveChanges}>
              Save
            </button>
            <button className={styles.DeleteBtn} onClick={handleDeleteTask}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPopup;
