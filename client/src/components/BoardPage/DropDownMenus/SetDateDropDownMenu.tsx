import { useState } from "react";
import { CrossIcon } from "../../../assets/icons";

interface SetDateDropDownMenuProps {
    onSetDate: (result: string) => void;
    onClose: () => void;
}

export const SetDateDropDownMenu = ({onSetDate, onClose}: SetDateDropDownMenuProps) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const offsetMinutes = -new Date().getTimezoneOffset(); 
        const sign = offsetMinutes >= 0 ? "+" : "-";

        const hh = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");
        const mm = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");

        const timezone = `${sign}${hh}:${mm}`;

        const result = `${date}T${time}:00${timezone}`;

        onSetDate(result);
    };


    return (
        <div className="setDateDropDownMenu flex-column g8">
            <div className="setDateHeader flex-between g8">
                <span>Выберите дату</span>
                <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            <form className="handleSetDateForm flex-column g4" onSubmit={handleFormSubmit}>
                <input type="date" className="dateInput" value={date} onChange={(e) => setDate(e.target.value)}/>
                <input type="time" className="timeInput" value={time} onChange={(e) => setTime(e.target.value)}/>

                <button onSubmit={(e) => handleFormSubmit} className="saveDateButton">Сохранить</button>
            </form>
        </div>
    )
}