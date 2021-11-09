import { useState } from "react";
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import { HeatmapState } from "../../modules/user";
import "../../styles/user.css";

type HeatmapProps = {
  heatmap: HeatmapState;
};

const Heatmap = ({ heatmap }: HeatmapProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

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
    const color = colors[heatmap[date] ? heatmap[date] : 0];

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
