import { useState } from "react";
import DayPicker from "react-day-picker";

import { AllPostState, commitState, HeatmapState } from "../../../modules/user";
import { UserComponentState } from "../../../containers/UserContainer";
import { AllPostItem } from "./PostItem";

import "react-day-picker/lib/style.css";

type HeatmapProps = {
  userId: number;
  component: UserComponentState;
  heatmap: HeatmapState;
  allPosts: AllPostState[];
  commits: commitState[];
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

  function renderDay(day: Date) {
    const date = dateToString(day);
    const color =
      colors[heatmap[date] ? (heatmap[date] > 3 ? 3 : heatmap[date]) : 0];

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
      onClickDay(date);
      setSelectedDay(day);
    } else {
      alert("해당 날짜의 기록이 없습니다.");
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
      {component === "heatmap" ? (
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

export default Heatmap;
