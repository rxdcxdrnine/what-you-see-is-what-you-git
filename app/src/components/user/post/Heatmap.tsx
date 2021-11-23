import { useState } from "react";
import Modal from "react-modal";
import DayPicker from "react-day-picker";

import { AllPostState, CommitState, HeatmapState } from "../../../modules/user";
import { UserComponentState } from "../../../containers/UserContainer";
import { AllPostItem } from "./PostItem";

import "react-day-picker/lib/style.css";
import { Link } from "react-router-dom";

type HeatmapProps = {
  userId: number;
  component: UserComponentState;
  heatmap: HeatmapState;
  allPosts: AllPostState[];
  commits: CommitState[];
  readOnly: boolean;
  onClickDay: (regDate: string) => void;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

const dateToString = (date: Date) =>
  date.getFullYear().toString() +
  "-" +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);

const today = new Date();
const colors = ["#dbdbdb", "green", "orange", "red"];

const Heatmap = ({
  component,
  heatmap,
  allPosts,
  commits,
  readOnly,
  onClickModal,
  onClickDay,
  onClickDelete,
}: HeatmapProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToday, setIsToday] = useState<boolean>(false);

  function renderDay(day: Date) {
    const date = dateToString(day);
    const color =
      colors[heatmap[date] ? (heatmap[date] > 3 ? 3 : heatmap[date]) : 0];

    return (
      <div
        className="day-picker-block"
        style={{
          backgroundColor: color,
          outline:
            date === dateToString(today) ? "0.15rem black solid" : "none",
        }}
      />
    );
  }

  const handleDayClick = (
    day: Date,
    modifiers: DayPicker.DayModifiers,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const date = dateToString(day);
    if (heatmap[date]) {
      onClickDay(date);
      setSelectedDay(day);
    } else {
      setIsOpen(true);
      if (date === dateToString(today)) setIsToday(true);
    }
  };

  const modifiersStyles = {
    selected: {
      backgroundColor: "white",
    },
  };

  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  now.setMonth(now.getMonth() - 6);

  return (
    <>
      <HeatmapModal
        isOpen={isOpen}
        isToday={isToday}
        setIsOpen={setIsOpen}
        setIsToday={setIsToday}
      />
      {component === "heatmap" ? (
        <div className="day-picker-container">
          <DayPicker
            month={now}
            numberOfMonths={6}
            canChangeMonth={false}
            selectedDays={selectedDay}
            modifiersStyles={modifiersStyles}
            renderDay={renderDay}
            onDayClick={handleDayClick}
          />
          <div className="day-picker-footer">
            <div className="day-picker-today" />: TODAY
          </div>
        </div>
      ) : (
        <div className="post-list-container">
          {allPosts.map((postItem) => (
            <div key={postItem.postId}>
              <AllPostItem
                allPostItem={postItem}
                commits={commits}
                readOnly={readOnly}
                onClickModal={onClickModal}
                onClickDelete={onClickDelete}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

type HeatmapModalProps = {
  isOpen: boolean;
  isToday: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsToday: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeatmapModal = ({
  isOpen,
  isToday,
  setIsOpen,
  setIsToday,
}: HeatmapModalProps) => {
  const resetModal = () => {
    setIsOpen(false);
    setIsToday(false);
  };

  return (
    <Modal
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          width: "20rem",
          height: "10rem",
          padding: "1rem",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          background: "rgba(255, 255, 255, 0.5)",
          opacity: 1,
        },
      }}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => {
        resetModal();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <button className="modal-header-button" onClick={() => resetModal()}>
            close
          </button>
        </div>
        <div className="modal-body">
          <div>해당 날짜의 기록이 없습니다.</div>
          {isToday ? (
            <div className="modal-confirm">
              <Link to="/write">
                <button className="modal-confirm-button">MOVE TO WRITE</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default Heatmap;
