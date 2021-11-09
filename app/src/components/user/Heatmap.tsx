import { useState } from "react";
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import "../../styles/user.css";

const Heatmap = () => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  const contribCount: { [key: string]: number } = {
    "2021-11-01": 1,
    "2021-11-02": 2,
    "2021-11-03": 3,
  };

  const modifiersStyles = {
    selected: {
      backgroundColor: "white",
    },
  };

  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  now.setMonth(now.getMonth() - 6);

  const colors = ["#dbdbdb", "green", "orange", "red"];

  function renderDay(day: Date) {
    const date: string =
      day.getFullYear().toString() +
      "-" +
      ("0" + (day.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + day.getDate()).slice(-2);
    const color = colors[contribCount[date] ? contribCount[date] : 0];

    return (
      <div
        className="day-picker-block"
        style={{ backgroundColor: color }}
      ></div>
    );
  }

  const handleDayClick = (
    day: Date,
    modifiers: DayPicker.DayModifiers,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedDay(day);
  };

  return (
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
  );
};

export default Heatmap;
