import { useState } from "react";
import DayPicker from "react-day-picker";

import { AllPostState, commitState, HeatmapState } from "../../../modules/user";
import { PostItems } from "./PostItems";

import "react-day-picker/lib/style.css";

type HeatmapProps = {
  userId: number;
  heatmap: HeatmapState;
  allPosts: AllPostState[];
  commits: commitState[];
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
  onClickDay: (userId: number, regDate: string) => void;
};

const dateToString = (date: Date) =>
  date.getFullYear().toString() +
  "-" +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);

const colors = ["#dbdbdb", "green", "orange", "red"];

const Heatmap = ({
  userId,
  heatmap,
  allPosts,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickDay,
}: HeatmapProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  function renderDay(day: Date) {
    const date = dateToString(day);
    const color = colors[heatmap[date] ? heatmap[date] : 0];

    return (
      <div className="day-picker-block" style={{ backgroundColor: color }} />
    );
  }

  const handleDayClick = (
    day: Date,
    modifiers: DayPicker.DayModifiers,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const date = dateToString(day);
    if (heatmap[date]) {
      onClickDay(userId, date);
      setSelectedDay(day);
    } else {
      alert("기록이 없습니다");
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
      {selectedDay ? (
        <>
          <button
            className="heatmap-back-button"
            onClick={() => setSelectedDay(undefined)}
          >
            BACK
          </button>
          <PostItems
            postItems={allPosts}
            commits={commits}
            isOpenModal={isOpenModal}
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
          />
        </>
      ) : (
        <div className="day-picker-container">
          <DayPicker
            canChangeMonth={false}
            renderDay={renderDay}
            month={now}
            numberOfMonths={6}
            selectedDays={selectedDay}
            modifiersStyles={modifiersStyles}
            onDayClick={handleDayClick}
          />
        </div>
      )}
    </>
  );
};

export default Heatmap;
